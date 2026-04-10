var divResposta = document.getElementById('resposta')
var divTotal    = document.getElementById('total-geral')
var inputNome   = document.getElementById('nome')

document.addEventListener('DOMContentLoaded', getPedidos)
document.getElementById('botaoEnviar').addEventListener('click', postPedidos)

async function getPedidos() {
    var requisicao = await fetch('http://localhost/cafeteria-api/pedidos')
    var resposta   = await requisicao.json()

    var pedidos    = resposta.data
    var totalGeral = 0
    var linhas     = ''

    for (var i = 0; i < pedidos.length; i++) {
        var item = pedidos[i]
        totalGeral += item.total ? parseFloat(item.total) : 0

        linhas += `
            <tr>
                <td>${item.id}</td>
                <td>${item.cliente}</td>
                <td>R$ ${item.total ? parseFloat(item.total).toFixed(2) : '0.00'}</td>
                <td>${new Date(item.criado_em).toLocaleString('pt-BR')}</td>
                <td>
                    <button onclick="window.location.href='pedido_itens.html?pedido_id=${item.id}'">Visualizar Itens</button>
                    <button onclick="deletePedido(${item.id})">Deletar</button>
                </td>
            </tr>
        `
    }

    divTotal.innerHTML = `
        <table>
            <thead>
                <tr><th>Total gasto por todos os clientes: R$ ${totalGeral.toFixed(2)}</th></tr>
            </thead>
        </table>
    `

    divResposta.innerHTML = `
        <table>
            <thead>
                <tr><th colspan="5"><center>Pedidos Cadastrados</center></th></tr>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Data</th>
                    <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>${linhas}</tbody>
        </table>
    `
}

async function postPedidos() {
    if (!inputNome.value.trim()) {
        alert('Digite o nome do cliente!')
        return
    }

    await fetch('http://localhost/cafeteria-api/pedidos', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ cliente: inputNome.value })
    })

    inputNome.value = ''
    getPedidos()
}

async function deletePedido(id) {
    if (!confirm('Tem certeza que deseja deletar este pedido?')) return

    await fetch('http://localhost/cafeteria-api/pedidos/' + id, {
        method: 'DELETE'
    })

    getPedidos()
}