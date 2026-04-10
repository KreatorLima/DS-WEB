var divResposta        = document.getElementById('resposta')
var inputNome          = document.getElementById('nome')
var inputPreco         = document.getElementById('preco')
var inputCategoria     = document.getElementById('categoria')
var checkboxDisponivel = document.getElementById('disponivel')

document.addEventListener('DOMContentLoaded', function() {
    getProdutos()
    getCategorias()
})

document.getElementById('botaoEnviar').addEventListener('click', postProduto)

async function getProdutos() {
    var requisicao = await fetch('http://localhost/cafeteria-api/produtos')
    var resposta   = await requisicao.json()

    var linhas = ''

    for (var i = 0; i < resposta.data.length; i++) {
        var item = resposta.data[i]
        linhas += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
                <td>${item.categoria_id}</td>
                <td>${item.disponivel == 1 ? 'Sim' : 'Nao'}</td>
                <td><button onclick="deleteProduto(${item.id})">Deletar</button></td>
            </tr>
        `
    }

    divResposta.innerHTML = `
        <table>
            <thead>
                <tr><th colspan="6"><center>Produtos Cadastrados</center></th></tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preco</th>
                    <th>Categoria</th>
                    <th>Disponivel</th>
                    <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>${linhas}</tbody>
        </table>
    `
}

async function postProduto() {
    if (!inputNome.value.trim()) {
        alert('Digite o nome do produto!')
        return
    }
    if (!inputPreco.value) {
        alert('Digite o preco do produto!')
        return
    }
    if (!inputCategoria.value) {
        alert('Selecione uma categoria!')
        return
    }

    await fetch('http://localhost/cafeteria-api/produtos', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
            nome:         inputNome.value,
            preco:        inputPreco.value,
            categoria_id: inputCategoria.value,
            disponivel:   checkboxDisponivel.checked ? 1 : 0
        })
    })

    inputNome.value            = ''
    inputPreco.value           = ''
    inputCategoria.value       = ''
    checkboxDisponivel.checked = false

    getProdutos()
}

async function deleteProduto(id) {
    await fetch('http://localhost/cafeteria-api/produtos/' + id, {
        method: 'DELETE'
    })

    getProdutos()
}

async function getCategorias() {
    var requisicao = await fetch('http://localhost/cafeteria-api/categorias')
    var resposta   = await requisicao.json()

    var select = document.getElementById('categoria')
    select.innerHTML = '<option value="">Selecione a categoria</option>'

    for (var i = 0; i < resposta.data.length; i++) {
        var cat    = resposta.data[i]
        var opcao  = document.createElement('option')
        opcao.value       = cat.id
        opcao.textContent = cat.nome
        select.appendChild(opcao)
    }
}