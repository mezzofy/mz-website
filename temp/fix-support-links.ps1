# Fix support links in root-level pages
$rootFiles = Get-ChildItem "C:\Mezzofy\workspace\mz-website\dist\*.html"
foreach ($file in $rootFiles) {
    $content = Get-Content $file.FullName -Raw
    # Fix nav support links (desktop dropdown and mobile accordion)
    $content = $content -replace 'href="[^"]*"(\s+class="[^"]*"\s+data-i18n="common\.nav\.support")', 'href="support.html"$1'
    # Fix footer support links
    $content = $content -replace 'href="[^"]*"(\s+class="[^"]*"\s+data-i18n="common\.footer\.resources\.support")', 'href="support.html"$1'
    Set-Content $file.FullName $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

# Fix blog and news subdirectory pages
$subFiles = Get-ChildItem "C:\Mezzofy\workspace\mz-website\dist\blog\*.html", "C:\Mezzofy\workspace\mz-website\dist\news\*.html"
foreach ($file in $subFiles) {
    $content = Get-Content $file.FullName -Raw
    # Fix nav support links
    $content = $content -replace 'href="[^"]*"(\s+class="[^"]*"\s+data-i18n="common\.nav\.support")', 'href="../support.html"$1'
    # Fix footer support links
    $content = $content -replace 'href="[^"]*"(\s+class="[^"]*"\s+data-i18n="common\.footer\.resources\.support")', 'href="../support.html"$1'
    Set-Content $file.FullName $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "Done."
