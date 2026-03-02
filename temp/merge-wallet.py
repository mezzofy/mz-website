import json

pairs = [
    ("dist/i18n/translations/en.json",    "temp/wallet-en.json"),
    ("dist/i18n/translations/zh-TW.json", "temp/wallet-zh-TW.json"),
    ("dist/i18n/translations/zh-CN.json", "temp/wallet-zh-CN.json"),
    ("src/i18n/translations/en.json",     "temp/wallet-en.json"),
    ("src/i18n/translations/zh-TW.json",  "temp/wallet-zh-TW.json"),
    ("src/i18n/translations/zh-CN.json",  "temp/wallet-zh-CN.json"),
]

for target, source in pairs:
    with open(source, encoding="utf-8") as f:
        block = json.load(f)
    with open(target, encoding="utf-8") as f:
        data = json.load(f)
    if "wallet" in data:
        print(f"SKIP (already exists): {target}")
        continue
    data["wallet"] = block
    with open(target, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"OK: {target}")

print("Done.")
