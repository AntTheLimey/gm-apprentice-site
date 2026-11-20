const sharp=require('/Users/antonypegg/PROJECTS/gm-apprentice-site/site/node_modules/sharp');
const fs=require('fs');const root='/tmp/gma-brand/gm-apprentice-brand';
(async()=>{
 for(const f of fs.readdirSync(root+'/svg')) await sharp(root+'/svg/'+f).resize({width:f.startsWith('raven')?1024:2000}).png().toFile(root+'/png/'+f.replace('.svg','.png'));
 for(const [n,s] of [['favicon-16x16',16],['favicon-32x32',32],['favicon-48x48',48],['apple-touch-icon',180],['android-chrome-192x192',192],['android-chrome-512x512',512]])await sharp(root+'/favicon/favicon.svg').resize(s,s).png().toFile(root+'/favicon/'+n+'.png');
 const panels=[];
 for(const [f,left,top,width] of [['logo-horizontal-dark.svg',40,40,1120],['logo-horizontal-light.svg',40,340,1120],['raven-brass.svg',40,630,240],['raven-green.svg',340,630,240],['logo-stacked-dark.svg',660,610,300]])panels.push({input:await sharp(root+'/svg/'+f).resize({width}).png().toBuffer(),left,top});
 panels.push({input:Buffer.from('<svg width="1200" height="1100"><rect width="1200" height="1100" fill="#12291f"/><rect y="300" width="1200" height="300" fill="#efe9dc"/><rect x="320" y="620" width="280" height="280" fill="#efe9dc"/></svg>'),left:0,top:0});
 const bg=panels.pop(); panels.unshift(bg);
 for(const [s,left] of [[16,70],[32,130],[48,220]])panels.push({input:await sharp(root+'/favicon/favicon.svg').resize(s,s).png().toBuffer(),left,top:980});
 await sharp({create:{width:1200,height:1100,channels:4,background:'#12291f'}}).composite(panels).png().toFile(root+'/preview.png');
 console.log('Rendered SVG and PNG assets.');
})();
