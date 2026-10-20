# BlackSheep Reel

Source for the 8.5s sizzle reel on the Playground page (`public/media/reel/`). Rendered with [HyperFrames](https://github.com/heygen-com/hyperframes): `index.html` is a seekable HTML/CSS/GSAP composition, not a video file.

## Rebuild

```bash
cd tools/reel
npx hyperframes@latest check    # lint + runtime + layout + motion + contrast
npx hyperframes@latest render   # writes renders/reel_<timestamp>.mp4
```

Copy the output to `public/media/reel/blacksheep-reel.mp4`, and refresh the poster frame with:

```bash
ffmpeg -y -ss 2.75 -i renders/reel_<timestamp>.mp4 -frames:v 1 -update 1 -q:v 2 ../../public/media/reel/blacksheep-reel-poster.jpg
```

Fonts and the logo mark under `assets/` are copied from the main site (`node_modules/@fontsource-variable/*`, `public/logo-mark.png`) so the composition stays fully self-hosted, no CDN fetches, since the renderer is a headless browser with no network access during render.
