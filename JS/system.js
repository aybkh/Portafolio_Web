/* ═══════════════════════════════════════════════
   SYSTEM LOGIC (Boot, Login, Battery, Clock)
   ═══════════════════════════════════════════════ */

let globalBattery = null;

function updateClock() {
    const clockEl = document.getElementById('macClock');
    if (!clockEl) return;
    const now = new Date();
    const isMobile = window.innerWidth <= 600;
    const options = isMobile 
        ? { hour: 'numeric', minute: 'numeric' }
        : { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    
    clockEl.textContent = now.toLocaleTimeString('en-US', options).replace(',', '');

    const calMonth = document.getElementById('calMonth');
    const calYear = document.getElementById('calYear');
    if (calMonth) calMonth.textContent = now.toLocaleDateString('en-US', { month: 'long' });
    if (calYear) calYear.textContent = now.getFullYear();
}

function updateBatteryStatus() {
    if (!globalBattery) return;
    const level = globalBattery.level * 100;
    const levelEl = document.getElementById('batteryLevel');
    const batteryPct = document.getElementById('batteryPct');
    const ccBatteryLevel = document.getElementById('ccBatteryLevel');
    const ccBatteryPct = document.getElementById('ccBatteryPct');
    
    if (levelEl) levelEl.style.width = `${level}%`;
    if (batteryPct) batteryPct.textContent = `${Math.round(level)}%`;
    if (ccBatteryLevel) ccBatteryLevel.style.width = `${level}%`;
    if (ccBatteryPct) ccBatteryPct.textContent = `${Math.round(level)}%`;
    
    const icon = document.querySelector('.battery-icon');
    if (icon) {
        if (globalBattery.charging) icon.classList.add('charging');
        else icon.classList.remove('charging');
    }
}

function setupBattery() {
    if (!('getBattery' in navigator)) {
        const levelEl = document.getElementById('batteryLevel');
        if (levelEl) levelEl.style.width = '100%';
        const batteryPct = document.getElementById('batteryPct');
        if (batteryPct) batteryPct.textContent = '100%';
        return;
    }

    navigator.getBattery().then(battery => {
        globalBattery = battery;
        updateBatteryStatus();
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
    });
}

function setupBootAndLogin() {
    const bootScreen = document.getElementById('bootScreen');
    const bootProgress = document.getElementById('bootProgress');
    const loginScreen = document.getElementById('loginScreen');
    const loginPass = document.getElementById('loginPass');
    const loginBtn = document.getElementById('loginBtn');

    if (!bootScreen || !loginScreen) return;

    let autoTypeInterval;
    let autoLoginTimeout;

    const lightWallpapers = [
        "img/macos-mojave-day.webp",
        "img/macos-monterey-day.webp",
        "img/macos-monterey-day2.webp",
        "img/macos_catalina.webp",
        "img/macos_bigsur.webp"
    ];
    const darkWallpapers = [
        "img/macos-mojave-night.webp",
        "img/macos-sequoia-night.webp",
        "img/macos_tahoe.webp"
    ];

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const wallList = currentTheme === 'light' ? lightWallpapers : darkWallpapers;
    const randomWall = wallList[Math.floor(Math.random() * wallList.length)];

    loginScreen.style.backgroundImage = `url('${randomWall}')`;
    document.body.style.backgroundImage = `url('${randomWall}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    let progress = 2;
    if (bootProgress) bootProgress.style.width = '2%';
    
    const bootInterval = setInterval(() => {
        if (bootProgress) bootProgress.style.width = progress + '%';
        progress += 1.2 + (Math.random() * 4);
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(bootInterval);
            setTimeout(() => {
                bootScreen.classList.add('fade-out');
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    loginScreen.style.display = 'flex';
                    loginScreen.classList.add('visible');
                    if (loginPass) {
                        setTimeout(() => {
                            loginPass.focus();
                            const passText = "••••••••";
                            let j = 0;
                            autoTypeInterval = setInterval(() => {
                                loginPass.value += passText[j];
                                j++;
                                if (j >= passText.length) clearInterval(autoTypeInterval);
                            }, 250);
                        }, 1200);
                    }
                }, 1000); 
            }, 800);
        }
    }, 100);

    function finishLogin() {
        if (autoTypeInterval) clearInterval(autoTypeInterval);
        if (autoLoginTimeout) clearTimeout(autoLoginTimeout);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
        loginScreen.classList.add('hidden');
        document.body.classList.remove('booting');
        setTimeout(() => { loginScreen.style.display = 'none'; }, 600);
    }

    if (loginBtn) loginBtn.addEventListener('click', finishLogin);
    if (loginPass) loginPass.addEventListener('keypress', (e) => { if (e.key === 'Enter') finishLogin(); });

    const sleepBtn = document.querySelector('.login-footer-btn .sleep')?.parentElement;
    const shutdownBtn = document.querySelector('.login-footer-btn .shutdown')?.parentElement;

    if (sleepBtn) {
        sleepBtn.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed; inset:0; background:black; z-index:10000000; cursor:none; transition: opacity 0.5s;';
            document.body.appendChild(overlay);
            const wakeUp = () => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
                loginScreen.style.display = 'flex';
                loginScreen.classList.remove('hidden');
                loginScreen.classList.add('visible');
                document.body.classList.add('booting');
                if (loginPass) { loginPass.value = ''; loginPass.focus(); }
                window.removeEventListener('click', wakeUp);
                window.removeEventListener('keydown', wakeUp);
            };
            setTimeout(() => {
                window.addEventListener('click', wakeUp);
                window.addEventListener('keydown', wakeUp);
            }, 500);
        });
    }

    if (shutdownBtn) {
        shutdownBtn.addEventListener('click', () => {
            document.body.innerHTML = `
                <div style="background:black; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#555; font-family:sans-serif; cursor:default;">
                    <button onclick="location.reload()" style="background:none; border:1px solid #333; color:#444; padding:10px 20px; border-radius:5px; cursor:pointer; transition: 0.3s;">
                        <i class="fas fa-power-off" style="font-size:24px; margin-bottom:10px; display:block;"></i>
                        Power On
                    </button>
                </div>`;
        });
    }
}
