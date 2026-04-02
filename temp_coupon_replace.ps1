# Replace coupon terms in all translation files
# zh-TW: 優惠券 → 電子券
# zh-CN: 优惠券 → 电子券

$files = @(
    @{ path = "C:\Mezzofy\workspace\mz-website\dist\i18n\translations\zh-TW.json"; from = "優惠券"; to = "電子券" },
    @{ path = "C:\Mezzofy\workspace\mz-website\src\i18n\translations\zh-TW.json";  from = "優惠券"; to = "電子券" },
    @{ path = "C:\Mezzofy\workspace\mz-website\dist\i18n\translations\zh-CN.json"; from = "优惠券"; to = "电子券" },
    @{ path = "C:\Mezzofy\workspace\mz-website\src\i18n\translations\zh-CN.json";  from = "优惠券"; to = "电子券" }
)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.path, [System.Text.Encoding]::UTF8)
    $count = ([regex]::Matches($content, [regex]::Escape($f.from))).Count
    $updated = $content.Replace($f.from, $f.to)
    [System.IO.File]::WriteAllText($f.path, $updated, [System.Text.Encoding]::UTF8)
    Write-Host "Updated $($f.path.Split('\')[-1]): replaced $count occurrences of '$($f.from)' → '$($f.to)'"
}
