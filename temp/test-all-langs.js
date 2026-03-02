const http = require('http');

const languages = ['en', 'zh-TW', 'zh-CN'];
let completed = 0;

languages.forEach(lang => {
    http.get(`http://localhost:8000/i18n/translations/${lang}.json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const json = JSON.parse(data);
            console.log(`\n=== ${lang}.json ===`);
            console.log('management exists:', json.management ? 'YES' : 'NO');
            console.log('hero.title:', (json.management?.hero?.title || 'MISSING').substring(0, 40));
            console.log('footerCta.getStarted:', json.management?.footerCta?.getStarted || 'MISSING');
            console.log('footerCta.contactSales:', json.management?.footerCta?.contactSales || 'MISSING');

            completed++;
            if (completed === languages.length) {
                console.log('\n=== All languages checked ===');
            }
        });
    }).on('error', (e) => {
        console.error(`Error loading ${lang}:`, e.message);
    });
});
