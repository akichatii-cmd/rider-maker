#!/usr/bin/env python3
"""Regenerate PWA icons for РайдерМейкер (public/icon-*.png).

Design: amber stage-monitor wedge (#ff9f1c) outline with grille lines
on a dark background (#0c0e11). Run from the project root:

    pip install pillow
    python3 scripts/generate-icons.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

BG = (12, 14, 17, 255)        # #0c0e11
AMBER = (255, 159, 28, 255)   # #ff9f1c

OUT = Path(__file__).resolve().parent.parent / 'public'

# wedge geometry in a 512x512 box: top edge and bottom edge of the trapezoid
TOP_Y, BOT_Y = 108, 464
TOP_HALF, BOT_HALF = 79, 179          # half-widths (measured from the original icon)
GRILLE_YS = (198, 286, 373)           # horizontal grille lines
STROKE = 7


def half_width_at(y: float) -> float:
    t = (y - TOP_Y) / (BOT_Y - TOP_Y)
    return TOP_HALF + (BOT_HALF - TOP_HALF) * t


def draw_wedge(draw: ImageDraw.ImageDraw, cx: int, scale: float) -> None:
    def pt(x_off: float, y: float) -> tuple[float, float]:
        return (cx + x_off * scale, y * scale)

    ty, by = TOP_Y * scale, BOT_Y * scale
    th, bh = TOP_HALF * scale, BOT_HALF * scale
    w = STROKE * scale
    # trapezoid outline
    draw.line([pt(-th, ty / scale * scale), pt(th, ty / scale * scale)], fill=AMBER, width=round(w))
    draw.line([(cx - th, ty), (cx - bh, by)], fill=AMBER, width=round(w))
    draw.line([(cx + th, ty), (cx + bh, by)], fill=AMBER, width=round(w))
    draw.line([(cx - bh, by), (cx + bh, by)], fill=AMBER, width=round(w))
    # grille lines follow the slant
    for gy in GRILLE_YS:
        hw = half_width_at(gy) * scale
        draw.line([(cx - hw, gy * scale), (cx + hw, gy * scale)], fill=AMBER, width=round(w))


def make_icon(size: int, maskable: bool = False) -> Image.Image:
    ss = 4  # supersampling
    img = Image.new('RGBA', (size * ss, size * ss), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        # full-bleed background, wedge shrunk into the safe zone
        d.rectangle([0, 0, size * ss, size * ss], fill=BG)
        inner = Image.new('RGBA', (size * ss, size * ss), (0, 0, 0, 0))
        di = ImageDraw.Draw(inner)
        draw_wedge(d, size * ss // 2, size * ss / 512 * 0.82)
    else:
        radius = round(size * ss * 0.18)
        d.rounded_rectangle([0, 0, size * ss - 1, size * ss - 1], radius=radius, fill=BG)
        draw_wedge(d, size * ss // 2, size * ss / 512)
    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for size in (1024, 512, 192, 180):
        make_icon(size).save(OUT / f'icon-{size}.png')
        print(f'public/icon-{size}.png')
    make_icon(512, maskable=True).save(OUT / 'icon-maskable-512.png')
    print('public/icon-maskable-512.png')


if __name__ == '__main__':
    main()
