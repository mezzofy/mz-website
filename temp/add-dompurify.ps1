# Add DOMPurify CDN script before i18n.js on all HTML pages
$distRoot = "C:\Mezzofy\workspace\mz-website\dist"

$dompurifyTag = '<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js" integrity="sha512-1gSIBpL5ZrdNwSAGE7QjQCkTq3L6xIzYdJHRwDDCj4dD2oHS8w8eo0WMKY0gzQ0AzNsxDWdLGXp8xJgGN/Kg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>'

$files = Get-ChildItem -Path $distRoot -Recurse -Filter "*.html"

$updated = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Skip if DOMPurify already present
    if ($content -match 'dompurify|DOMPurify|purify\.min\.js') { continue }

    # Root pages pattern
    if ($content -match '<script src="i18n/i18n\.js">') {
        $content = $content -replace '(<script src="i18n/i18n\.js">)', "$dompurifyTag`n    `$1"
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $updated++
        Write-Host "Updated (root): $($file.Name)"
        continue
    }

    # Blog/news pages pattern (../i18n/i18n.js)
    if ($content -match '<script src="\.\./i18n/i18n\.js">') {
        $content = $content -replace '(<script src="\.\./i18n/i18n\.js">)', "$dompurifyTag`n    `$1"
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $updated++
        Write-Host "Updated (blog/news): $($file.Name)"
        continue
    }
}
Write-Host "Total files updated: $updated"
