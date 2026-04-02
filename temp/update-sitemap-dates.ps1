# Update lastmod dates in sitemap.xml for pages modified 2026-04-02
$sitemapPath = "C:\Mezzofy\workspace\mz-website\dist\sitemap.xml"
$today = "2026-04-02"

# Pages with meaningful changes today (dead link fixes, schema additions, content changes)
$pagesToUpdate = @(
    "https://mezzofy.com/contact.html",
    "https://mezzofy.com/news-press.html",
    "https://mezzofy.com/for-ai-commerce.html",
    "https://mezzofy.com/support.html",
    "https://mezzofy.com/blog/e-coupons-preference.html",
    "https://mezzofy.com/blog/environmental-excellence.html",
    "https://mezzofy.com/blog/holiday-guide.html",
    "https://mezzofy.com/blog/hotel-tech-innovation.html",
    "https://mezzofy.com/blog/nfc-parknshop.html",
    "https://mezzofy.com/blog/smart-retail.html"
)

$content = Get-Content $sitemapPath -Raw -Encoding UTF8

foreach ($page in $pagesToUpdate) {
    # Match the <url> block containing this page and update its lastmod
    $pattern = "(<loc>$([regex]::Escape($page))</loc>\s*<lastmod>)[^<]+(</lastmod>)"
    $content = $content -replace $pattern, "`${1}$today`${2}"
}

[System.IO.File]::WriteAllText($sitemapPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Sitemap updated with $today dates for $(($pagesToUpdate).Count) pages"
