# Fix corrupted og:image:alt content (em dash encoding issue)
$distRoot = "C:\Mezzofy\workspace\mz-website\dist"

$files = Get-ChildItem -Path $distRoot -Recurse -Filter "*.html"

$updated = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -notmatch 'og:image:alt') { continue }

    # Replace the corrupted line with correct content (ASCII hyphen instead of em dash)
    $newContent = $content -replace '<meta property="og:image:alt"\s+content="[^"]*">', '<meta property="og:image:alt"        content="Mezzofy - Global Coupon Exchange Protocol platform">'
    if ($newContent -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $updated++
        Write-Host "Fixed: $($file.Name)"
    }
}
Write-Host "Total files fixed: $updated"
