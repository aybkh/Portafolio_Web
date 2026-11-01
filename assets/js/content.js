/* Contenido del portafolio: estructura + textos.
   Los textos largos heredados (experiencia y detalles de proyectos) están en i18n-base.js */

window.LANGS = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ca', label: 'Català', short: 'CA' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' }
];

/* Logos (assets/logos). Todas las tecnologías, empresas y herramientas llevan su logo real */
window.LOGOS = {
  access: 'access.webp', actions: 'actions.svg', ansible: 'ansible.svg', apple: 'apple.svg', aws: 'aws.svg', azure: 'azure.svg',
  bash: 'bash.svg', cisco: 'cisco.webp', claude: 'claude.svg', clickup: 'clickup.webp', cloudflare: 'cloudflare.svg',
  copilot: 'copilot.svg', csharp: 'csharp.svg', dhcp: 'dhcp.webp', diag: 'diag.webp', dns: 'dns.webp', docker: 'docker.svg',
  dotnet: 'dotnet.svg', ef: 'entityframework.webp', escpos: 'escpos.webp', excel: 'excel.webp', fastapi: 'fastapi.svg',
  gemini: 'gemini.svg', git: 'git.svg', github: 'github.svg', honeywell: 'honeywell.webp', html: 'html.svg', igel: 'igel.webp',
  jira: 'jira.svg', json: 'json.svg', linux: 'linux.webp', m365: 'm365.webp', macos: 'macos.webp', mdm: 'mdm.webp',
  mysql: 'mysql.svg', n8n: 'n8n.svg', next: 'next.svg', nmap: 'nmap.webp', node: 'node.svg', notion: 'notion.svg',
  ollama: 'ollama.svg', openai: 'openai.svg', oracle: 'oracle.svg', parallels: 'parallels.webp', pfsense: 'pfsense.svg',
  postgresql: 'postgresql.svg', powershell: 'powershell.svg', project: 'project.webp', pwa: 'pwa.svg', python: 'python.svg',
  raspberry: 'raspberry.svg', react: 'react.svg', redis: 'redis.svg', rfid: 'rfid.webp', sharepoint: 'sharepoint.webp',
  sql: 'sql.webp', sqlite: 'sqlite.svg', sqlserver: 'sqlserver.svg', ssh: 'ssh.webp', supabase: 'supabase.svg',
  tailwind: 'tailwind.svg', teams: 'teams.webp', telegram: 'telegram.svg', terraform: 'terraform.svg', ts: 'ts.svg',
  unity: 'unity.svg', virtualbox: 'virtualbox.webp', visualstudio: 'visualstudio.webp', vite: 'vite.svg', vlan: 'vlan.webp',
  vmware: 'vmware.webp', voip: 'voip.webp', windows: 'windows.svg', wireshark: 'wireshark.webp', zebra: 'zebra.webp',
  hipra: 'hipra.svg', malgrat: 'malgrat.svg', myhomemarket: 'myhomemarket.webp', resend: 'resend.svg', codex: 'codex.svg', linkedin: 'linkedin.svg', whatsapp: 'whatsapp.svg', gmail: 'gmail.svg'
};

/* Nombre visible de la tecnología -> logo */
window.TECH = {
  'Next.js': 'next', 'TypeScript': 'ts', 'React': 'react', 'Vite': 'vite', 'Tailwind CSS': 'tailwind',
  'PostgreSQL': 'postgresql', 'Supabase': 'supabase', 'Cloudflare': 'cloudflare', 'GitHub': 'github',
  '.NET': 'dotnet', 'SQLite': 'sqlite', 'Entity Framework': 'ef', 'ESC/POS': 'escpos',
  'Linux': 'linux', 'Python': 'python', 'SQL': 'sql', 'Bash': 'bash', 'Git': 'git', 'Telegram Bot': 'telegram',
  'Unity': 'unity', 'C#': 'csharp', 'Visual Studio': 'visualstudio', 'PWA': 'pwa', 'Claude Code': 'claude', 'Codex': 'codex', 'Resend': 'resend', 'Node.js': 'node'
};

