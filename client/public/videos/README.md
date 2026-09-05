# Project Demo Videos

Place a **real screen recording** of each running product in this directory — not an AI-generated mockup. A short, honest walkthrough beats a polished fake: viewers (especially technical clients) can usually tell, and this site's whole pitch is "proof, not promises."

1. **FinSight Demo Video**:
   Save your video as: `finsight-demo.mp4`
   Path: `client/public/videos/finsight-demo.mp4`

2. **Factscope AI Demo Video**:
   Save your video as: `factscope-demo.mp4`
   Path: `client/public/videos/factscope-demo.mp4`

### Recording it
- Windows: `Win + G` opens the built-in Xbox Game Bar recorder (no watermark, no install).
- Keep it short and real: 20–40 seconds of the actual UI doing the thing it does — upload a doc and ask it a question, show a claim getting verified, etc.
- Narrate or caption briefly what's happening; you don't need production polish.

### Before committing
Compress it first — raw screen recordings are often 15–25MB, which is a slow load on a portfolio site. Re-encode with ffmpeg (H.264, CRF ~26–28 keeps text sharp while cutting size 60–75%):

```bash
ffmpeg -i raw-recording.mp4 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart finsight-demo.mp4
```

### Supported formats
- `.mp4` (H.264 video + AAC audio — widest browser compatibility)
- `.webm`
- Or skip local files entirely and paste a YouTube/Loom/Vimeo URL into `projectVideos` in `client/src/pages/Home.tsx` — same effect, no repo bloat.

### Git & Vercel
When you commit and push these files to your GitHub repository, Vercel automatically deploys them as static assets with native browser streaming (byte-range seeking, mobile compatible, full controls).
