
var divResposta = document.getElementById("resposta")
var inputNome = document.getElementById("nome")
var inputPreco = document.getElementById("preco")
var selectId = document.getElementById("selecao")
var disponivel = document.getElementById("disponivel")

document.addEventListener('DOMContentLoaded', getProdutos)
document.getElementById('botaoEnviar').addEventListener('click', postProduto)

async function getProdutos() {
    var requisicao = await fetch("http://localhost/Cafeteria-API/produtos")
    var resposta = await requisicao.json()

    console.log(resposta)

    // Gera as linhas automaticamente para todos os itens do array
    const linhas = resposta.data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.preco}</td>
            <td>${item.categoria_id}</td>
            <td>${item.disponivel == 1 ? "Sim" : "Não"}</td>
            <td><button onclick="deleteProduto(${item.id})">Deletar</button></td>
        </tr>
    `).join("");
    
    console.log(linhas)
    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr>
                    <th colspan="6" ><center>Produtos Cadastrados</center></th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>preço</th>
                    <th>Categoria_ID</th>
                    <th>Disponível</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `;
}


async function postProduto(event) {
    if(event) event.preventDefault();

    var requisicao = await fetch("http://localhost/cafeteria-api/produtos", {
        method:  "POST",

        headers:{
            "Content-Type": "application/json"
        },

        body:    JSON.stringify({ 
            nome: inputNome.value,
            preco: inputPreco.value,
            selectId: selectId.value,
            disponivel: disponivel.checked ? 1 : 0
        })
    })

    var resposta = await requisicao.json()
    console.log(resposta)
    
    //Limpa o campo
    inputNome.value = ""
    inputPreco.value = ""
    selectId.value = ""

    getProdutos()
}



async function deleteProduto(id) {
    var requisicao = await fetch("http://localhost/cafeteria-api/produtos/" + id, {
        method: "DELETE"
    })
 
    var resposta = await requisicao.json()
    console.log(resposta)
 
    getProdutos()
}


async function carregarCategorias() {
    const select = document.getElementById('selecao');

    try {
        const response = await fetch('http://localhost/Cafeteria-API/controllers/categorias.php');
        const resultado = await response.json();

        if (resultado.status === 'success') {
            select.innerHTML = '<option value="">Selecione uma categoria</option>';

            resultado.data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id; 
                option.textContent = categoria.nome; 
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

document.addEventListener('DOMContentLoaded', carregarCategorias);