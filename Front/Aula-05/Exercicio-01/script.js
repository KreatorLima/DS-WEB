var area = document.getElementById("area");

area.addEventListener("mouseenter", function() {

    var largura = window.innerWidth - 150;
    var altura = window.innerHeight - 150;

    var novoX = Math.random() * largura;
    var novoY = Math.random() * altura;

    area.style.marginLeft = novoX + "px";
    area.style.marginTop = novoY + "px";
});