var inputNome   = document.getElementById('nome')
var divResposta = document.getElementById('resposta')

document.addEventListener('DOMContentLoaded', getCategorias)
document.getElementById('botaoEnviar').addEventListener('click', postCategoria)

async function getCategorias() {
    var requisicao = await fetch('http://localhost/cafeteria-api/categorias')
    var resposta   = await requisicao.json()

    var linhas = ''

    for (var i = 0; i < resposta.data.length; i++) {
        var item = resposta.data[i]
        linhas += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td><button onclick="deleteCategoria(${item.id})">Deletar</button></td>
            </tr>
        `
    }

    divResposta.innerHTML = `
        <table>
            <thead>
                <tr><th colspan="3"><center>Categorias Cadastradas</center></th></tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>${linhas}</tbody>
        </table>
    `
}

async function postCategoria() {
    if (!inputNome.value.trim()) {
        alert('Digite o nome da categoria!')
        return
    }

    await fetch('http://localhost/cafeteria-api/categorias', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nome: inputNome.value })
    })

    inputNome.value = ''
    getCategorias()
}

async function deleteCategoria(id) {
    await fetch('http://localhost/cafeteria-api/categorias/' + id, {
        method: 'DELETE'
    })

    getCategorias()
}