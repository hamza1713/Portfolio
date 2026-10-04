# Walkthrough media

These images are actual frames extracted from the existing portfolio recordings, without generating or reconstructing interface elements:

| Project | Recording | Timestamp |
| --- | --- | --- |
| FinSight | `/videos/Finsight.mp4` | 49.84 seconds |
| AI Code Review Agent | `/videos/CodeReview.mp4` | 33.2 seconds |
| Factscope AI | `/videos/Factscope.mp4` | 20.43 seconds |

The recordings include illustrative presentation visuals. A frame is not evidence of a live deployment or independent validation of displayed scores. The case studies link to the implementation and scoped evaluation documentation.

Browser chrome was cropped from the FinSight and Code Review frames. Responsive WebP versions preserve a 16:9 canvas. The separate share images are portfolio artwork, not product screenshots.

For maintenance, extract the named frames to `.cache/media/<slug>-<frame>.png`, then run `node scripts/generate-media.mjs .cache/media`. Frame indices are documented in that script. Generated assets are committed; FFmpeg is not needed to build or run the portfolio.
