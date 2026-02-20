//========== Eventos do Mouse ==========//

//Clique simples
var area = document.getElementById("area");
var mensagem = document.getElementById("mensagem");

area.addEventListener("click", function () {
    mensagem.textContent = "Clique simples detectado!";
});

//Clique duplo
area.addEventListener("dblclick", function () {

    if (area.style.background == "lightgreen") {
        area.style.background = "lightblue";
    }
    else {
        area.style.background = "lightgreen";
    }
});

//Mouse entra na área
area.addEventListener("mouseenter", function () {
    mensagem.textContent = "O mouse entrou na área!";
});

//Mouse sai da área
area.addEventListener("mouseleave", function () {
    mensagem.textContent = "O mouse saiu da área!";
});

//Mouse se move dentro da área
var posicao = document.getElementById("posicao");

area.addEventListener("mousemove", function (event) {
    posicao.textContent = "X:" + event.clientX + " Y:" + event.clientY;
});

//Clique com o botão direito
area.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("Botão direito clicado!");
});

//========== Eventos do Teclado ==========//


//Tecla pressionada
document.addEventListener("keydown", function (event) {// Exibe a tecla pressionada
    var campo = document.getElementById("resultado");
    campo.textContent = "Tecla pressionada: " + event.key;// Também mostra no console
    console.log("Tecla pressionada: " + event.key);  
});

//========== Eventos de Formulário ==========//


//========== Eventos de Janela ==========//

