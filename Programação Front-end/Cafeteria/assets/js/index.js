// Carrega resumo geral ao abrir a página
document.addEventListener('DOMContentLoaded', carregarResumo)

async function carregarResumo() {
    try {
        const req      = await fetch('http://localhost/cafeteria-api/pedidos')
        const resposta = await req.json()

        const pedidos = resposta.data || []

        // --- Calcula estatísticas ---
        const totalPedidos = pedidos.length

        const totalGeral = pedidos.reduce((soma, p) => {
            return soma + (p.total ? parseFloat(p.total) : 0)
        }, 0)

        const ticketMedio = totalPedidos > 0 ? totalGeral / totalPedidos : 0

        // --- Atualiza os cards ---
        document.getElementById('valor-total-geral').textContent =
            `R$ ${totalGeral.toFixed(2)}`

        document.getElementById('valor-total-pedidos').textContent =
            totalPedidos

        document.getElementById('valor-ticket-medio').textContent =
            `R$ ${ticketMedio.toFixed(2)}`

        // --- Tabela dos últimos pedidos ---
        const divTabela = document.getElementById('ultimos-pedidos')

        if (pedidos.length === 0) {
            divTabela.innerHTML = '<p style="text-align:center">Nenhum pedido cadastrado ainda.</p>'
            return
        }

        // Mostra os últimos 10 pedidos (mais recentes primeiro)
        const ultimos = [...pedidos].reverse().slice(0, 10)

        const linhas = ultimos.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.cliente}</td>
                <td>R$ ${p.total ? parseFloat(p.total).toFixed(2) : '0.00'}</td>
                <td>${new Date(p.criado_em).toLocaleString('pt-BR')}</td>
                <td>
                    <a href="pedido_itens.html?pedido_id=${p.id}" class="button button-enviar" style="font-size:13px; padding:5px 10px;">
                        Ver Itens
                    </a>
                </td>
            </tr>
        `).join('')

        divTabela.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th colspan="5"><center>Últimos Pedidos</center></th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhas}
                </tbody>
            </table>
        `

    } catch (erro) {
        console.error('Erro ao carregar resumo:', erro)
        document.getElementById('valor-total-geral').textContent    = 'Erro'
        document.getElementById('valor-total-pedidos').textContent  = 'Erro'
        document.getElementById('valor-ticket-medio').textContent   = 'Erro'
    }
}
