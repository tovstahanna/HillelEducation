const utils={renderTemplate(e,t){let s=e;return t&&Object.keys(t).forEach(e=>{s=s.replaceAll(`{{${e}}}`,t[e])}),s},validation(e,t){var s=[];return t&&""!=t&&t.length<6&&s.push("Password is less then 6 symbols"),/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)||s.push("Email has incorrect format"),s}};export default utils;