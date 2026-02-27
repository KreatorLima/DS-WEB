// =======================
// INTRO ANIMADA
// =======================

const textoIntro = "Você tem 60 segundos para pegar o pombo 🐦";
const h3 = document.querySelector("h3");

let index = 0;
h3.textContent = "";
h3.style.opacity = "0";

function digitar() {
    if (index < textoIntro.length) {
        h3.textContent += textoIntro.charAt(index);
        index++;
        setTimeout(digitar, 40);
    } else {
        iniciarJogo();
    }
}

window.onload = () => {
    h3.style.transition = "opacity 1s";
    h3.style.opacity = "1";
    digitar();
};


// =======================
// JOGO
// =======================

function iniciarJogo() {

    var area = document.getElementById("area");

    let segundos = 60;

    const timer = setInterval(() => {

        segundos--;

        document.getElementById("tempo").innerHTML =
            "Tempo restante: " + segundos + "s";

        if (segundos === 0) {
            clearInterval(timer);
            document.body.innerHTML =
                "<h1 style='text-align:center;margin-top:20%;'>💀 Tempo encerrado!</h1>";
        }

    }, 1000);


    // Movimento do pombo
    area.addEventListener("mouseenter", function () {

        var largura = window.innerWidth - 150;
        var altura = window.innerHeight - 150;

        var novoX = Math.random() * largura;
        var novoY = Math.random() * altura;

        area.style.position = "absolute";
        area.style.left = novoX + "px";
        area.style.top = novoY + "px";
    });


    // 🔥 SE CLICAR → GANHA
    area.addEventListener("click", function () {

        clearInterval(timer);

        document.body.innerHTML =
            "<h1 style='text-align:center;margin-top:20%;color:green;'>🏆 Você pegou o pombo!</h1>";
    });

}