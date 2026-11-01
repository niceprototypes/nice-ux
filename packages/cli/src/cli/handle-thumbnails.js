/**
 * @fileoverview `nicely thumbnails <dir> [--out <file>]` — write a 16px
 * thumbnail data URI for every raster under a public directory, for
 * @niceprototypes/image's `thumbnail` prop.
 *
 * Output (default `<dir>/thumbnails.json`), keyed by public path:
 *   { "/rasters/hero.png": { "thumbnail": "data:image/png;base64,…", "aspectRatio": "1200/630" } }
 *
 * `aspectRatio` is the source's own ratio, so a consumer can reserve the
 * image's space alongside the thumbnail.
 *
 * @module cli/handle-thumbnails
 */

const fs = require('fs');
const path = require('path');
const { info, success, fail, cyan, gray } = require('../shared/logger');

/** Longest edge of a thumbnail, in pixels. */
const THUMBNAIL_SIZE = 16;

/** Raster extensions that get a thumbnail; SVG, GIF and icons opt out with `thumbnail={false}`. */
const RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

/**
 * Every raster file under `dir`, recursively, skipping dot-folders and node_modules.
 *
 * @param {string} dir
 * @returns {string[]} absolute file paths, sorted
 */
function findRasters(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...findRasters(full));
    else if (RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) found.push(full);
  }
  return found.sort();
}

/**
 * The thumbnail entry for one raster.
 *
 * @param {import('sharp')} sharp
 * @param {string} file - absolute path
 * @returns {Promise<{thumbnail: string, aspectRatio: string}>}
 */
async function createThumbnail(sharp, file) {
  const image = sharp(file);
  const { width, height } = await image.metadata();
  const buffer = await image
    .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, { fit: 'inside' })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  return { thumbnail: `data:image/png;base64,${buffer.toString('base64')}`, aspectRatio: `${width}/${height}` };
}

/**
 * Generate thumbnails for every raster under `dir` and write the JSON map.
 *
 * @param {string} dir - the public directory (paths are keyed relative to it)
 * @param {{ out?: string, dryRun?: boolean }} options
 * @returns {Promise<number>} exit code
 */
async function handleThumbnails(dir, { out, dryRun } = {}) {
  if (!dir || !fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    fail(`thumbnails takes a public directory. Try: ${cyan('nicely thumbnails ./public')}`);
    return 1;
  }
  let sharp;
  try {
    // Required by real path: under NODE_OPTIONS=--preserve-symlinks, sharp's own
    // dependencies do not resolve from pnpm's symlinked location.
    sharp = require(fs.realpathSync(require.resolve('sharp')));
  } catch {
    fail(`thumbnails needs ${cyan('sharp')}. Install it in @niceprototypes/cli.`);
    return 1;
  }

  const root = path.resolve(dir);
  const outFile = path.resolve(out || path.join(root, 'thumbnails.json'));
  const files = findRasters(root);
  info(`thumbnails: ${files.length} rasters under ${cyan(root)}`);

  const map = {};
  const failed = [];
  for (const file of files) {
    const key = '/' + path.relative(root, file).split(path.sep).join('/');
    try {
      map[key] = await createThumbnail(sharp, file);
    } catch (error) {
      failed.push(`${key}: ${error.message}`);
    }
  }
  for (const line of failed) fail(line);

  const json = JSON.stringify(map, null, 2) + '\n';
  if (dryRun) {
    info(`${gray('[dry-run]')} would write ${Object.keys(map).length} thumbnails (${json.length} bytes) to ${cyan(outFile)}`);
  } else {
    fs.writeFileSync(outFile, json);
    success(`Wrote ${Object.keys(map).length} thumbnails (${json.length} bytes) to ${cyan(outFile)}`);
  }
  return failed.length > 0 ? 1 : 0;
}

module.exports = { handleThumbnails, THUMBNAIL_SIZE };
