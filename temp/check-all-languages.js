const fs = require('fs');

// Read all keys from HTML
const keysFromFile = fs.readFileSync('management-keys.txt', 'utf8').trim().split('\n');

const languages = ['en', 'zh-TW', 'zh-CN'];

languages.forEach(lang => {
    console.log(`\n=== Checking ${lang}.json ===`);

    const json = JSON.parse(fs.readFileSync(`dist/i18n/translations/${lang}.json`, 'utf8'));
    const missing = [];

    keysFromFile.forEach(key => {
        const parts = key.split('.');
        let obj = json;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (obj && typeof obj === 'object' && part in obj) {
                obj = obj[part];
            } else {
                missing.push(key);
                break;
            }
        }
    });

    if (missing.length > 0) {
        console.log(`❌ Missing ${missing.length} keys:`);
        missing.forEach(key => console.log(`  - ${key}`));
    } else {
        console.log('✅ All keys found!');
    }
});