/* scene: web = portátil + móvil · tpv = terminal TPV + portátil + móvil · laptop = solo portátil */
window.PROJECTS = [
  { id: 'quicondueix', key: 'qc', scene: 'web', isNew: true, color: '#f5b800', ink: '#16161a', url: 'https://quicondueix.cat',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Resend', 'Cloudflare', 'PWA', 'Claude Code', 'Codex'] },
  { id: 'r7sultan', key: 'p10', scene: 'web', title: 'R7Sultan', color: '#c9a24a', url: 'https://r7barbershop.com',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Resend', 'Telegram Bot', 'Cloudflare', 'Claude Code', 'Codex', 'GitHub'] },
  { id: 'getvtc', key: 'p8', scene: 'web', title: 'GetVTC', color: '#2f7cf6', url: 'https://getvtcbarcelona.com',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Resend', 'Cloudflare', 'Claude Code', 'Codex', 'GitHub'] },
  { id: 'kebab', key: 'p7', scene: 'tpv', title: 'The Kebab Lab', color: '#e2602a', url: 'https://thekebablab.es',
    stack: ['.NET', 'React', 'SQLite', 'Entity Framework', 'Tailwind CSS', 'ESC/POS', 'GitHub'] },
  { id: 'snack', key: 'p5', scene: 'tpv', title: 'Snack Tanger 303', color: '#3f9b4c', url: 'https://snacktanger303.com/',
    stack: ['.NET', 'React', 'SQLite', 'Entity Framework', 'Tailwind CSS', 'ESC/POS', 'Python', 'GitHub'] },
  { id: 'amigos2', key: 'p11', scene: 'web', title: 'Amigos2', color: '#2fae6a', url: 'https://amigos2.es',
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Cloudflare', 'GitHub'] },
  { id: 'foodpix', key: 'p9', scene: 'web', title: 'FoodPix', color: '#f06a1d', url: 'https://foodpix.es',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare', 'GitHub'] },
  { id: 'hotel', key: 'p2', scene: 'laptop', title: 'Hotel Management System', color: '#c99b55', edu: true, repo: 'https://github.com/aybkh/HaramResorts',
    stack: ['Python', 'PostgreSQL', 'SQL', 'Linux', 'Bash', 'Git', 'GitHub'] },
  { id: 'eray', key: 'p3', scene: 'laptop', title: 'ERAY Slasher', color: '#8b55e0', edu: true, repo: 'https://github.com/aybkh/ErAySlasher',
    stack: ['Unity', 'C#', '.NET', 'Visual Studio', 'Git', 'GitHub'] }
];

/* Descripción corta (tarjeta) y subtítulo de cada proyecto, en los 5 idiomas */
window.SHORT = {
  qc: {
    es: ['Turnos de coche compartido', 'Web-app para compañeros que comparten coche: cada uno marca qué días va y la app decide quién conduce con un saldo justo.'],
    ca: ['Torns de cotxe compartit', 'Web-app per a companys que comparteixen cotxe: cadascú marca quins dies hi va i l’app decideix qui condueix amb un saldo just.'],
    en: ['Carpool turns', 'Web app for coworkers who share a car: everyone marks their days and the app picks who drives with a fair balance.'],
    fr: ['Tours de covoiturage', 'Web-app pour collègues qui covoiturent : chacun indique ses jours et l’app désigne le conducteur avec un solde équitable.'],
    de: ['Fahrgemeinschaft', 'Web-App für Kollegen mit Fahrgemeinschaft: Jeder markiert seine Tage, die App bestimmt fair, wer fährt.']
  },
  p10: {
    es: ['Reservas y TPV para barbería', 'Reservas online en tiempo real sin solapamientos, avisos al barbero por Telegram y TPV integrado.'],
    ca: ['Reserves i TPV per a barberia', 'Reserves en línia en temps real sense solapaments, avisos al barber per Telegram i TPV integrat.'],
    en: ['Barbershop booking & POS', 'Real-time online booking with no double bookings, Telegram alerts for the barber and a built-in POS.'],
    fr: ['Réservations et caisse pour barbier', 'Réservation en ligne en temps réel sans doublons, alertes Telegram et caisse intégrée.'],
    de: ['Buchung & Kasse für Barbershop', 'Echtzeit-Buchungen ohne Doppelbelegung, Telegram-Benachrichtigungen und integrierte Kasse.']
  },
  p8: {
    es: ['Marketplace de licencias VTC', 'Web para comprar, vender y solicitar licencias VTC en España, con blog y panel de administración.'],
    ca: ['Marketplace de llicències VTC', 'Web per comprar, vendre i sol·licitar llicències VTC a Espanya, amb blog i panell d’administració.'],
    en: ['VTC licence marketplace', 'Website to buy, sell and request VTC licences in Spain, with a blog and an admin panel.'],
    fr: ['Marketplace de licences VTC', 'Site pour acheter, vendre et demander des licences VTC en Espagne, avec blog et back-office.'],
    de: ['Marktplatz für VTC-Lizenzen', 'Website zum Kaufen, Verkaufen und Beantragen von VTC-Lizenzen in Spanien, mit Blog und Admin-Panel.']
  },
  p7: {
    es: ['TPV, cocina y carta digital', 'TPV táctil, pantalla de cocina y kiosco para el restaurante, más su web con la carta siempre actualizada.'],
    ca: ['TPV, cuina i carta digital', 'TPV tàctil, pantalla de cuina i quiosc per al restaurant, i la seva web amb la carta sempre al dia.'],
    en: ['POS, kitchen & digital menu', 'Touch POS, kitchen display and kiosk for the restaurant, plus its website with an always up-to-date menu.'],
    fr: ['Caisse, cuisine et carte digitale', 'Caisse tactile, écran cuisine et borne pour le restaurant, et son site avec la carte toujours à jour.'],
    de: ['Kasse, Küche & digitale Karte', 'Touch-Kasse, Küchendisplay und Kiosk für das Restaurant, dazu die Website mit aktueller Speisekarte.']
  },
  p5: {
    es: ['TPV, cocina y carta digital', 'Sistema local para el restaurante (comandas, cocina, caja) que publica la carta en la web con un solo botón.'],
    ca: ['TPV, cuina i carta digital', 'Sistema local per al restaurant (comandes, cuina, caixa) que publica la carta a la web amb un sol botó.'],
    en: ['POS, kitchen & digital menu', 'On-site system for the restaurant (orders, kitchen, till) that publishes the menu online with one button.'],
    fr: ['Caisse, cuisine et carte digitale', 'Système local du restaurant (commandes, cuisine, caisse) qui publie la carte en ligne en un clic.'],
    de: ['Kasse, Küche & digitale Karte', 'Lokales System für das Restaurant (Bestellungen, Küche, Kasse), das die Karte per Klick online stellt.']
  },
  p11: {
    es: ['Web y panel del restaurante', 'Web pública y panel para que el propietario cambie carta, precios, promociones y fotos sin ayuda.'],
    ca: ['Web i panell del restaurant', 'Web pública i panell perquè el propietari canviï carta, preus, promocions i fotos sense ajuda.'],
    en: ['Restaurant website & admin', 'Public website and a panel so the owner can update menu, prices, promotions and photos on his own.'],
    fr: ['Site et back-office du restaurant', 'Site public et back-office pour modifier carte, prix, promotions et photos en toute autonomie.'],
    de: ['Restaurant-Website & Admin', 'Öffentliche Website und Panel, damit der Inhaber Karte, Preise, Aktionen und Fotos selbst pflegt.']
  },
  p9: {
    es: ['Banco de imágenes de comida', 'Más de 300 fotos de comida generadas con IA para cartas digitales y TPV, servidas en WebP y a coste cero.'],
    ca: ['Banc d’imatges de menjar', 'Més de 300 fotos de menjar generades amb IA per a cartes digitals i TPV, servides en WebP i a cost zero.'],
    en: ['Food image library', '300+ AI-generated food photos for digital menus and POS systems, served as WebP at zero cost.'],
    fr: ['Banque d’images culinaires', 'Plus de 300 photos de plats générées par IA pour cartes digitales et caisses, en WebP et à coût zéro.'],
    de: ['Food-Bilddatenbank', 'Über 300 KI-generierte Food-Fotos für digitale Karten und Kassen, als WebP und kostenlos gehostet.']
  },
  p2: {
    es: ['Gestión hotelera', 'Aplicación con Python y PostgreSQL para reservas, huéspedes y personal, con réplicas y copias automáticas.'],
    ca: ['Gestió hotelera', 'Aplicació amb Python i PostgreSQL per a reserves, hostes i personal, amb rèpliques i còpies automàtiques.'],
    en: ['Hotel management', 'Python and PostgreSQL app for bookings, guests and staff, with replication and automatic backups.'],
    fr: ['Gestion hôtelière', 'Application Python et PostgreSQL pour réservations, clients et personnel, avec réplication et sauvegardes.'],
    de: ['Hotelverwaltung', 'Python- und PostgreSQL-App für Buchungen, Gäste und Personal, mit Replikation und automatischen Backups.']
  },
  p3: {
    es: ['Videojuego roguelite 2D', 'Juego de acción en Unity con oleadas de enemigos, mejoras del personaje y arte original.'],
    ca: ['Videojoc roguelite 2D', 'Joc d’acció a Unity amb onades d’enemics, millores del personatge i art original.'],
    en: ['2D roguelite game', 'Action game in Unity with enemy waves, character upgrades and original artwork.'],
    fr: ['Jeu roguelite 2D', 'Jeu d’action sous Unity avec vagues d’ennemis, améliorations du personnage et graphismes originaux.'],
    de: ['2D-Roguelite-Spiel', 'Actionspiel in Unity mit Gegnerwellen, Charakter-Upgrades und eigener Grafik.']
  }
};

/* QuiCondueix: detalles largos */
window.QC = {
  es: {
    long: 'Sustituye al típico Excel de «¿a quién le toca conducir?». Multigrupo, en catalán y castellano, con modo oscuro y pensada primero para el móvil. Funciona a coste cero sobre planes gratuitos.',
    features: [
      'Sugerencia de conductor: algoritmo de saldo justo por día en coche, con 2º coche si no cabéis.',
      'Semana y calendario: Hi vaig / No / Vacaciones / Teletrabajo y festivos de Catalunya.',
      'Impacto ambiental: km, litros y CO₂ evitados con datos oficiales (IDAE, MITECO, OCCC).',
      'Seguridad: Supabase Auth con código por email y RLS en todas las tablas; importación del historial desde Excel.'
    ]
  },
  ca: {
    long: 'Substitueix el típic Excel de «a qui li toca conduir?». Multigrup, en català i castellà, amb mode fosc i pensada primer per al mòbil. Funciona a cost zero amb plans gratuïts.',
    features: [
      'Suggeriment de conductor: algorisme de saldo just per dia en cotxe, amb 2n cotxe si no hi cabeu.',
      'Setmana i calendari: Hi vaig / No / Vacances / Teletreball i festius de Catalunya.',
      'Impacte ambiental: km, litres i CO₂ evitats amb dades oficials (IDAE, MITECO, OCCC).',
      'Seguretat: Supabase Auth amb codi per email i RLS a totes les taules; importació de l’historial des d’Excel.'
    ]
  },
  en: {
    long: 'It replaces the classic “whose turn is it to drive?” spreadsheet. Multi-group, in Catalan and Spanish, with dark mode and built mobile-first. Runs at zero cost on free tiers.',
    features: [
      'Driver suggestion: fair per-day balance algorithm, with a 2nd car when you don’t all fit.',
      'Week & calendar: going / not going / holidays / remote work, plus Catalan public holidays.',
      'Environmental impact: km, litres and CO₂ avoided using official data (IDAE, MITECO, OCCC).',
      'Security: Supabase Auth with email codes and RLS on every table; history import from Excel.'
    ]
  },
  fr: {
    long: 'Elle remplace le fameux Excel « à qui le tour de conduire ? ». Multi-groupes, en catalan et espagnol, mode sombre, pensée d’abord pour le mobile. Coût zéro grâce aux offres gratuites.',
    features: [
      'Suggestion du conducteur : algorithme de solde équitable par jour, avec 2e voiture si besoin.',
      'Semaine et calendrier : présent / absent / vacances / télétravail et jours fériés.',
      'Impact environnemental : km, litres et CO₂ évités avec des données officielles.',
      'Sécurité : Supabase Auth (code par email) et RLS sur toutes les tables ; import d’historique Excel.'
    ]
  },
  de: {
    long: 'Ersetzt die klassische „Wer fährt heute?“-Tabelle. Mehrere Gruppen, auf Katalanisch und Spanisch, mit Dark Mode und Mobile-First. Läuft kostenlos auf Free-Tiers.',
    features: [
      'Fahrervorschlag: fairer Saldo pro Fahrtag, mit zweitem Auto, wenn nicht alle hineinpassen.',
      'Woche & Kalender: dabei / nicht dabei / Urlaub / Homeoffice und Feiertage.',
      'Umweltwirkung: vermiedene km, Liter und CO₂ mit offiziellen Daten.',
      'Sicherheit: Supabase Auth mit E-Mail-Code und RLS auf allen Tabellen; Excel-Import.'
    ]
  }
};

window.EXPERIENCE = [
  { n: 'e1', company: 'Laboratorios HIPRA', logo: 'hipra', wide: true, place: 'Amer / Aiguaviva, Girona', url: 'https://www.hipra.com/', current: true, tasks: 6,
    tags: ['SAP ERP', 'IT Procurement', 'Industrial IT', 'Apple & Dell', 'Cisco Room Bar', 'MS Teams', 'Cybersecurity'] },
  { n: 'e2', company: 'Laboratorios HIPRA', logo: 'hipra', wide: true, place: 'Amer / Aiguaviva, Girona', url: 'https://www.hipra.com/', tasks: 4,
    tags: ['L2 Support', 'Microsoft 365', 'Remedy / SmartIT', 'IGEL Thin Clients', 'Zebra RFID', 'Honeywell', 'iOS / Android'] },
  { n: 'e4', company: 'Ajuntament de Malgrat de Mar', logo: 'malgrat', place: 'Malgrat de Mar, Barcelona', url: 'https://www.ajmalgrat.cat/', tasks: 4,
    tags: ['Linux', 'Hardware', 'Remote Support', 'Active Directory', 'Documentation'] },
  { n: 'e3', company: 'My Home Market', logo: 'myhomemarket', place: 'Pineda de Mar, Barcelona', tasks: 2,
    tags: ['Customer Relations', 'Stock Management', 'POS', 'Problem Solving'] }
];

/* [nombre, logo] */
window.SKILLS = {
  net: [['DNS', 'dns'], ['DHCP', 'dhcp'], ['pfSense', 'pfsense'], ['Cisco', 'cisco'], ['VoIP', 'voip'], ['VLANs / Subnetting', 'vlan'], ['Wireshark', 'wireshark'], ['Nmap', 'nmap'], ['SSH / SFTP', 'ssh']],
  sys: [['Linux', 'linux'], ['Windows Server / AD', 'windows'], ['Microsoft 365', 'm365'], ['macOS', 'macos'], ['Parallels', 'parallels'], ['MDM', 'mdm'], ['Bash', 'bash'], ['PowerShell', 'powershell']],
  cloud: [['Azure', 'azure'], ['AWS', 'aws'], ['Docker', 'docker'], ['Terraform', 'terraform'], ['Ansible', 'ansible'], ['Cloudflare', 'cloudflare'], ['GitHub Actions', 'actions']],
  dev: [['Next.js', 'next'], ['TypeScript', 'ts'], ['React', 'react'], ['Tailwind CSS', 'tailwind'], ['Python / FastAPI', 'python'], ['.NET / C#', 'dotnet'], ['HTML & CSS', 'html'], ['Git / GitHub', 'github'], ['Unity', 'unity']],
  db: [['PostgreSQL', 'postgresql'], ['Supabase', 'supabase'], ['MySQL', 'mysql'], ['SQL Server', 'sqlserver'], ['SQLite', 'sqlite'], ['Oracle', 'oracle'], ['Redis', 'redis'], ['MS Access', 'access'], ['JSON / APIs', 'json']],
  hw: [['Zebra', 'zebra'], ['RFID', 'rfid'], ['Honeywell', 'honeywell'], ['IGEL Thin Clients', 'igel'], ['Impresoras ESC/POS', 'escpos'], ['VMware', 'vmware'], ['VirtualBox', 'virtualbox'], ['Raspberry Pi', 'raspberry'], ['Diagnóstico HW', 'diag']],
  ia: [['Claude / Claude Code', 'claude'], ['OpenAI / GPT', 'openai'], ['GitHub Copilot', 'copilot'], ['Gemini', 'gemini'], ['Ollama', 'ollama'], ['n8n', 'n8n']],
  prod: [['Microsoft 365', 'm365'], ['Teams', 'teams'], ['Excel', 'excel'], ['MS Project', 'project'], ['SharePoint', 'sharepoint'], ['Jira', 'jira'], ['ClickUp', 'clickup'], ['Notion', 'notion']]
};

window.SPOKEN = [
  ['ar', 'العربية', 'native'], ['es', 'Español', 'adv'], ['ca', 'Català', 'adv'],
  ['en', 'English', 'prof'], ['fr', 'Français', 'basic']
];

/* Logos del mosaico «stack» del bento */
/* Con lo que construye sus proyectos: primero la IA */
window.STACK_TILE = ['claude', 'codex', 'supabase', 'next', 'react', 'ts', 'cloudflare', 'resend', 'tailwind', 'postgresql', 'github', 'n8n'];

window.CONTACT = {
  email: 'ayoubjerari47@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayoub-jerari/',
  github: 'https://github.com/aybkh',
  whatsapp: 'https://wa.me/34631714568'
};

/* Textos de interfaz */
window.UI = {
  es: {
    nav: { projects: 'Proyectos', experience: 'Experiencia', skills: 'Habilidades', contact: 'Contacto' },
    hello: 'Hola, soy',
    lead: 'Técnico IT en HIPRA. Además diseño y programo webs, TPV y apps que negocios reales usan cada día.',
    cta_projects: 'Ver proyectos', cta_cv: 'Descargar CV',
    now: 'Ahora', now_role: 'IT Workplace Technician', since: 'desde mayo 2026',
    latest: 'Lo último', qc_tile: 'Compartir coche, más organizado que nunca.', open_project: 'Ver proyecto',
    live: 'webs y apps en producción', langs: 'idiomas', stack: 'Con lo que construyo', based: 'Girona · Barcelona',
    proj_kicker: 'Proyectos', proj_title: 'Hecho y en producción.', proj_intro: 'Cada proyecto lo usa un negocio o un grupo de personas de verdad.',
    new: 'Nuevo', academic: 'Académico', visit: 'Ver web', code: 'Ver código', details: 'Ver más detalles', close: 'Cerrar',
    features: 'Qué hace', stack_t: 'Tecnologías', screens: 'Capturas', made_in: 'Proyecto académico · Institut Sa Palomera',
    exp_kicker: 'Experiencia', exp_title: 'Soporte IT donde importa.', exp_intro: 'Entornos industriales, administración pública y atención al cliente.', current: 'Actualidad', more: 'Ver más', less: 'Ver menos',
    sk_kicker: 'Habilidades', sk_title: 'De la red al código.', sk_intro: 'Herramientas que uso en el día a día.',
    lv: { native: 'Nativo', adv: 'Avanzado', prof: 'Profesional', basic: 'Básico' },
    contact_title: '¿Hablamos?', contact_text: 'Si tienes un proyecto, una vacante o una idea, escríbeme y te respondo en menos de 24 h.',
    copy: 'Copiar email', copied: 'Email copiado',
    footer: 'Diseñado y programado a mano con HTML, CSS y JavaScript.', legacy: 'Versión anterior',
    theme: 'Cambiar tema', menu: 'Menú', lang: 'Idioma', top: 'Volver arriba'
  },
  ca: {
    nav: { projects: 'Projectes', experience: 'Experiència', skills: 'Habilitats', contact: 'Contacte' },
    hello: 'Hola, sóc',
    lead: 'Tècnic IT a HIPRA. A més dissenyo i programo webs, TPV i apps que negocis reals fan servir cada dia.',
    cta_projects: 'Veure projectes', cta_cv: 'Descarregar CV',
    now: 'Ara', now_role: 'IT Workplace Technician', since: 'des de maig 2026',
    latest: 'El darrer', qc_tile: 'Compartir cotxe, més organitzat que mai.', open_project: 'Veure projecte',
    live: 'webs i apps en producció', langs: 'idiomes', stack: 'Amb el que construeixo', based: 'Girona · Barcelona',
    proj_kicker: 'Projectes', proj_title: 'Fet i en producció.', proj_intro: 'Cada projecte el fa servir un negoci o un grup de persones de debò.',
    new: 'Nou', academic: 'Acadèmic', visit: 'Veure web', code: 'Veure codi', details: 'Veure més detalls', close: 'Tancar',
    features: 'Què fa', stack_t: 'Tecnologies', screens: 'Captures', made_in: 'Projecte acadèmic · Institut Sa Palomera',
    exp_kicker: 'Experiència', exp_title: 'Suport IT on importa.', exp_intro: 'Entorns industrials, administració pública i atenció al client.', current: 'Actualitat', more: 'Veure més', less: 'Veure menys',
    sk_kicker: 'Habilitats', sk_title: 'De la xarxa al codi.', sk_intro: 'Eines que faig servir cada dia.',
    lv: { native: 'Natiu', adv: 'Avançat', prof: 'Professional', basic: 'Bàsic' },
    contact_title: 'En parlem?', contact_text: 'Si tens un projecte, una vacant o una idea, escriu-me i et responc en menys de 24 h.',
    copy: 'Copiar email', copied: 'Email copiat',
    footer: 'Dissenyat i programat a mà amb HTML, CSS i JavaScript.', legacy: 'Versió anterior',
    theme: 'Canviar tema', menu: 'Menú', lang: 'Idioma', top: 'Tornar a dalt'
  },
  en: {
    nav: { projects: 'Projects', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
    hello: "Hi, I'm",
    lead: 'IT technician at HIPRA. I also design and build websites, POS systems and apps that real businesses use every day.',
    cta_projects: 'View projects', cta_cv: 'Download CV',
    now: 'Now', now_role: 'IT Workplace Technician', since: 'since May 2026',
    latest: 'Latest', qc_tile: 'Car sharing, more organised than ever.', open_project: 'View project',
    live: 'live websites & apps', langs: 'languages', stack: 'What I build with', based: 'Girona · Barcelona',
    proj_kicker: 'Projects', proj_title: 'Built and live.', proj_intro: 'Every project is used by a real business or group of people.',
    new: 'New', academic: 'Academic', visit: 'Visit site', code: 'View code', details: 'See more details', close: 'Close',
    features: 'What it does', stack_t: 'Tech stack', screens: 'Screenshots', made_in: 'Academic project · Institut Sa Palomera',
    exp_kicker: 'Experience', exp_title: 'IT support where it matters.', exp_intro: 'Industrial sites, public administration and customer service.', current: 'Present', more: 'Show more', less: 'Show less',
    sk_kicker: 'Skills', sk_title: 'From the network to the code.', sk_intro: 'Tools I use every day.',
    lv: { native: 'Native', adv: 'Advanced', prof: 'Professional', basic: 'Basic' },
    contact_title: "Let's talk", contact_text: 'Got a project, an opening or an idea? Write to me and I’ll reply within 24 h.',
    copy: 'Copy email', copied: 'Email copied',
    footer: 'Designed and hand-coded with HTML, CSS and JavaScript.', legacy: 'Previous version',
    theme: 'Toggle theme', menu: 'Menu', lang: 'Language', top: 'Back to top'
  },
  fr: {
    nav: { projects: 'Projets', experience: 'Expérience', skills: 'Compétences', contact: 'Contact' },
    hello: 'Bonjour, je suis',
    lead: 'Technicien IT chez HIPRA. Je conçois et développe aussi des sites, caisses et apps utilisés chaque jour par de vrais commerces.',
    cta_projects: 'Voir les projets', cta_cv: 'Télécharger le CV',
    now: 'Actuellement', now_role: 'IT Workplace Technician', since: 'depuis mai 2026',
    latest: 'Nouveau', qc_tile: 'Le covoiturage, mieux organisé que jamais.', open_project: 'Voir le projet',
    live: 'sites et apps en ligne', langs: 'langues', stack: 'Mes outils pour créer', based: 'Gérone · Barcelone',
    proj_kicker: 'Projets', proj_title: 'Conçus et en ligne.', proj_intro: 'Chaque projet est utilisé par une vraie entreprise ou un vrai groupe.',
    new: 'Nouveau', academic: 'Académique', visit: 'Voir le site', code: 'Voir le code', details: 'Voir plus de détails', close: 'Fermer',
    features: 'Fonctionnalités', stack_t: 'Technologies', screens: 'Captures', made_in: 'Projet académique · Institut Sa Palomera',
    exp_kicker: 'Expérience', exp_title: 'Le support IT là où il compte.', exp_intro: 'Industrie, administration publique et service client.', current: 'Aujourd’hui', more: 'Voir plus', less: 'Voir moins',
    sk_kicker: 'Compétences', sk_title: 'Du réseau au code.', sk_intro: 'Les outils que j’utilise au quotidien.',
    lv: { native: 'Natif', adv: 'Avancé', prof: 'Professionnel', basic: 'Notions' },
    contact_title: 'On en parle ?', contact_text: 'Un projet, un poste ou une idée ? Écrivez-moi, je réponds en moins de 24 h.',
    copy: 'Copier l’email', copied: 'Email copié',
    footer: 'Conçu et codé à la main en HTML, CSS et JavaScript.', legacy: 'Ancienne version',
    theme: 'Changer de thème', menu: 'Menu', lang: 'Langue', top: 'Haut de page'
  },
  de: {
    nav: { projects: 'Projekte', experience: 'Erfahrung', skills: 'Fähigkeiten', contact: 'Kontakt' },
    hello: 'Hallo, ich bin',
    lead: 'IT-Techniker bei HIPRA. Außerdem entwerfe und programmiere ich Websites, Kassensysteme und Apps für echte Unternehmen.',
    cta_projects: 'Projekte ansehen', cta_cv: 'Lebenslauf',
    now: 'Aktuell', now_role: 'IT Workplace Technician', since: 'seit Mai 2026',
    latest: 'Neu', qc_tile: 'Fahrgemeinschaft, besser organisiert als je zuvor.', open_project: 'Projekt ansehen',
    live: 'Websites & Apps live', langs: 'Sprachen', stack: 'Damit baue ich', based: 'Girona · Barcelona',
    proj_kicker: 'Projekte', proj_title: 'Gebaut und live.', proj_intro: 'Jedes Projekt wird von echten Unternehmen oder Gruppen genutzt.',
    new: 'Neu', academic: 'Ausbildung', visit: 'Website', code: 'Code ansehen', details: 'Mehr Details', close: 'Schließen',
    features: 'Funktionen', stack_t: 'Technologien', screens: 'Screenshots', made_in: 'Ausbildungsprojekt · Institut Sa Palomera',
    exp_kicker: 'Erfahrung', exp_title: 'IT-Support, wo er zählt.', exp_intro: 'Industrie, öffentliche Verwaltung und Kundenservice.', current: 'Heute', more: 'Mehr', less: 'Weniger',
    sk_kicker: 'Fähigkeiten', sk_title: 'Vom Netzwerk bis zum Code.', sk_intro: 'Werkzeuge, die ich täglich nutze.',
    lv: { native: 'Muttersprache', adv: 'Fortgeschritten', prof: 'Verhandlungssicher', basic: 'Grundkenntnisse' },
    contact_title: 'Sprechen wir?', contact_text: 'Projekt, offene Stelle oder Idee? Schreib mir – ich antworte innerhalb von 24 h.',
    copy: 'E-Mail kopieren', copied: 'E-Mail kopiert',
    footer: 'Von Hand gestaltet und programmiert mit HTML, CSS und JavaScript.', legacy: 'Vorherige Version',
    theme: 'Design wechseln', menu: 'Menü', lang: 'Sprache', top: 'Nach oben'
  }
};

/* Tareas añadidas al Ajuntament (del CV) */
(function () {
  var extra = {
    es: ['Incidencias L1: Registro, seguimiento y resolución de incidencias de primer nivel.', 'Nuevas incorporaciones: Preparación y despliegue de equipos para el personal que se incorpora.'],
    ca: ['Incidències L1: Registre, seguiment i resolució d’incidències de primer nivell.', 'Noves incorporacions: Preparació i desplegament d’equips per al personal que s’incorpora.'],
    en: ['L1 ticketing: Logging, tracking and resolving first-level incidents.', 'Onboarding: Preparing and deploying computers for new staff.'],
    fr: ['Incidents N1 : Enregistrement, suivi et résolution des incidents de premier niveau.', 'Nouveaux arrivants : Préparation et déploiement des postes pour le personnel entrant.'],
    de: ['L1-Tickets: Erfassung, Nachverfolgung und Lösung von First-Level-Störungen.', 'Onboarding: Vorbereitung und Bereitstellung von Geräten für neue Mitarbeitende.']
  };
  Object.keys(extra).forEach(function (l) {
    if (!window.I18N_BASE[l]) return;
    window.I18N_BASE[l].exp.e4_t3 = extra[l][0];
    window.I18N_BASE[l].exp.e4_t4 = extra[l][1];
  });
})();
