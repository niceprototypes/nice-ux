#!/bin/bash

# Fix all stroke.svg files by wrapping them in proper SVG elements
for file in src/components/vectors/*/stroke.svg; do
  # Read the content
  content=$(cat "$file")

  # Check if it already has an svg tag
  if echo "$content" | grep -q "^<svg"; then
    echo "Skipping $file - already has svg tag"
  else
    # Wrap the content in an SVG element
    echo '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">' > "$file"
    echo "$content" | sed 's/<g>/  <g>/' | sed 's/<\/g>/  <\/g>/' >> "$file"
    echo '</svg>' >> "$file"
    echo "Fixed $file"
  fi
done

# Check fill.svg files too
for file in src/components/vectors/*/fill.svg; do
  content=$(cat "$file")

  # Check if it's just a fragment
  if echo "$content" | grep -q "^<g>$"; then
    # It's just an empty g tag, wrap it
    echo '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">' > "$file"
    echo "$content" | sed 's/<g>/  <g>/' | sed 's/<\/g>/  <\/g>/' >> "$file"
    echo '</svg>' >> "$file"
    echo "Fixed $file"
  fi
done

echo "All SVG files have been fixed!"