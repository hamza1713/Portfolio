# Project walkthroughs

The portfolio uses these existing, owner-supplied recordings:

- `Finsight.mp4` — FinSight, about 60 seconds.
- `CodeReview.mp4` — AI Code Review Agent, about 40 seconds.
- `Factscope.mp4` — Factscope AI, about 30 seconds.

They include illustrative presentation visuals. The portfolio labels extracted images as walkthrough frames and links separately to implementation and evaluation evidence. A recording does not establish a live deployment or independent factual accuracy.

Video elements mount only after a visitor activates the playback button. Native controls, inline mobile playback, range requests, and a helpful load-error message are preserved.

For future replacements, record the actual running interface, include captions or a transcript, and keep example data clearly identified. Update `shared/portfolio.ts` if a filename changes, then regenerate posters using `scripts/generate-media.mjs`. Responsive poster provenance is documented in `../assets/projects/README.md`.

Use H.264/AAC MP4 with a front-loaded `moov` atom for broad browser support and efficient seeking. Keep the original elsewhere before compressing. An example maintenance command is:

```sh
ffmpeg -i original.mp4 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart replacement.mp4
```

Local MP4, HTTPS video, YouTube, Vimeo, and Loom sources are supported. No video is downloaded before activation.
