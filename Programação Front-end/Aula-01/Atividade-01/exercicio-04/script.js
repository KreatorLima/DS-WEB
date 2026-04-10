let farenheit = parseFloat(prompt("Digite a temperatura em Fahrenheit:"));
let celsius = (farenheit - 32) * 5 / 9;
alert(`A temperatura em Celsius é: ${celsius.toFixed(2)}°C`);