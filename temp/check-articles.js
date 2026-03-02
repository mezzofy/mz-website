const en = JSON.parse(require('fs').readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/en.json', 'utf8'));
const tw = JSON.parse(require('fs').readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-TW.json', 'utf8'));
const cn = JSON.parse(require('fs').readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-CN.json', 'utf8'));

function check(enO, twO, cnO, p) {
  const r = [];
  for (const k of Object.keys(enO)) {
    const fp = p ? p + '.' + k : k;
    if (typeof enO[k] === 'string') {
      const e = enO[k], t = twO && twO[k], c = cnO && cnO[k];
      // Skip expected English values
      const skip = /hello@|support@|HK\$0|EJINSIGHT|^[0-9]|200\+|85%|3x|Followers determine/.test(e);
      if (typeof t === 'string' && t === e && !skip) r.push('TW:' + fp + ' => ' + e.substring(0,50));
      if (typeof c === 'string' && c === e && !skip) r.push('CN:' + fp + ' => ' + e.substring(0,50));
    } else if (typeof enO[k] === 'object') {
      r.push(...check(enO[k], twO && twO[k], cnO && cnO[k], fp));
    }
  }
  return r;
}

const issues = check(en.articles, tw.articles, cn.articles, 'articles');
console.log(issues.length === 0 ? 'ALL TRANSLATED' : 'Remaining issues: ' + issues.length);
issues.slice(0, 30).forEach(x => console.log(' ' + x));
