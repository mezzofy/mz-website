# Add og:image:alt meta tag after og:image on all pages that don't have it yet
$distRoot = "C:\Mezzofy\workspace\mz-website\dist"
$altContent = '    <meta property="og:image:alt"        content="Mezzofy — Global Coupon Exchange Protocol platform interface">'

# Get all HTML files
$files = Get-ChildItem -Path $distRoot -Recurse -Filter "*.html" | Where-Object { $_.Name -ne "index_test.html" }

$updated = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    # Skip if already has og:image:alt
    if ($content -match 'og:image:alt') { continue }
    # Skip if no og:image tag
    if ($content -notmatch 'og:image"') { continue }

    # Add og:image:alt line after og:image line
    $newContent = $content -replace '(<meta property="og:image"\s+content="[^"]+">)', "`$1`n$altContent"
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    $updated++
    Write-Host "Updated: $($file.Name)"
}
Write-Host "Total files updated: $updated"
