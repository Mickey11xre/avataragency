# LiveBrand.ai — Hero Video Clip Spec

Spec for the homepage full-bleed hero: **one huge close-up face at a time, cycling through 8 people**, subtle human motion, crossfading. Hand this to the video production agent.

Context that drives every choice below:
- The video is **full-bleed** — CSS `object-fit: cover` crops it to fill the viewport (wide desktop → near-portrait mobile). Anything important must sit in a center-safe zone or it gets cropped.
- There is **no dark scrim** over the video. The white headline sits **lower-left**, so the footage's lower-left area must stay visually calm and on the darker side or the text becomes unreadable.
- 8 clips crossfade into each other, so they must feel like **one cohesive set** (matched grade, lighting, background).

---

## 1. Deliverables
- **8 face clips** — `face_01.mov` … `face_08.mov` (8 distinct people).
- **8 poster stills** — `face_01_poster.jpg` … one representative high-res frame per clip (for the fast-loading LCP poster and mobile fallback).
- No audio track (deliver muted).

## 2. Resolution & aspect ratio
- **Aspect ratio: 16:9** (landscape) — matches the desktop hero.
- **Master resolution: 3840×2160 (4K) preferred**, 2560×1440 minimum. Full-bleed on large/retina displays needs the headroom; we down-encode for web.
- We (the web build) transcode masters → **1920×1080** primary web file + **1280×720** mobile, in AV1/VP9 `.webm` + H.264 `.mp4`. The agent only needs to deliver pristine masters.

## 3. Frame rate & duration
- **30 fps**, constant. (24 fps acceptable if preferred for a filmic feel — just keep it **identical across all 8**.)
- **5–6 seconds per clip.** We trim to a ~4s active window with crossfade in/out, so give a little handle on each end. Begin and end **calm/steady** (no motion mid-transition).

## 4. Framing & composition
- **Tight close-up portrait:** top of head near or just above the top edge; shoulders just entering the bottom; **eyes on the upper third.**
- **Center-safe rule:** keep the eyes and full face within the **central 80%** of frame both axes. Because cover-crop can trim to ~4:5 on mobile, faces near the edges get cut.
- **Look direction: into the camera** — direct, warm eye contact. This sells the "always-on presence." Catchlights in the eyes.
- **Lower-left calm zone:** the bottom-left ~third of frame must read **darker / simpler** (shadow side, background falloff, or hair) so the white headline over it stays legible. If the subject is brightly lit, add a natural falloff to shadow toward lower-left.

## 5. Motion (this is the make-or-break)
- **Micro-motion only**, slow and graceful:
  - a natural **smile slowly forming**,
  - a **slow blink**,
  - a **gentle nod or slight head tilt**,
  - subtle hair / micro skin movement.
- **No talking** (mouth movement without audio looks off — a warm forming/closed smile reads best), **no hand gestures**, no fast or large movements, no zoom/whip pans.
- Think "living portrait," not "clip of someone doing something."

## 6. Lighting, background, color
- **Lighting:** soft, flattering key with gentle contrast; consistent color temperature (~warm daylight) across **all 8**.
- **Background:** soft, **defocused (shallow depth of field)**, neutral or **dark**, non-distracting, and **consistent across all 8**. Dark backgrounds are preferred — they aid text contrast and make the crossfades cohesive.
- **Color grade:** one unified look across all clips — warm, natural, premium skin tones, lightly filmic. Avoid heavy stylization or mismatched tints (crossfades between mismatched grades look bad).

## 7. Casting (the story)
- **8 distinct people**, diverse across **age, ethnicity, and gender** — the point is *everyone's persona is one of a kind.*
- Tone: **authentic, warm, premium** — Apple/Coke/Tesla, not cheesy stock-smiley. Real, relaxed, confident.

## 8. Master file format
- **ProRes 422 HQ (`.mov`)** preferred, or high-bitrate H.264/HEVC (~40–60 Mbps at 4K). Near-lossless so our web re-encode stays clean.
- Color: Rec.709, 8-bit is fine; deliver already-graded.

## 9. Optional (nice-to-have)
- A **9:16 or 4:5 recompose** of each subject for a true mobile video hero (otherwise mobile uses the poster still).

---

---

## Web transcode recipe (for each new master)

ffmpeg is installed but **not on PATH** — call it by full path:
`C:\Users\user\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe`

- Masters live in `C:\VideoProjects\LIVEBRAND\` (never in the repo).
- Web outputs go to `C:\Dev\avataragency\design\livebrand\hero-media\` as `<name>.mp4` + `<name>.jpg`.

```
# 1080p H.264, faststart (progressive streaming), no audio
ffmpeg -y -i MASTER.mp4 -vf "scale=-2:1080" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 22 -preset veryfast -movflags +faststart -an OUT\name.mp4
# poster frame (grab at 1s)
ffmpeg -y -ss 1 -i MASTER.mp4 -frames:v 1 -vf "scale=-2:1080" -q:v 3 OUT\name.jpg
```

Then add one line to `SOURCES` in `hero.html`:
`{ mp4: 'hero-media/name.mp4', poster: 'hero-media/name.jpg' }`

Results so far: Ethica 20.8 MB → **928 KB**, Lawyer 10.8 MB → **1.45 MB**. Dev server MIME map (`.claude/static-server.ps1`) now includes `.mp4`/`.webm`.
*Optional further optimization: also emit VP9/AV1 `.webm` (~30–50% smaller) with an mp4 fallback `<source>`.*

---

### Quick reference (paste to the agent)
> 8 clips, 8 different people (diverse age/ethnicity/gender). 16:9, 4K master (3840×2160), 30fps, 5–6s each, no audio, ProRes 422 HQ. Tight close-up, eyes upper-third, looking into camera, face within central 80%. Micro-motion only (smile forming / slow blink / gentle nod) — no talking, no gestures. Soft flattering light, dark defocused background, one unified warm grade across all 8. Keep the lower-left of frame darker (white headline overlays there). Also deliver one high-res poster JPG per clip.
