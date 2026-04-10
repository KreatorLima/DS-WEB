// Pega o ID do pedido da URL (ex: ?pedido_id=3)
var params   = new URLSearchParams(window.location.search)
var pedidoId = params.get('pedido_id')

document.addEventListener('DOMContentLoaded', function() {
    if (!pedidoId) {
        document.getElementById('titulo-pedido').textContent = 'Pedido nao informado'
        return
    }

    document.getElementById('titulo-pedido').textContent = 'Pedido #' + pedidoId

    carregarItens()
    carregarProdutos()

    document.getElementById('btnAdicionar').addEventListener('click', adicionarItem)
})

// Busca e exibe os itens do pedido
async function carregarItens() {
    var requisicao = await fetch('http://localhost/cafeteria-api/pedido_itens?pedido_id=' + pedidoId)
    var resposta   = await requisicao.json()

    var divItens = document.getElementById('area-itens')
    var divTotal = document.getElementById('total-pedido')

    if (!resposta.data || resposta.data.length === 0) {
        divItens.innerHTML = '<p>Nenhum item neste pedido ainda.</p>'
        divTotal.innerHTML = ''
        return
    }

    var totalGeral = 0
    var linhas = ''

    for (var i = 0; i < resposta.data.length; i++) {
        var item     = resposta.data[i]
        var subtotal = parseFloat(item.quantidade) * parseFloat(item.preco)
        totalGeral  += subtotal

        linhas += `
            <tr>
                <td>${item.produto_nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            </tr>
        `
    }

    divItens.innerHTML = `
        <table>
            <thead>
                <tr><th colspan="4"><center>Itens do Pedido #${pedidoId}</center></th></tr>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preco Unit.</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>${linhas}</tbody>
        </table>
    `

    divTotal.innerHTML = `
        <table>
            <thead>
                <tr><th>Total da Compra: R$ ${totalGeral.toFixed(2)}</th></tr>
            </thead>
        </table>
    `
}

// Preenche o select com os produtos disponiveis
async function carregarProdutos() {
    var requisicao = await fetch('http://localhost/cafeteria-api/produtos')
    var resposta   = await requisicao.json()

    var select = document.getElementById('selectProd')

    for (var i = 0; i < resposta.data.length; i++) {
        var produto = resposta.data[i]

        if (produto.disponivel == 1) {
            var opcao           = document.createElement('option')
            opcao.value         = produto.id
            opcao.textContent   = produto.nome + ' - R$ ' + parseFloat(produto.preco).toFixed(2)
            opcao.dataset.preco = produto.preco
            select.appendChild(opcao)
        }
    }
}

// Adiciona um item ao pedido usando o preco do produto cadastrado
async function adicionarItem() {
    var select     = document.getElementById('selectProd')
    var quantidade = document.getElementById('qtdProd').value

    var produto_id = select.value
    var preco      = select.options[select.selectedIndex].dataset.preco

    if (!produto_id) {
        alert('Selecione um produto!')
        return
    }

    if (!quantidade || quantidade < 1) {
        alert('Informe a quantidade!')
        return
    }

    await fetch('http://localhost/cafeteria-api/pedido_itens', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ pedido_id: pedidoId, produto_id: produto_id, quantidade: quantidade, preco: preco })
    })

    // Limpa os campos e recarrega a tabela
    select.value = ''
    document.getElementById('qtdProd').value = 1

    carregarItens()
}