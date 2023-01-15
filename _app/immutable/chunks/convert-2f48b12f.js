function s(t){let i="",e=0;return t.charAt(0)===" "&&(i=" ",e=1),i+t.charAt(e).toUpperCase()+t.slice(e+1)}function u(t,i){t=" "+t.replace(/\n/g,`
 `).trim();let e="";for(let n=0;n<t.length;){let a=!1;for(const[r,f]of i){if(!r||!f)continue;const l=r.length,c=t.substring(n,n+l),p=[[r,f],[s(r),s(f)],[r.toUpperCase(),f.toUpperCase()]];for(const[g,o]of p)if(c===g){a=!0,e+=o,n+=l,o&&o[o.length-1]===" "&&n--;break}if(a)break}a||(e+=t[n],n++)}return e.replace(/\n /g,`
`).trim()}export{u as c};
