const experienceData = [
    {
        id: "hipra",
        company: "Laboratorios HIPRA, S.A.",
        location: "Amer / Aiguaviva, Girona",
        dateKey: "exp.e1_place",
        roleKey: "exp.e1_role",
        logo: "img/logos/hipra.webp",
        url: "https://www.hipra.com/",
        tasks: [
            "exp.e1_t1", "exp.e1_t2", "exp.e1_t3", "exp.e1_t4",
            "exp.e1_t5", "exp.e1_t6", "exp.e1_t7"
        ]
    },
    {
        id: "ajuntament",
        company: "Ajuntament de Malgrat de Mar",
        location: "Malgrat de Mar, Barcelona",
        dateKey: "exp.e2_place",
        roleKey: "exp.e2_role",
        logo: "img/logos/amm.svg",
        url: "https://www.ajmalgrat.cat/",
        tasks: [
            "exp.e2_t1", "exp.e2_t2", "exp.e2_t3", "exp.e2_t4",
            "exp.e2_t5", "exp.e2_t6"
        ]
    }
];

const skillsData = [
    {
        titleKey: "skills.net",
        icon: "img/logos/Network.webp",
        items: [
            { name: "DNS", img: "img/logos/dns.webp" },
            { name: "DHCP", img: "img/logos/dhcp.webp" },
            { name: "pfSense", img: "img/logos/pfsense.webp" },
            { name: "Cisco", img: "img/logos/cisco.webp" },
            { name: "Grandstream", img: "img/logos/grandstream.webp" },
            { name: "SSH", img: "img/logos/ssh.webp" },
            { name: "Nmap", img: "img/logos/nmap.webp" },
            { name: "Wireshark", img: "img/logos/Wireshark.webp" }
        ]
    },
    {
        titleKey: "skills.sys",
        icon: "img/logos/os.webp",
        items: [
            { name: "Linux", img: "img/logos/linux.webp" },
            { name: "Windows", img: "img/logos/windows.webp" },
            { name: "macOS", img: "img/logos/macos.webp" },
            { name: "Android", img: "img/logos/Android.webp" },
            { name: "Bash", img: "img/logos/Bash.webp" },
            { name: "PowerShell", img: "img/logos/Powershell.webp" },
            { name: "Microsoft 365", img: "img/logos/Microsoft_365.webp" },
            { name: "iOS", img: "img/logos/IOS.webp" }
        ]
    },
    {
        titleKey: "skills.cloud.title",
        icon: "img/logos/cloud.webp",
        items: [
            { name: "AWS", img: "img/logos/Amazon.webp" },
            { name: "Azure", img: "img/logos/Azure.webp" },
            { name: "Google Cloud", img: "img/logos/google.webp" },
            { name: "Cloudflare", img: "img/logos/cloudflare.webp" },
            { name: "Docker", img: "img/logos/docker.webp" },
            { name: "Kubernetes", img: "img/logos/Kubernetes.webp" },
            { name: "Terraform", img: "img/logos/Terraform.webp" },
            { name: "Ansible", img: "img/logos/Ansible.webp" }
        ]
    },
    {
        titleKey: "skills.code",
        icon: "img/logos/code.webp",
        items: [
            { name: "HTML5-CSS3", img: "img/logos/html-css.webp" },
            { name: "CSharp", img: "img/logos/Csharp.webp" },
            { name: "Python", img: "img/logos/Python.webp" },
            { name: "JavaScript", img: "img/logos/js.webp" },
            { name: "PHP", img: "img/logos/PHP.webp" },
            { name: "JSON", img: "img/logos/JSON.webp" },
            { name: "GitHub", img: "img/logos/github.webp" },
            { name: "VSCode", img: "img/logos/vscode.webp" }
        ]
    },
    {
        titleKey: "skills.db",
        icon: "img/logos/Database.webp",
        items: [
            { name: "SQL", img: "img/logos/sql.webp" },
            { name: "PostgreSQL", img: "img/logos/Postgresql.webp" },
            { name: "Oracle", img: "img/logos/oracle.webp" },
            { name: "MySQL", img: "img/logos/mysql.webp" },
            { name: "MongoDB", img: "img/logos/mongodb.webp" },
            { name: "SQLite", img: "img/logos/Sqlite.webp" },
            { name: "SQL Server", img: "img/logos/sqlserver.webp" },
            { name: "Access", img: "img/logos/access.webp" }
        ]
    },
    {
        titleKey: "IA",
        isLiteral: true,
        icon: "img/logos/IA.webp",
        items: [
            { name: "n8n", img: "img/logos/n8n.webp" },
            { name: "ChatGPT", img: "img/logos/ChatGPT.webp" },
            { name: "Gemini", img: "img/logos/gemini.webp" },
            { name: "Copilot", img: "img/logos/copilot.webp" },
            { name: "Ollama", img: "img/logos/ollama.webp" },
            { name: "Notion", img: "img/logos/notion.webp" },
            { name: "Meta", img: "img/logos/meta.webp" },
            { name: "OpenAI", img: "img/logos/openai.webp" }
        ]
    },
    {
        titleKey: "skills.prod",
        icon: "img/logos/productivity.webp",
        items: [
            { name: "Microsoft Project", img: "img/logos/Microsoft_Project.webp" },
            { name: "Excel", img: "img/logos/excel.webp" },
            { name: "Word", img: "img/logos/word.webp" },
            { name: "Teams", img: "img/logos/teams.webp" },
            { name: "SharePoint", img: "img/logos/sharepoint.webp" },
            { name: "Webex", img: "img/logos/webex.webp" },
            { name: "ClickUp", img: "img/logos/clickup.webp" },
            { name: "Jira", img: "img/logos/jira-logo.webp" }
        ]
    },
    {
        titleKey: "skills.hwvirt",
        htmlTitle: "Hardware <br/> Virtualización",
        icon: "img/logos/virtualization.webp",
        items: [
            { name: "VMware", img: "img/logos/vmware.webp" },
            { name: "VirtualBox", img: "img/logos/vbox.webp" },
            { name: "Zebra", img: "img/logos/zebra.webp" },
            { name: "Honeywell", img: "img/logos/honeywell.webp" },
            { name: "Raspberry", img: "img/logos/raspberry.webp" },
            { name: "IGEL", img: "img/logos/igel-logo.webp" },
            { name: "Paralels", img: "img/logos/paralels.webp" },
            { name: "SCADA", img: "img/logos/scada.webp" }
        ]
    },
    {
        titleKey: "skills.langs",
        icon: "img/logos/language.webp",
        items: [
            { name: "AR", img: "img/logos/AR.webp" },
            { name: "EN", img: "img/logos/EN.webp" },
            { name: "ES", img: "img/logos/ES.webp" },
            { name: "CAT", img: "img/logos/CAT.webp" },
            { name: "FR", img: "img/logos/FR.webp" },
            { name: "DE", img: "img/logos/DE.webp" }
        ]
    }
];

