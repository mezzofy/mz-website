const http = require('http');

http.get('http://localhost:8000/i18n/translations/en.json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        console.log('=== Checking management section ===');
        console.log('management exists:', json.management ? 'YES' : 'NO');
        console.log('footerCta exists:', json.management?.footerCta ? 'YES' : 'NO');
        console.log('getStarted:', json.management?.footerCta?.getStarted || 'MISSING');
        console.log('contactSales:', json.management?.footerCta?.contactSales || 'MISSING');
        console.log('hero.title:', (json.management?.hero?.title || 'MISSING').substring(0, 50));
        console.log('\n=== All footerCta keys ===');
        if (json.management?.footerCta) {
            Object.keys(json.management.footerCta).forEach(key => {
                console.log(`  ${key}: ${json.management.footerCta[key]}`);
            });
        }
    });
}).on('error', (e) => {
    console.error('Error:', e.message);
});
