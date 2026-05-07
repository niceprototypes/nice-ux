/**
 * Clean Storybook's Vite cache and free port 6006 if a previous dev
 * server is still bound to it. Cross-platform replacement for
 * `rm -rf node_modules/.cache/storybook && lsof -ti:6006 | xargs kill -9`.
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

fs.rmSync(path.resolve('node_modules/.cache/storybook'), {
  recursive: true,
  force: true,
})

// Best-effort: free port 6006. Failures (no process on port, missing
// tool) are non-fatal — match the original `2>/dev/null; …` semantics.
try {
  if (process.platform === 'win32') {
    const out = execSync('netstat -ano -p tcp', { encoding: 'utf8' })
    const pids = [
      ...new Set(
        out
          .split('\n')
          .filter(line => line.includes(':6006'))
          .map(line => line.trim().split(/\s+/).pop())
          .filter(pid => pid && /^\d+$/.test(pid))
      ),
    ]
    pids.forEach(pid => {
      try {
        execSync(`taskkill /F /PID ${pid}`)
      } catch {
        /* already gone */
      }
    })
  } else {
    const out = execSync('lsof -ti:6006', { encoding: 'utf8' })
    out
      .split('\n')
      .filter(Boolean)
      .forEach(pid => {
        try {
          execSync(`kill -9 ${pid}`)
        } catch {
          /* already gone */
        }
      })
  }
} catch {
  /* nothing on port — fine */
}
