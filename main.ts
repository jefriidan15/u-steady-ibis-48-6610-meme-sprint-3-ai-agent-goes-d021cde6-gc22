// Meme Sprint 3: AI Agent Goes Rogue — entry program (program/v1).
// Writes the pre-rendered meme image to the output directory.
// Node 22 stdlib only. No network, no randomness, no clock, no writes
// outside the output directory. Deterministic: two runs write identical bytes.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// sha256 of the entry.png shipped in this repository.
const EXPECTED_SHA256 =
  "2543b14f9608aaddf70eaf6854e681b317b07331e8c35ced13d5ec042f250a3a";
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
const MAX_BYTES = 1048576;

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const dst = join(outDir, "entry.png");

const data = readFileSync(src);

// Validate PNG magic.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (data.length < 33 || !data.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file");
}

// Validate dimensions from the IHDR chunk (width/height, big-endian uint32).
// Bytes 12-15 must spell "IHDR"; width/height follow at 16 and 20.
// The IHDR chunk's length field (bytes 8-11) must be exactly 13.
if (data.readUInt32BE(8) !== 13) {
  throw new Error("entry.png has a malformed IHDR chunk length");
}
if (data.subarray(12, 16).toString("ascii") !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk");
}
const width = data.readUInt32BE(16);
const height = data.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error("entry.png is " + width + "x" + height + ", expected 1024x1024");
}

// Validate size and content hash before copying.
if (data.length > MAX_BYTES) {
  throw new Error("entry.png is " + data.length + " bytes, over the 1 MiB gate");
}
const hash = createHash("sha256").update(data).digest("hex");
if (hash !== EXPECTED_SHA256) {
  throw new Error("entry.png sha256 mismatch: got " + hash);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Verify the copy byte-for-byte.
const copied = readFileSync(dst);
if (!copied.equals(data)) {
  throw new Error("copied entry.png differs from the shipped file");
}

console.log(
  "wrote " + dst + " (" + copied.length + " bytes, " + width + "x" + height + ", sha256 " + hash + ")",
);
