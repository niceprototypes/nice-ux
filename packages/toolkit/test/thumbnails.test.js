const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const sharp = require(fs.realpathSync(require.resolve("sharp")))
const { handleThumbnails, THUMBNAIL_SIZE } = require("../src/cli/handle-thumbnails")

test("writes a thumbnail and aspect ratio per raster, keyed by public path", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "nicely-thumbnails-"))
  fs.mkdirSync(path.join(dir, "rasters"))
  const red = { r: 255, g: 0, b: 0 }
  await sharp({ create: { width: 320, height: 160, channels: 3, background: red } }).png().toFile(path.join(dir, "rasters", "wide.png"))
  await sharp({ create: { width: 90, height: 120, channels: 3, background: red } }).jpeg().toFile(path.join(dir, "tall.jpg"))
  fs.writeFileSync(path.join(dir, "icon.svg"), "<svg xmlns='http://www.w3.org/2000/svg'/>")

  assert.equal(await handleThumbnails(dir), 0)
  const map = JSON.parse(fs.readFileSync(path.join(dir, "thumbnails.json"), "utf8"))
  assert.deepEqual(Object.keys(map), ["/rasters/wide.png", "/tall.jpg"])
  assert.equal(map["/rasters/wide.png"].aspectRatio, "320/160")
  assert.equal(map["/tall.jpg"].aspectRatio, "90/120")

  const buffer = Buffer.from(map["/rasters/wide.png"].thumbnail.replace("data:image/png;base64,", ""), "base64")
  const { width, height } = await sharp(buffer).metadata()
  assert.equal(width, THUMBNAIL_SIZE)
  assert.equal(height, THUMBNAIL_SIZE / 2)
  fs.rmSync(dir, { recursive: true })
})

test("rejects a missing directory", async () => {
  assert.equal(await handleThumbnails(path.join(os.tmpdir(), "nicely-thumbnails-missing")), 1)
})
