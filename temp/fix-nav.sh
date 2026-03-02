#!/bin/bash

# List of news files to fix
files=(
  "treasure-global-partnership.html"
  "dual-esg-awards.html"
  "funding-announcement.html"
  "cioworld-feature.html"
  "techapple-innovation-index.html"
  "ejtech-300m-coupons.html"
  "edigest-leading-solution.html"
  "forbes-dicky-yin.html"
)

for file in "${files[@]}"; do
  echo "Processing $file..."
  
  # Find where content starts (first <section> tag)
  content_line=$(grep -n "^    <section" "dist/news/$file" | head -1 | cut -d: -f1)
  
  if [ -z "$content_line" ]; then
    echo "ERROR: Could not find content section in $file"
    continue
  fi
  
  # Extract head (lines 1-13)
  sed -n '1,13p' "dist/news/$file" > "temp/${file}.new"
  
  # Add correct navigation
  cat "temp/correct-nav.html" >> "temp/${file}.new"
  
  # Add content section (from <section> to end)
  sed -n "${content_line},\$p" "dist/news/$file" >> "temp/${file}.new"
  
  # Replace original file
  mv "temp/${file}.new" "dist/news/$file"
  
  echo "✓ Fixed $file (content starts at line $content_line)"
done

echo ""
echo "All files processed!"
