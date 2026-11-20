from pathlib import Path
from PIL import Image
import numpy as np, math, shutil, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
root=Path('/tmp/gma-brand'); out=root/'gm-apprentice-brand'; out.mkdir(exist_ok=True)
for d in ['svg','png','favicon']: (out/d).mkdir(exist_ok=True)
im=Image.open('/Users/antonypegg/PROJECTS/gm-apprentice/generated_images/exec-a84096a9-9131-4bc4-a69c-fae99458741d.png').convert('RGBA')
a=np.array(im)[:,:,3]>160
# Trace boundary edges. Closed rings preserve transparent eye and nib cutouts.
edges={}
ys,xs=np.nonzero(a)
for y,x in zip(ys.tolist(),xs.tolist()):
 for ok,p,q in [(y==0 or not a[y-1,x],(x,y),(x+1,y)),(x==a.shape[1]-1 or not a[y,x+1],(x+1,y),(x+1,y+1)),(y==a.shape[0]-1 or not a[y+1,x],(x+1,y+1),(x,y+1)),(x==0 or not a[y,x-1],(x,y+1),(x,y))]:
  if ok: edges.setdefault(p,[]).append(q)
loops=[]
while edges:
 start=next(iter(edges)); p=start; ring=[]
 while True:
  ring.append(p); candidates=edges[p]; q=candidates.pop()
  if not candidates: del edges[p]
  p=q
  if p==start: break
  if p not in edges: break
 if len(ring)>80: loops.append(ring)
def area(p): return abs(sum(p[i][0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*p[i][1] for i in range(len(p)))/2)
loops=[p for p in loops if area(p)>120]
def rdp(p,eps):
 if len(p)<3:return p
 a=np.array(p[0],float); b=np.array(p[-1],float); v=b-a; pts=np.array(p,float)
 if np.dot(v,v)==0: dist=np.linalg.norm(pts-a,axis=1)
 else:
  t=np.clip(((pts-a)@v)/np.dot(v,v),0,1);dist=np.linalg.norm(pts-(a+t[:,None]*v),axis=1)
 i=int(np.argmax(dist))
 if dist[i]>eps:return rdp(p[:i+1],eps)[:-1]+rdp(p[i:],eps)
 return [p[0],p[-1]]
allpts=np.array(max(loops,key=area)); mn=allpts.min(axis=0); mx=allpts.max(axis=0); scale=880/max(mx-mn)
paths=[]
for ring in loops:
 i=max(range(len(ring)),key=lambda i:ring[i][0]);ring=ring[i:]+ring[:i]; mid=len(ring)//2
 pts=rdp(ring[:mid+1],1.4)[:-1]+rdp(ring[mid:]+[ring[0]],1.4)[:-1]
 pts=[((x-mn[0])*scale+60,(y-mn[1])*scale+60) for x,y in pts]
 paths.append('M'+' L'.join(f'{x:.2f},{y:.2f}' for x,y in pts)+' Z')
mark=' '.join(paths)
font=TTFont('/Users/antonypegg/PROJECTS/gm-apprentice-site/site/node_modules/@fontsource/alegreya/files/alegreya-latin-800-normal.woff')
glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); x=0; texts=[]
for c in 'GM-Apprentice':
 name=cmap[ord(c)]; pen=SVGPathPen(glyphs);glyphs[name].draw(pen)
 texts.append(f'<path transform="translate({x} 0)" d="{pen.getCommands()}"/>');x+=glyphs[name].width
text=''.join(texts); fscale=210/font['head'].unitsPerEm; tw=x*fscale
colors={'brass':'#e3b55b','green':'#12291f','parchment':'#efe9dc','black':'#000000','white':'#ffffff'}
def svg(w,h,content,title):return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{title}"><title>{title}</title>{content}</svg>'
def bird(color,trans=''):return f'<path fill="{color}" fill-rule="evenodd" transform="{trans}" d="{mark}"/>'
for name,c in colors.items():
 (out/'svg'/f'raven-{name}.svg').write_text(svg(1000,1000,bird(c),'GM-Apprentice raven and pen nib'))
for name,mc,tc,bg in [('dark',colors['brass'],colors['parchment'],None),('light',colors['green'],colors['green'],None),('black',colors['black'],colors['black'],None),('white',colors['white'],colors['white'],None)]:
 w=round(450+tw+80);content=bird(mc,'translate(0 0) scale(.42)')+f'<g fill="{tc}" transform="translate(450 255) scale({fscale} {-fscale})">{text}</g>'
 (out/'svg'/f'logo-horizontal-{name}.svg').write_text(svg(w,420,content,'GM-Apprentice'))
 w=1100; ts=960/x;content=bird(mc,'translate(200 0) scale(.7)')+f'<g fill="{tc}" transform="translate(70 850) scale({ts} {-ts})">{text}</g>'
 (out/'svg'/f'logo-stacked-{name}.svg').write_text(svg(w,920,content,'GM-Apprentice'))
favicon=svg(1000,1000,f'<rect width="1000" height="1000" rx="180" fill="{colors["green"]}"/>'+bird(colors['brass'],'translate(20 20) scale(.96)'),'GM-Apprentice')
(out/'favicon'/'favicon.svg').write_text(favicon)
(out/'favicon'/'site.webmanifest').write_text(json.dumps({'name':'GM-Apprentice','short_name':'GM-Apprentice','icons':[{'src':'/android-chrome-192x192.png','sizes':'192x192','type':'image/png'},{'src':'/android-chrome-512x512.png','sizes':'512x512','type':'image/png'}],'theme_color':'#12291f','background_color':'#12291f','display':'standalone'},indent=2))
shutil.copy('/Users/antonypegg/PROJECTS/gm-apprentice-site/site/node_modules/@fontsource/alegreya/LICENSE',out/'Alegreya-LICENSE.txt')
(out/'README.md').write_text('''# GM-Apprentice — The Scribe’s Familiar

Production assets traced from the selected raven artwork. All SVG artwork and lettering are vector paths, with no external fonts, embedded images, scripts, or linked dependencies.

## Files
- svg/raven-*.svg: standalone marks, transparent background.
- svg/logo-horizontal-*.svg: website/header wordmark.
- svg/logo-stacked-*.svg: centered logo.
- png/: transparent PNG counterparts.
- favicon/: SVG favicon, multi-resolution ICO, 16/32/48 px PNGs, Apple touch icon (180), Android icons (192/512), and web manifest.
- preview.png: light/dark applications and actual-size favicon checks.

Dark variants use brass artwork and parchment text for dark backgrounds. Light variants use deep green throughout. Black/white versions are single-colour. All logo SVGs and PNGs are transparent; favicon artwork has its own green ground.

## Palette
Brass #e3b55b · Green #12291f · Parchment #efe9dc.
Wordmark: Alegreya ExtraBold, converted to outlines. Font licence included.

## Use
Keep clear space around the raven; do not stretch. Prefer the horizontal logo at 240px wide or larger. Use the standalone raven for compact branding. At 16px the bird silhouette is the primary identifier; the nib detail is more legible at 32px and above.

Copy the contents of favicon/ into the website public directory and add these head links:

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

These assets are prepared for use; no website changes or deployment are included.
''')
print('Traced rings:',len(loops),'SVG path chars:',len(mark))
