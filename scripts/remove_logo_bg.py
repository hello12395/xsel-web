from PIL import Image
import numpy as np

src = r"D:\xsel\xsel-web\public\xsel-logo-3d.png"
img = Image.open(src).convert("RGBA")
arr = np.array(img).astype(np.int16)
print("size", img.size)

r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
h, w = arr.shape[:2]
print("corner", tuple(arr[2, 2, :3]), tuple(arr[h // 2, 2, :3]))

# White / near-white tile background
white_mask = (r > 235) & (g > 235) & (b > 235)
near_white = (
    (r > 215)
    & (g > 220)
    & (b > 225)
    & (np.abs(r - g) < 30)
    & (b >= g - 8)
)
# Soft shadow around the white tile (light gray)
soft_shadow = (r > 180) & (g > 185) & (b > 190) & (np.abs(r - g) < 18) & (np.abs(g - b) < 18) & ((r + g + b) > 560)
# Outer pale blue page bg if present
light_blue = (r > 200) & (g > 210) & (b > 230) & (b > r) & (b >= g - 5)

mask = white_mask | near_white | soft_shadow | light_blue
out_arr = arr.astype(np.uint8).copy()
out_arr[:, :, 3] = np.where(mask, 0, a.astype(np.uint8))

out = Image.fromarray(out_arr)

alpha = out_arr[:, :, 3]
ys, xs = np.where(alpha > 10)
if len(xs):
    pad = 6
    left, right = max(0, int(xs.min()) - pad), min(w, int(xs.max()) + pad + 1)
    top, bottom = max(0, int(ys.min()) - pad), min(h, int(ys.max()) + pad + 1)
    out = out.crop((left, top, right, bottom))
    print("cropped", out.size)

out.save(src, "PNG")
print("saved", src)
