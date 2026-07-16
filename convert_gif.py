"""
Convert BANNER.mp4 -> assets/hero.gif
Uses: imageio (with bundled ffmpeg via pyav) + Pillow
"""

import imageio.v3 as iio
from PIL import Image
import os, sys

# Force UTF-8 output to avoid Windows cp1252 issues
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

INPUT  = "BANNER.mp4"
OUTPUT = "assets/hero.gif"

print("[1/5] Reading BANNER.mp4 ...")

# Read all frames via imageio (uses bundled ffmpeg via pyav)
frames_raw = iio.imread(INPUT, plugin="pyav", index=None)

print(f"      Total frames : {len(frames_raw)}")
print(f"      Original size: {frames_raw[0].shape[1]}x{frames_raw[0].shape[0]}")

# Detect source FPS
original_fps = 30
try:
    meta = iio.immeta(INPUT, plugin="pyav")
    fps_val = meta.get("fps", 30)
    original_fps = float(fps_val)
    print(f"      Source FPS   : {original_fps:.1f}")
except Exception:
    print("      Source FPS   : assumed 30")

# Downsample to ~12 fps
target_fps = 12
step       = max(1, round(original_fps / target_fps))
frames_sub = frames_raw[::step]
print(f"      GIF frames   : {len(frames_sub)} (1 of every {step} frames @ ~{target_fps}fps)")

# Resize to max 900px wide
TARGET_W = 900
h0, w0   = frames_sub[0].shape[:2]
if w0 > TARGET_W:
    TARGET_H = int(h0 * TARGET_W / w0)
    if TARGET_H % 2 != 0:
        TARGET_H -= 1
else:
    TARGET_W, TARGET_H = w0, h0
print(f"      Output size  : {TARGET_W}x{TARGET_H}")

# Convert + resize + quantize each frame
print("[2/5] Processing frames ...")
pil_frames = []
total = len(frames_sub)
for i, frame in enumerate(frames_sub):
    img  = Image.fromarray(frame).resize((TARGET_W, TARGET_H), Image.LANCZOS)
    imgq = img.quantize(colors=128, method=Image.Quantize.FASTOCTREE,
                        dither=Image.Dither.FLOYDSTEINBERG)
    pil_frames.append(imgq)
    if (i + 1) % 30 == 0 or (i + 1) == total:
        pct = int((i + 1) / total * 100)
        print(f"      [{pct:3d}%] {i+1}/{total} frames done")

print(f"[3/5] All {len(pil_frames)} frames processed.")

# Save GIF
os.makedirs("assets", exist_ok=True)
print(f"[4/5] Saving -> {OUTPUT} ...")
duration_ms = int(1000 / target_fps)

pil_frames[0].save(
    OUTPUT,
    save_all=True,
    append_images=pil_frames[1:],
    loop=0,
    duration=duration_ms,
    optimize=False,
)

size_mb = os.path.getsize(OUTPUT) / (1024 * 1024)
print(f"[5/5] DONE!")
print(f"")
print(f"  Output : {OUTPUT}")
print(f"  Size   : {size_mb:.1f} MB")
print(f"  Frames : {len(pil_frames)}")
print(f"  FPS    : ~{target_fps}")
print(f"  Dims   : {TARGET_W}x{TARGET_H}")
print(f"")
if size_mb > 15:
    print("WARNING: File is >15MB. GitHub may not render it inline.")
    print("         Re-run with TARGET_W=700 and target_fps=8 for smaller output.")
else:
    print("SUCCESS: Push assets/hero.gif to GitHub - it will display automatically!")
