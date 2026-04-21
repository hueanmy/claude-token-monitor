#!/usr/bin/env bash
# Convert Playwright's marketing .webm → .mp4 for 2 aspect ratios.
# Usage: bash plugin/tests/record/convert-marketing.sh
set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

command -v ffmpeg >/dev/null || { echo "ffmpeg missing (brew install ffmpeg)"; exit 1; }

if [ ! -d videos-marketing ]; then
  echo "No videos-marketing/ directory — run 'npm run record:marketing' first."
  exit 1
fi

find videos-marketing -name 'video.webm' | while read -r src; do
  project="$(basename "$(dirname "$src")")"
  case "$project" in
    *desktop-16x9*) out="marketing-16x9.mp4" ;;
    *mobile-9x16*)  out="marketing-9x16.mp4" ;;
    *)              out="$project.mp4"       ;;
  esac
  echo "▸ $src → $out"
  ffmpeg -y -nostdin -loglevel error -i "$src" \
    -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p \
    -movflags +faststart \
    "$out"
done

echo "Done. Outputs: marketing-16x9.mp4, marketing-9x16.mp4"
echo ""
echo "Next: add ElevenLabs voice-over. Example ffmpeg one-liner:"
echo "  ffmpeg -i marketing-16x9.mp4 -i voiceover.mp3 -c:v copy -c:a aac -shortest marketing-16x9-final.mp4"
