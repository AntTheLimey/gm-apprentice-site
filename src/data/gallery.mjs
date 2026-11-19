// The gallery's entries. The gallery page shows them all; the front page's strip
// shows the campaigns (entries with `campaign: true`).
// Each entry: name, url, img (path under public/), alt, system (the short line under
// the name), blurb (what it shows off), optional note, optional link {label, url}.
export const gallery = [
  {
    name: 'Snowbound',
    url: 'https://snowbound-dnd.pages.dev',
    img: '/img/sb-home.jpg',
    alt: 'Snowbound campaign site front page: the latest session and the four player characters',
    system: 'D&D 5e 2024, made with the Midwife',
    blurb:
      'A test campaign grown from nothing with the Midwife: an escort job up a mountain pass to a monastery. Character sheets, painted maps, a timeline and a recap for every session.',
    campaign: true,
  },
  {
    name: 'Canticle of the End',
    url: 'https://canticle-of-the-end.pages.dev',
    img: '/img/cn-home.jpg',
    alt: 'Canticle of the End campaign site: a choir beneath a great bell, a city burning',
    system: 'Regency Call of Cthulhu',
    blurb:
      'Thirty sessions of persons of quality pursuing a dreadful music across the capitals of Europe, with the handouts as period props.',
    campaign: true,
  },
  {
    name: 'Dead End',
    url: 'https://dead-end.pages.dev',
    img: '/img/de-home.jpg',
    alt: 'Dead End campaign site: a rusted space station over a planet, green terminal lettering',
    system: 'Space-noir GURPS',
    blurb:
      'Four nobodies at the frayed edge of charted space stumble onto the biggest secret in human history. Full GURPS character sheets.',
    note: 'Another GM runs this one; Ant plays in it.',
    campaign: true,
  },
  {
    name: 'GURPS Special Forces',
    url: 'https://gurps-special-forces.pages.dev',
    img: '/img/sf-home.jpg',
    alt: 'GURPS Special Forces campaign site front page',
    system: 'Military GURPS',
    blurb:
      'A special operations team that ended up interviewing thirty alternate-reality versions of the same woman. Military GURPS, played straight until it wasn’t.',
    campaign: true,
  },
  {
    name: 'Drakkenheim',
    url: 'https://drakkenheim.dorkfish.quest/index.html',
    img: '/img/dk-home.jpg',
    alt: 'Drakkenheim campaign site: a carriage under a dead tree at dusk',
    system: 'D&D 5e',
    blurb:
      'Fifteen years after the Meteor, six strangers come up the road to Emberwood. Recaps written from recorded sessions.',
    note: 'Another GM’s campaign, on their own domain.',
    campaign: true,
  },
  {
    name: 'GM-Scriptorium',
    url: 'https://drnoisys-softworks.github.io/gm-scriptorium/',
    img: '/img/scr-home.jpg',
    alt: 'The Long Lease, GM-Scriptorium’s sample campaign site',
    system: 'A desktop app that publishes the same vaults',
    blurb:
      'A separate app that builds a campaign site from a GM-Apprentice vault. Its sample campaign: a queen who rented a valley from a dragon, three hundred years ago.',
    link: { label: 'GM-Scriptorium on GitHub', url: 'https://github.com/DrNoisys-Softworks/gm-scriptorium' },
    campaign: true,
  },
  {
    name: 'Theme showcase',
    url: 'https://antthelimey.github.io/gm-apprentice/',
    img: '/img/theme-home.jpg',
    alt: 'The same campaign site in five looks side by side: fantasy, horror, military, noir and sci-fi',
    system: 'Every ready-made look',
    blurb:
      'One test campaign built five times, once in each ready-made look: fantasy, horror, military, noir and sci-fi.',
    campaign: false,
  },
];
