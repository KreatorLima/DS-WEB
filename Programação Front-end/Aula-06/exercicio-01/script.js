//Validação de formulário

//Selecionando os elementos do formulário
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const confirmarSenha = document.querySelector('#confirma-senha');
const cpfInput = document.querySelector('#cpf');
const telefone = document.querySelector('#telefone');
const cep = document.querySelector('#cep');
const dataNascimento = document.querySelector('#data-nascimento');
const valor = document.querySelector('#valor');
const url = document.querySelector('#url');
const cartao = document.querySelector('#cartao');
//============================================================


//Selecionando os elementos de erro
const erroNome = document.querySelector('#erro-nome');
const erroEmail = document.querySelector('#erro-email');
const erroSenha = document.querySelector('#erro-senha');
const erroCpf = document.querySelector('#erro-cpf');
const erroTelefone = document.querySelector('#erro-telefone');
const erroCep = document.querySelector('#erro-cep');
const erroDataNascimento = document.querySelector('#erro-data-nascimento');
const erroValor = document.querySelector('#erro-valor');
const erroUrl = document.querySelector('#erro-url');
const erroCartao = document.querySelector('#erro-cartao');
//============================================================


//Selecionando o formulário
const form = document.querySelector('#formulario');
//============================================================


form.addEventListener('submit', function(event) {

    let valido = true;

    //Validando se existe algo sem nada
    if (!nome.value  || !email.value || !senha.value || !confirmarSenha.value || !cpfInput.value || !telefone.value || !cep.value || !dataNascimento.value || !valor.value || !url.value || !cartao.value) {
        alert('Por favor, preencha todos os campos do formulário.');
        valido = false;
    }
    //============================================================

    //Validando o nome
    if (nome.value.length < 3) {
        erroNome.textContent = 'O nome deve conter pelo menos 3 caracteres.';
        valido = false;
    }

    else if (nome.value.length > 100) {
        erroNome.textContent = 'O nome não pode passar de 100 caracteres'
    }

    else if (/\d/.test(nome.value)) {
        erroNome.textContent = 'Não pode ter números no nome!';
    }
    //============================================================


    //Validando o email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        erroEmail.textContent = 'Email inválido';
        valido = false;
    } 
    //============================================================


    //Validando a senha
    if (senha.value.length < 8) {
        erroSenha.textContent = "A senha deve conter pelo menos 8 caracteres.";
        valido = false;
    }   

    else if (senha.value !== confirmarSenha.value) {
        erroSenha.textContent = "As senhas devem coincidir!";
        valido = false;
    }

    else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(senha.value)) {
        erroSenha.textContent = "A senha precisa ter: 1 letra maiúscula, 1 minúscula, 1 caractere especial e no mínimo 8 caracteres.";
        valido = false;
    }

    else {
        erroSenha.textContent = "";
    }   
    //============================================================


    //Validando o CPF
    let cpf = cpfInput.value.replace(/\D/g, '');
    let cpfValido = true;

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        cpfValido = false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) cpfValido = false;

    soma = 0;

    for (let i = 1; i <= 10; i++) { 
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) cpfValido = false;

    if (!cpfValido) {
    erroCpf.textContent = 'CPF inválido';
    valido = false;
    } else {    
    erroCpf.textContent = '';
    } 
    //============================================================


    //Validando Telefone
    if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telefone.value)) {
        erroTelefone.textContent = 'Coloque o telefone em um formato válido';
        valido = false;
    }
     //============================================================


    //Validando CEP
    if (!/^\d{5}-\d{3}$/.test(cep.value)) {
        erroCep.textContent = 'Formato do CEP errado';
        valido = false;
    }
    //============================================================


    //Validando datas
    if (!/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/.test(dataNascimento.value)){
        erroDataNascimento.textContent = 'Formato de data inválido!';
        valido = false;
    }
    //============================================================


    //Validando o valor
    if (!/\d/.test(valor.value)) {
        erroValor.textContent = "Digite pelo menos um número";
    } 
    else if (!/^(R\$ ?\d{1,3}(\.\d{3})*,\d{2}|US\$ ?\d{1,3}(,\d{3})*\.\d{2})$/.test(valor.value)) {
        erroValor.textContent = 'Formato de valor errado';
    } 
    //============================================================


    //Validando URL
    if (!/^https?:\/\/[a-z0-9]+(?:[-.][a-z0-9]+)*(?::[0-9]{1,5})?(?:\/[^\/\r\n]+)*\.[a-z]{2,5}(?:[?#]\S*)?$/.test(url.value)) {
        erroUrl.textContent = "O formato da URL está errado!";
    }
    //============================================================

    
    //Validando numero do cartão
    let numero = cartao.value.replace(/\s/g, ''); // remove todos os espaços

    if (!/^\d{16}$/.test(numero)) {
        erroCartao.textContent = "O cartão deve ter 16 dígitos";
    }  

    let bandeira = "";

    if (/^4/.test(cartao.value)) {
        bandeira = "Visa";
    }

    else if (/^5[1-5]/.test(cartao.value)) {
        bandeira = "MasterCard";
    }

    else if (/^3[47]/.test(cartao.value)) {
        bandeira = "American Express";
    }

    else if (/^6/.test(cartao.value)) {
        bandeira = "Discover";
    }

    else {
        bandeira = "Bandeira desconhecida";
    }   

    if (!valido) {
        event.preventDefault();
    }

    });
    //=============================================================

document.getElementById("formulario").addEventListener("submit", function(e) {

    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let cep = document.getElementById("cep").value;
    let data = document.getElementById("data-nascimento").value;
    let valor = document.getElementById("valor").value;
    let url = document.getElementById("url").value;
    let cartao = document.getElementById("cartao").value;

    // remove espaços do cartão
    let numero = cartao.replace(/\s/g, '');

    let bandeira = "";

    if (/^4/.test(numero)) {
        bandeira = "Visa";
    }
    else if (/^5[1-5]/.test(numero)) {
        bandeira = "MasterCard";
    }
    else if (/^3[47]/.test(numero)) {
        bandeira = "American Express";
    }
    else if (/^6/.test(numero)) {
        bandeira = "Discover";
    }
    else {
        bandeira = "Bandeira desconhecida";
    }

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <h2>Dados enviados:</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>CPF:</b> ${cpf}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>CEP:</b> ${cep}</p>
        <p><b>Data:</b> ${data}</p>
        <p><b>Valor:</b> ${valor}</p>
        <p><b>URL:</b> ${url}</p>
        <p><b>Cartão:</b> ${cartao}</p>
        <p><b>Bandeira:</b> ${bandeira}</p>
    `;
});

document.getElementById("formulario").addEventListener("reset", function(e) {

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

});