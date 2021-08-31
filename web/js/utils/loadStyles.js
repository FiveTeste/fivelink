export function loadStyles() {
  let css = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const sheet = document.styleSheets.item(i);
      const rules = 'cssRules' in sheet ? sheet.cssRules : sheet.rules;

      for (let j = 0; j < rules.length; j++) {
        const rule = rules.item(j);
        if ('cssText' in rule) {
          css.push(rule.cssText);
        } else {
          css.push(rule.selectorText+' {\n'+rule.style.cssText+'\n}\n');
        }
     }
    } catch {}
  }

  return css.join('\n');
}