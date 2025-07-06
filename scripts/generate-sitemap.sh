#!/bin/bash

# Auto-generate sitemap.xml for Catan Map Generator
# This script should be run whenever new pages are added

DOMAIN="https://catanmapgenerator.app"
SITEMAP_FILE="public/sitemap.xml"
CURRENT_DATE=$(date +%Y-%m-%d)

echo "Generating sitemap for $DOMAIN..."

# Create sitemap header
cat > "$SITEMAP_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>$DOMAIN/</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>$DOMAIN/seafarers</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>$DOMAIN/rules</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>$DOMAIN/legal/privacy</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>$DOMAIN/legal/terms</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>$DOMAIN/legal/disclaimer</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>$DOMAIN/legal/cookies</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
EOF

echo "Sitemap generated successfully at $SITEMAP_FILE"
echo "Don't forget to submit to Google Search Console!"
