#!/usr/bin/env bash
#
# sb-stale — detect (and optionally fix) a stale Storybook/Vite build.
#
# Why this happens: Vite does not watch files inside *symlinked* dependencies
# (linked nice-* packages live outside the project root). When you rebuild a
# linked package, the running dev server never gets a change event, never bumps
# its browserHash, and keeps serving the module it transformed at startup — so
# the browser sees old code (e.g. `getBreakpoint.js?v=<hash>` throwing on a key
# the new source handles). `ntk --reset` re-links the package but does NOT touch
# the dev server's in-memory cache, so the staleness survives.
#
# Detectable invariant: a linked nice-* file is NEWER than the running dev-server
# process. If so, the server is serving code older than what's on disk.
#
# Usage:
#   scripts/sb-stale.sh           # report STALE / FRESH
#   scripts/sb-stale.sh --fix     # clear the sb-vite cache so the next start re-optimizes
#
# Env: PORT (default 6006).
set -euo pipefail

PORT="${PORT:-6006}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
FIX=0; [ "${1:-}" = "--fix" ] && FIX=1

clear_cache() {
  local cache="node_modules/.cache/storybook"
  if [ -d "$cache" ]; then
    rm -rf "$cache"
    echo "Cleared $cache — restart Storybook to re-optimize from current sources."
  else
    echo "No $cache to clear."
  fi
}

# --- linked nice-* packages: symlinks in node_modules pointing outside root ---
LINKS=()
for d in node_modules/nice-* node_modules/@nice/*; do
  [ -L "$d" ] && LINKS+=("$d")
done
if [ "${#LINKS[@]}" -eq 0 ]; then
  echo "No linked nice-* packages found — nothing to check (ntk not linked?)."
  exit 0
fi

# --- newest file across all linked packages (follow symlinks; skip nested node_modules) ---
NEWEST=0; NEWEST_FILE=""
while IFS= read -r f; do
  m="$(stat -f %m "$f" 2>/dev/null || echo 0)"
  if [ "$m" -gt "$NEWEST" ]; then NEWEST="$m"; NEWEST_FILE="$f"; fi
done < <(find -L "${LINKS[@]}" -type f \( -name '*.js' -o -name '*.mjs' -o -name '*.cjs' -o -name '*.css' -o -name '*.json' \) -not -path '*/node_modules/*' 2>/dev/null)

# --- dev-server process + its start time (the listener on PORT) ---
PID="$(lsof -ti tcp:"$PORT" -sTCP:LISTEN 2>/dev/null | head -1 || true)"
if [ -z "$PID" ]; then
  echo "Storybook dev server not running on :$PORT — start it, then re-run."
  [ "$FIX" -eq 1 ] && clear_cache
  exit 0
fi
START_STR="$(ps -o lstart= -p "$PID" 2>/dev/null | sed 's/^ *//')"
START_EPOCH="$(date -j -f "%a %b %e %T %Y" "$START_STR" +%s 2>/dev/null || echo 0)"

echo "Newest linked file :$(date -r "$NEWEST" '+%Y-%m-%d %H:%M:%S')  ${NEWEST_FILE#node_modules/}"
echo "Dev server (pid $PID): started $(date -r "$START_EPOCH" '+%Y-%m-%d %H:%M:%S')"

if [ "$NEWEST" -gt "$START_EPOCH" ]; then
  echo
  echo "STALE — a linked package changed after the dev server started."
  echo "        The browser is serving code older than disk."
  if [ "$FIX" -eq 1 ]; then
    clear_cache
    echo "Now restart the server (e.g. \`! npm run storybook\`)."
  else
    echo "Fix: scripts/sb-stale.sh --fix  &&  restart the dev server."
  fi
  exit 1
fi

echo
echo "FRESH — dev server is newer than every linked file. No stale build detected."
exit 0
