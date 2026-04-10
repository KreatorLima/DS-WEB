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

    document.getElementById("lista").appendChild(novoItem);


    let separador = document.createElement("hr");
    document.getElementById("lista").appendChild(separador);


}

function remover(itemLista){
    let id = prompt("Digite o número do id a ser removido:");
    if(!id) return;

    let item1 = document.getElementById(id);
    let separador = document.getElementById(id).nextSibling;

    if(item1){
        item1.remove();
        document.getElementById("lista").removeChild(separador);
        alert("Item removido com sucesso: " + id);
    } else {
        alert("Item não encontrado: " + id);
    }
        }
 
