const corpo = document.querySelector('body');
const titulo = document.querySelector('.titulo');
const container = document.querySelector('#container');

corpo.style.backgroundColor = '#d19d18';
corpo.style.color = 'white';
titulo.textContent = 'Adicionando elementos via js';
container.style.width = '94%';
container.style.margin = '0 auto';
container.style.backgroundColor = '#000000';

let anuncio ='<h2>curso dev com iq - novidades</h2>';
container.innerHTML +=anuncio;