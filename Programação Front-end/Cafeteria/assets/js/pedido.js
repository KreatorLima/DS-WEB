const divResposta = document.getElementById('resposta');
const divTotal = document.getElementById('total-geral');
const inputProduto = document.getElementById('produto_id');
const inputQuantidade = document.getElementById('quantidade');

const urlParams = new URLSearchParams(window.location.search);
const pedidoId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (!pedidoId) {
        alert("ID do pedido não encontrado na URL!");
        return;
    }
    getItens();
});

document.getElementById('botaoEnviar').addEventListener('click', postItem);

// 1. BUSCAR ITENS DO PEDIDO (GET)
async function getItens() {
    try {
        const req = await fetch(`http://localhost/Cafeteria-API/Controllers/pedidos.php?id=${pedidoId}`);
        const res = await req.json();

        if (res.status === 'success') {
            renderTabela(res.data);
        }
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
    }
}

function renderTabela(itens) {
    let totalPedido = 0;
    
    console.log("Dados recebidos da API:", itens);

    let linhas = itens.map(item => {
        const preco = parseFloat(item.preco) || 0;
        const qtd = parseInt(item.quantidade) || 0;
        const subtotal = preco * qtd;
        const nomeProd = item.produto_nome || `Produto #${item.produto_id}`;
        
        totalPedido += subtotal;

        return `
            <tr>
                <td>${item.id}</td>
                <td>${nomeProd}</td>
                <td>${qtd}</td>
                <td>R$ ${preco.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td>
                    <button onclick="deleteItem(${item.id})">Remover</button>
                </td>
            </tr>`;
    }).join('');

    divResposta.innerHTML = `
        <table border="1">
            <thead>
                <tr style="background-color: #00b894; color: white;">
                    <th>ID Item</th>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Preço Un.</th>
                    <th>Subtotal</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>${linhas || '<tr><td colspan="6">Nenhum item encontrado.</td></tr>'}</tbody>
        </table>`;
    
    divTotal.innerText = `Total do Pedido: R$ ${totalPedido.toFixed(2)}`;
}

// 2. ADICIONAR ITEM (POST)
async function postItem() {
    const dados = {
        pedido_id: pedidoId,
        produto_id: inputProduto.value,
        quantidade: inputQuantidade.value
    };

    if (!dados.produto_id || !dados.quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        await fetch('http://localhost/Cafeteria-API/Controllers/pedidos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        inputProduto.value = '';
        inputQuantidade.value = '1';
        getItens();
    } catch (error) {
        console.error("Erro ao adicionar item:", error);
    }
}

// 3. DELETAR ITEM (DELETE)
async function deleteItem(id) {
    if (!confirm("Remover este produto do pedido?")) return;

    try {
        await fetch(`http://localhost/Cafeteria-API/Controllers/pedidos.php/${id}`, {
            method: 'DELETE'
        });
        getItens();
    } catch (error) {
        console.error("Erro ao deletar item:", error);
    }
}