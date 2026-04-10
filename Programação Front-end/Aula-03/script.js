//Criando o contador de Itens
var contadorItem = 0;

function adicionar(){
    //Incrementando o contador de itens
    contadorItem++;

    //Crio o Item
    let novoItem = document.createElement("li");

    //Adiciono o texto ao item
    novoItem.textContent = contadorItem + " - " + prompt("Digite o item a ser adicionado:");
    
    //Atribuo um id para o item
    novoItem.setAttribute("id", contadorItem);

    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover"; //Adiciona o texto ao botão
    botaoRemover.setAttribute("onclick", "remover(" + contadorItem + ")"); //Adiciona uma função ao botão

    let quebraLinha = document.createElement("br");
    novoItem.appendChild(quebraLinha);

    novoItem.appendChild(botaoRemover); //Adiciona o botão ao item
    document.getElementById("lista").appendChild(novoItem);

    let separador = document.createElement("hr");
    document.getElementById("lista").appendChild(separador);


}

function remover(itemLista){
    var item1 = document.getElementById(itemLista);
    var separador = document.getElementById(itemLista).nextSibling;
    document.getElementById("lista").removeChild(item1);
    document.getElementById("lista").removeChild(separador);
}
