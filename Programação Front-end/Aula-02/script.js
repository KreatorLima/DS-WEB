//Funções em JavaScript

function somarNumeros(num1, num2){
    return num1 + num2;
}

let resultado = somarNumeros(5, 10);
console.log("O resultado da soma é: " + resultado);

//Trabalhando com data e hora
let dataAtual = new Date();
console.log(dataAtual.toISOString());

let ano = dataAtual.getFullYear();
let mes = dataAtual.getMonth() + 1;
let dia = dataAtual.getDate();
let hora = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
let segundos = dataAtual.getSeconds();

console.log(`Data atual: ${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`);

//=================================================================
//outro exemplo de date
let hoje = new Date();
let diasParaAdicionar = 7;

//Cria uma nova data apartir da data atual
let novaData = new Date(hoje);
novaData.setDate(novaData.getDate() + diasParaAdicionar);

//Exibe a data no formato local, ou seja, dia/mes/ano
console.log(novaData.toLocaleDateString());

//=================================================================
//Calculando a diferença entre duas datas
let data1 = new Date("2024-07-06");
let data2 = new Date("2026-02-06");

//Calcula a diferença em milissegundos
let diferencaEmMilissegundos = data2 - data1;

//Converte a diferença para dias
let diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);
console.log(`A diferença entre as datas é de ${diferencaEmDias} dias.`);

//=================================================================
//funções matemáticas

//retorna o valor absoluto de um número
console.log(Math.abs(-5)); // Saída: 5

//arredonda para cima
console.log(Math.ceil(2.2)); // Saída: 5

//arredonda para baixo
console.log(Math.floor(4.8)); // Saída: 4

//arredonda para o inteiro mais próximo
console.log(Math.round(4.5)); // Saída: 5
console.log(Math.round(4.4)); // Saída: 4

//gerar um número aleatório entre 0 e 1
console.log(Math.random()); // Exemplo de saída: 0.123456789

//potencia: 2 elevado a 3
console.log(Math.pow(2, 3)); // Saída: 8

//raiz quadrada de 25
console.log(Math.sqrt(25)); // Saída: 5

//valor minimo e maximo entre um conjunto de números
console.log(Math.min(3, 9, 2)); // Saída: 2
console.log(Math.max(3, 9, 2)); // Saída: 9


//=================================================================
//manipulando o DOM (Document Object Model)

//Selecionando um elemento pelo ID e alterando seu conteúdo
document.getElementById("conteudo").innerHTML = "<p>Olá, mundo! Este texto foi inserido usando JavaScript.</p>";

var valor = document.getElementById("conteudo").innerHTML;
console.log(valor);


//=================================================================
//Usando o setAtributte e getAttribute
document.getElementById("foto").setAttribute("src", "imagem.jpg");

console.log(document.getElementById("foto").getAttribute("src"));

//=================================================================
//Alterando propriedade de CSS
document.getElementById("conteudo").style.color = "red";
document.getElementById("conteudo").style.fontSize = "20px";
document.getElementById("foto").style.boxShadow = "2px 5px 10px black";

//=================================================================
//Criando uma função para um botão
function mudarCor(){
    document.getElementById("corpo").style.backgroundColor = "black";
    document.getElementById("corpo").style.textAlign = "center";
    document.getElementById("corpo").style.color = "white";
    document.getElementById("foto").style.border = "1px solid white";
    document.getElementById("foto").style.borderRadius = "10px";
}