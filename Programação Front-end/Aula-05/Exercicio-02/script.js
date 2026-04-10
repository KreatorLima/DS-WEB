document.addEventListener("DOMContentLoaded", function () {

    const player = document.getElementById("player");
    const labirinto = document.getElementById("labirinto");
    const paredes = document.querySelectorAll(".parede");
    const inimigos = document.querySelectorAll(".enemy");
    const final = document.querySelector(".final");
    const jumpscare = document.getElementById("jumpscare");
    const som = document.getElementById("sustoMp3");
    const timer = document.getElementById("timer");
    const salaSecreta = document.getElementById("salaSecreta");
    const tituloPrincipal = document.querySelector("h2");

    let jogoAtivo = false;
    let contagem = 3;

    // Desbloqueia áudio para navegadores modernos
    document.addEventListener("click", () => {
        som.play().then(() => {
            som.pause();
            som.currentTime = 0;
        }).catch(() => {});
    }, { once: true });

    // TIMER INICIAL
    timer.innerText = contagem;
    const intervalo = setInterval(() => {
        contagem--;
        if (contagem > 0) {
            timer.innerText = contagem;
        } else if (contagem === 0) {
            timer.innerText = "VAI!";
        } else {
            clearInterval(intervalo);
            timer.style.display = "none";
            jogoAtivo = true;
        }
    }, 1000);

    // MOVIMENTAÇÃO DO JOGADOR
    document.addEventListener("mousemove", function (e) {
        if (!jogoAtivo) return;

        const rect = labirinto.getBoundingClientRect();
        let x = e.clientX - rect.left - 10;
        let y = e.clientY - rect.top - 10;

        // Limita o player dentro das bordas
        x = Math.max(0, Math.min(x, rect.width - 20));
        y = Math.max(0, Math.min(y, rect.height - 20));

        player.style.left = x + "px";
        player.style.top = y + "px";

        verificarColisao();
    });

    // MOVIMENTAÇÃO DOS INIMIGOS
    inimigos.forEach((inimigo, index) => {
        let x = 200 + (index * 100);
        let y = 150 + (index * 50);
        let dx = (index % 2 === 0 ? 3 : -3); // Um vai pra esquerda, outro pra direita
        let dy = 3;

        function mover() {
            if (jogoAtivo) {
                x += dx;
                y += dy;

                // Rebater nas paredes do labirinto (700x500)
                if (x <= 20 || x >= 640) dx *= -1;
                if (y <= 20 || y >= 440) dy *= -1;

                inimigo.style.left = x + "px";
                inimigo.style.top = y + "px";
                
                verificarColisao();
            }
            requestAnimationFrame(mover);
        }
        mover();
    });

    function verificarColisao() {
        if (!jogoAtivo) return;

        const playerRect = player.getBoundingClientRect();

        // Checar Paredes
        for (let parede of paredes) {
            if (colidiu(playerRect, parede.getBoundingClientRect())) {
                
                // SE ENCOSTAR NA PAREDE SECRETA
                if (parede.classList.contains("segredo")) {
                    entrarNaSalaSecreta();
                    return;
                }

                // Parede Normal
                perder();
                return;
            }
        }

        // Checar Inimigos
        for (let inimigo of inimigos) {
            if (colidiu(playerRect, inimigo.getBoundingClientRect())) {
                perder();
                return;
            }
        }

        // Checar Vitória
        if (colidiu(playerRect, final.getBoundingClientRect())) {
            jogoAtivo = false;
            alert("Você venceu 😎");
            location.reload();
        }
    }

    function colidiu(a, b) {
        return (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
        );
    }

    function entrarNaSalaSecreta() {
    jogoAtivo = false;
    
    // Esconde o labirinto e o título
    labirinto.style.display = "none";
    if(tituloPrincipal) tituloPrincipal.style.display = "none";
    
    // Mostra a sala secreta
    salaSecreta.style.display = "flex";

    // --- CÓDIGO PARA O ÁUDIO ---
    const audio = document.getElementById("audioExplosao");
    audio.currentTime = 0; // Reinicia o som do começo
    audio.play().catch(e => {
        console.log("O som foi bloqueado pelo navegador, mas tocará após o primeiro clique.");
    });
}

    function perder() {
        jogoAtivo = false;
        jumpscare.style.display = "flex";
        som.currentTime = 0;
        som.play().catch(() => {});
        
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
});