let capital = prompt("Digite o valor do capital (C):");
let taxaJuros = prompt("Digite a taxa de juros (i) em porcentagem:");
let tempo = prompt("Digite o tempo (t) em meses:");
capital = parseFloat(capital);
taxaJuros = parseFloat(taxaJuros) / 100;
tempo = parseFloat(tempo);

let montante = capital * (1 + taxaJuros) ** tempo;
alert("O valor do montante (M) é: " + montante.toFixed(2));