const projectsData = [
    {
        title: "iOS Glass Portfolio — Personal Web Project",
        img: "img/projects/project4.webp",
        descKey: "projects.p1_desc",
        stack: [
            { name: "HTML/CSS", img: "img/logos/html-css.webp" },
            { name: "JavaScript", img: "img/logos/js.webp" },
            { name: "Visual Studio Code", img: "img/logos/vscode.webp" },
            { name: "ChatGPT", img: "img/logos/ChatGPT.webp" },
            { name: "Git", img: "img/logos/git_logo.webp" },
            { name: "GitHub", img: "img/logos/github.webp" }
        ],
        buttons: [
            { text: "GitHub", url: "https://github.com/aybkh/Portafolio_Personal", type: "btn" }
        ]
    },
    {
        title: "Hotel Management System",
        img: "img/projects/project1.webp",
        descKey: "projects.p2_desc",
        stack: [
            { name: "Linux", img: "img/logos/linux.webp" },
            { name: "PostgreSQL", img: "img/logos/Postgresql.webp" },
            { name: "Python", img: "img/logos/Python.webp" },
            { name: "SQL", img: "img/logos/sql.webp" },
            { name: "Bash", img: "img/logos/Bash.webp" },
            { name: "Git", img: "img/logos/git_logo.webp" },
            { name: "GitHub", img: "img/logos/github.webp" }
        ],
        buttons: [
            { text: "GitHub", url: "https://github.com/aybkh/HaramResorts", type: "btn" },
            {
                type: "made-in",
                url: "https://www.sapalomera.cat",
                img: "img/logos/logo-institut-sapalomera.webp",
                text: "MADE IN"
            }
        ]
    },
    {
        title: "ERAY Slasher – Roguelite Shooter",
        img: "img/projects/project2.webp",
        descKey: "projects.p3_desc",
        stack: [
            { name: "Unity", img: "img/logos/unity.webp" },
            { name: "CSharp", img: "img/logos/Csharp.webp" },
            { name: ".Net", img: "img/logos/dotnet.svg" },
            { name: "Visual Studio", img: "img/logos/Visual_Studio.webp" },
            { name: "Git", img: "img/logos/git_logo.webp" },
            { name: "GitHub", img: "img/logos/github.webp" }
        ],
        buttons: [
            { text: "GitHub", url: "https://github.com/aybkh/ErAySlasher", type: "btn" },
            {
                type: "made-in",
                url: "https://www.sapalomera.cat",
                img: "img/logos/logo-institut-sapalomera.webp",
                text: "MADE IN"
            }
        ]
    },
    {
        title: "Spacecraft – Infinite Shooter Game",
        img: "img/projects/project3.webp",
        descKey: "projects.p4_desc",
        stack: [
            { name: "Unity", img: "img/logos/unity.webp" },
            { name: "CSharp", img: "img/logos/Csharp.webp" },
            { name: ".Net", img: "img/logos/dotnet.svg" },
            { name: "Visual Studio", img: "img/logos/Visual_Studio.webp" },
            { name: "Git", img: "img/logos/git_logo.webp" },
            { name: "GitHub", img: "img/logos/github.webp" }
        ],
        buttons: [
            { text: "GitHub", url: "https://github.com/aybkh/spacecraft", type: "btn" }
        ]
    }
];
