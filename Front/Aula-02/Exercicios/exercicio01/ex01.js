function MudaCor() {
    document.getElementById('conteudo').innerHTML = 'Hello World';

    document.getElementById("conteudo").style.backgroundColor = "black";
    document.getElementById("conteudo").style.width = "500px";
    document.getElementById("conteudo").style.height = "200px";
    document.getElementById("conteudo").style.textAlign = "center";
    document.getElementById("conteudo").style.color = "white";
    document.getElementById("conteudo").style.border = "1px solid white";

    var valor = document.getElementById("conteudo").innerHTML;
    console.log(valor);
}