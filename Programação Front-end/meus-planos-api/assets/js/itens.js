var tarefa = document.getElementById('tarefa')
var categorias = document.getElementById('selecao')
var divResposta = document.getElementById("resposta")

document.addEventListener('DOMContentLoaded', getProdutos)
document.getElementById('botaoEnviar').addEventListener('click', postProduto)

async function getProdutos() {
    var requisicao = await fetch("http://localhost/meus-planos-api/itens")
    var resposta = await requisicao.json()

    const linhas = resposta.data.map(item => `
        <tr>
            <td style="text-align: center;">
                <input type="checkbox" class="check-feito" id="check-${item.id}" 
                    ${item.feito == 1 ? "checked" : ""} 
                    onclick="atualizarStatus(${item.id}, this.checked)">
            </td>
            <td class = "texto-tarefa">${item.nome}</td>
            <td>${item.categoria_nome}</td>
            <td>
                <button class="btn-acao" onclick="deleteProduto(${item.id})">Deletar</button>
            </td>
        </tr>
    `).join("");
    
    divResposta.innerHTML = `
        <table class="tabela-estilo-imagem">
            <thead>
                <tr>
                    <th colspan="4">Lista de Tarefas</th>
                </tr>
                <tr>
                    <th>Feito</th>
                    <th>Tarefa</th>
                    <th>Categoria</th>
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

    // Verificação de segurança
    if (!tarefa.value || !categorias.value) {
        alert("Preencha a tarefa e selecione uma categoria!");
        return;
    }

    const dadosParaEnviar = { 
        nome: tarefa.value,
        categoria_id: categorias.value, 
        disponivel: 0 
    };

    try {
        var requisicao = await fetch("http://localhost/meus-planos-api/itens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosParaEnviar)
        });

        var resposta = await requisicao.json();
        
        if (resposta.status === 'success') {
            tarefa.value = "";
            categorias.value = "";
            getProdutos();
        } else {
            console.error("Erro da API:", resposta.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

    getProdutos()



async function deleteProduto(id) {
    var requisicao = await fetch("http://localhost/meus-planos-api/itens/" + id, {
        method: "DELETE"
    })
 
    var resposta = await requisicao.json()
    console.log(resposta)
 
    getProdutos()
}


async function carregarCategorias() {
    const selectCategorias = document.getElementById('selecao');

    try {
        const response = await fetch('http://localhost/meus-planos-api/categorias');
        const resultado = await response.json();

        if (resultado.status === 'success') {
            selectCategorias.innerHTML = '<option value="">Selecione uma categoria</option>';

            resultado.data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id; 
                option.textContent = categoria.nome;
                selectCategorias.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

async function atualizarStatus(id, isChecked) {
    const statusFeito = isChecked ? 1 : 0;

    try {
        const response = await fetch(`http://localhost/meus-planos-api/itens/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                feito: statusFeito 
            })
        });

        const resultado = await response.json();

        if (resultado.status === 'success') {
            console.log(`Tarefa ${id} atualizada com sucesso!`);
        } else {
            alert("Erro ao atualizar: " + resultado.message);
        }
    } catch (error) {
        console.error("Erro na conexão:", error);
    }
}

document.addEventListener('DOMContentLoaded', carregarCategorias);

document.addEventListener('DOMContentLoaded', carregarCategorias);