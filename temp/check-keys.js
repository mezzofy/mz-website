const fs = require('fs');

// Read translation file
const enJson = JSON.parse(fs.readFileSync('dist/i18n/translations/en.json', 'utf8'));

// Read all keys from HTML
const keysFromFile = fs.readFileSync('management-keys.txt', 'utf8').trim().split('\n');

const missing = [];

keysFromFile.forEach(key => {
    const parts = key.split('.');
    let obj = enJson;

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
    console.log('❌ Missing translation keys (' + missing.length + '):');
    missing.forEach(key => console.log('  - ' + key));
} else {
    console.log('✅ All translation keys found!');
}
