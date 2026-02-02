// O parseFloat tenta extrair o número do texto. Se começar com letra, retorna NaN(não é um numero).
const prompt = require('prompt-sync')();
let num1 = parseFloat(prompt("Digite o primeiro número:"));
let operacao = prompt("Digite a operação (+, -, *, /):");
let num2 = parseFloat(prompt("Digite o segundo número:"));
let resultado;

// O switch olha para o conteúdo da variável 'operacao'
switch (operacao) {
    case '+':
        resultado = num1 + num2;
        break; // O break impede que ele execute os casos de baixo sem querer
    case '-':
        resultado = num1 - num2;
        break;
    case '*':
        resultado = num1 * num2;
        break;
    case '/':
        // Uso de operador ternário para evitar divisão por zero (muito bom!)
        resultado = num2 !== 0 ? num1 / num2 : "Erro: Divisão por zero";
        break;
    default:
        // Executado se 'operacao' não for nenhum dos símbolos acima
        resultado = "Operação inválida"; 
}


console.log("O resultado é: " + resultado);
