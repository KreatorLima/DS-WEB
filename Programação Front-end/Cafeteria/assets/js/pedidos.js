var divResposta = document.getElementById("resposta");
var inputNome = document.getElementById("nome");

// Eventos
document.addEventListener('DOMContentLoaded', getPedidos);
document.getElementById('botaoEnviar').addEventListener('click', postPedidos);

// 1. BUSCAR PEDIDOS (GET)
async function getPedidos() {
    try {
        var requisicao = await fetch("http://localhost/Cafeteria-API/pedidos");
        var resposta = await requisicao.json();

        console.log(resposta);

        // Gera as linhas automaticamente
        const linhas = resposta.data.map(item => {
    // 1. Transforma a string do banco em um objeto Date do JS
    const dataObj = new Date(item.criado_em);

    // 2. Formata a data para o padrão brasileiro
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // 3. Retorna a linha da tabela com a data bonitinha
    return `
        <tr>
            <td>${item.id}</td>
            <td>${item.cliente}</td>
            <td>R$ ${parseFloat(item.total).toFixed(2)}</td>
            <td>${dataFormatada}</td> 
            <td>
                <button class="button-delete" onclick="deletePedido(${item.id})">Deletar</button>
                <button class="button-vizu" onclick="window.location.href='pedido.html?id=${item.id}'">Visualizar</button>
            </td>
        </tr>
            `;
        }).join("");
        
        divResposta.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th colspan="5" style="text-align: center;">Lista de Pedidos</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Criado em</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhas || '<tr><td colspan="5" style="text-align:center">Nenhum pedido encontrado.</td></tr>'}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
    }
}

// 2. CADASTRAR PEDIDO (POST)
async function postPedidos() {
    if (!inputNome.value) {
        alert("Por favor, digite o nome do cliente.");
        return;
    }

    try {
        var requisicao = await fetch("http://localhost/Cafeteria-API/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                cliente: inputNome.value
            })
        });

        var resposta = await requisicao.json();
        console.log(resposta);
        
        inputNome.value = ""; // Limpa o campo
        getPedidos(); // Atualiza a tabela
    } catch (error) {
        console.error("Erro ao postar pedido:", error);
    }
}

// 3. DELETAR PEDIDO (DELETE)
async function deletePedido(id) {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;

    try {
        var requisicao = await fetch("http://localhost/Cafeteria-API/pedidos/" + id, {
            method: "DELETE"
        });
     
        var resposta = await requisicao.json();
        console.log(resposta);
     
        getPedidos(); // Atualiza a tabela
    } catch (error) {
        console.error("Erro ao deletar pedido:", error);
    }
}

getPedidos();