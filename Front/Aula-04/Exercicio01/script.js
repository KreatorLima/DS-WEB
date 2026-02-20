var contador = 0;

function listar() {

    contador++;

    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let ra = document.getElementById("RA").value;
    let turma = document.getElementById("turma").value;

    
    let novoItem = document.createElement("div");
    novoItem.setAttribute("id", contador);

    
    novoItem.innerHTML = `
        <p>Nome: ${nome}</p>
        <p>Email: ${email}</p>
        <p>RM: ${ra}</p>
        <p>Telefone: ${telefone}</p>
        <p>Turma: ${turma}</p>
        <button onclick="remover(${contador})">Remover</button>
        <hr>
    `;

    
    document.getElementById("lista").appendChild(novoItem);

    
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("RA").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("turma").value = "";
}

function remover(id) {
    let item = document.getElementById(id);
    item.remove();
}