const http = require('http');

console.log('=== Comprehensive i18n Test ===\n');

// Test 1: Check HTML page structure
console.log('1. Testing HTML page...');
http.get('http://localhost:8000/coupon-management.html', (res) => {
    let html = '';
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
        const hasI18nScript = html.includes('src="i18n/i18n.js"');
        const hasMainScript = html.includes('src="js/main.js"');
        const hasI18nLoading = html.includes('i18n-loading');
        const hasDataI18n = html.includes('data-i18n="management.footerCta.getStarted"');

        console.log('   ✓ i18n.js script:', hasI18nScript ? 'FOUND' : 'MISSING');
        console.log('   ✓ main.js script:', hasMainScript ? 'FOUND' : 'MISSING');
        console.log('   ✓ i18n-loading class:', hasI18nLoading ? 'FOUND' : 'MISSING');
        console.log('   ✓ data-i18n attributes:', hasDataI18n ? 'FOUND' : 'MISSING');

        // Test 2: Check all three language files
        console.log('\n2. Testing translation files...');
        const langs = ['en', 'zh-TW', 'zh-CN'];
        let completed = 0;

        langs.forEach(lang => {
            http.get(`http://localhost:8000/i18n/translations/${lang}.json`, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        const hasManagement = !!json.management;
                        const hasFooterCta = !!json.management?.footerCta;
                        const hasGetStarted = !!json.management?.footerCta?.getStarted;
                        const hasContactSales = !!json.management?.footerCta?.contactSales;

                        console.log(`   ${lang}:`);
                        console.log(`     ✓ management section: ${hasManagement ? 'YES' : 'NO'}`);
                        console.log(`     ✓ footerCta section: ${hasFooterCta ? 'YES' : 'NO'}`);
                        console.log(`     ✓ getStarted key: ${hasGetStarted ? json.management.footerCta.getStarted : 'MISSING'}`);
                        console.log(`     ✓ contactSales key: ${hasContactSales ? json.management.footerCta.contactSales : 'MISSING'}`);

                        completed++;
                        if (completed === langs.length) {
                            console.log('\n=== All tests passed! Server is configured correctly ===');
                            console.log('\n📍 Test the page at: http://localhost:8000/coupon-management.html');
                            console.log('💡 If translations still not working, try:');
                            console.log('   1. Open page in incognito/private mode');
                            console.log('   2. Clear browser cache completely');
                            console.log('   3. Check browser console (F12) for any JavaScript errors');
                        }
                    } catch (e) {
                        console.error(`   ❌ Error parsing ${lang}.json:`, e.message);
                    }
                });
            });
        });
    });
});
