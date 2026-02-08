function renderExperience() {
    const container = document.querySelector('#experiencia .grid');
    if (!container) return;
    container.innerHTML = '';

    // Asumimos experienceData global
    if (typeof experienceData === 'undefined') return;

    experienceData.forEach(exp => {
        const article = document.createElement('article');
        article.className = 'card exp';

        const tasksHtml = exp.tasks.map(t => `<li data-i18n="${t}"></li>`).join('');

        article.innerHTML = `
      <header class="exp-head">
        <div class="exp-info">
            <h3>${exp.company}</h3>
            <p class="muted">${exp.location}</p>
            <p class="muted" data-i18n="${exp.dateKey}"></p>
        </div>
        <div class="exp-role">
          <span class="badge" data-i18n="${exp.roleKey}"></span>
          <a href="${exp.url}" target="_blank"><img src="${exp.logo}" alt="${exp.company}" class="exp-logo"></a>
        </div>
      </header>
      <ul class="tasks">
        ${tasksHtml}
      </ul>
    `;
        container.appendChild(article);
    });
}

function renderSkills() {
    const container = document.querySelector('#skills .skills-pills');
    if (!container) return;
    container.innerHTML = '';

    if (typeof skillsData === 'undefined') return;

    skillsData.forEach(sk => {
        const btn = document.createElement('button');
        btn.className = 'skill-pill';
        btn.setAttribute('aria-expanded', 'false');

        let titleHtml = '';
        if (sk.htmlTitle) {
            titleHtml = `<span class="pill-title" data-i18n="${sk.titleKey}">${sk.htmlTitle}</span>`;
        } else if (sk.isLiteral) {
            titleHtml = `<span class="pill-title">${sk.titleKey}</span>`;
        } else {
            titleHtml = `<span class="pill-title" data-i18n="${sk.titleKey}"></span>`;
        }

        const itemsHtml = sk.items.map(item =>
            `<img src="${item.img}" alt="${item.name}" loading="lazy" title="${item.name}">`
        ).join('');

        btn.innerHTML = `
      <div class="pill-left">
        <img src="${sk.icon}" alt="" aria-hidden="true">
        ${titleHtml}
      </div>
      <div class="pill-body">
        ${itemsHtml}
      </div>
    `;
        container.appendChild(btn);
    });
}

function renderProjects() {
    const container = document.querySelector('#proyectos .grid');
    if (!container) return;
    container.innerHTML = '';

    if (typeof projectsData === 'undefined') return;

    projectsData.forEach(proj => {
        const article = document.createElement('article');
        article.className = 'card project';

        const stackHtml = proj.stack.map(tech =>
            `<li><img src="${tech.img}" alt="${tech.name}" title="${tech.name}"></li>`
        ).join('');

        let buttonsHtml = '';
        proj.buttons.forEach(btn => {
            if (btn.type === 'btn') {
                buttonsHtml += `<a class="btn" href="${btn.url}" target="_blank" rel="noopener">GitHub</a>`;
            } else if (btn.type === 'made-in') {
                buttonsHtml += `
              <a class="ghost made-in" href="${btn.url}" target="_blank" rel="noopener">
                <span>${btn.text}</span>
                <img src="${btn.img}" alt="Institut Sa Palomera">
              </a>`;
            }
        });

        article.innerHTML = `
      <img class="proj-img" src="${proj.img}" alt="Captura de ${proj.title}">
      <div class="project-body">
      <ul class="logo-row">
        ${stackHtml}
      </ul>
        <h3>${proj.title}</h3>
        <p data-i18n="${proj.descKey}"></p>
        <div class="row">
          ${buttonsHtml}
        </div>
      </div>
    `;
        container.appendChild(article);
    });
}

function renderAll() {
    renderExperience();
    renderSkills();
    renderProjects();
}
