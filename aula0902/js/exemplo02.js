let elemento = ' ʕっ• ᴥ • ʔっ';
let nome = 'Oscar';
let resultado = nome + elemento;
let paragrafo = 'O maioral'

let titulo = document.querySelector('.titulo');
titulo.textContent += resultado
let texto = document.querySelector('.texto')
texto.textContent += paragrafo
texto.style.color = '#fff6f6'
texto.style.fontSize = '23px'
let fundo = document.querySelector('.fundo');
fundo.style.backgroundColor = '#cd7c1b';
