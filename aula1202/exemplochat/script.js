document.addEventListener("DOMContentLoaded", function() {

    const titulo = document.getElementById("titulo");
    const btnAddClasse = document.getElementById("btnAddClasse");
    const btnRemoveClasse = document.getElementById("btnRemoveClasse");
    const btnAddAttr = document.getElementById("btnAddAttr");
    const btnRemoveAttr = document.getElementById("btnRemoveAttr");

    // Adicionar classe
    btnAddClasse.addEventListener("click", function() {
        titulo.classList.add("destaque");
    });

    // Remover classe
    btnRemoveClasse.addEventListener("click", function() {
        titulo.classList.remove("destaque");
    });

    // Adicionar atributo
    btnAddAttr.addEventListener("click", function() {
        titulo.setAttribute("title", "Atributo adicionado via DOM!");
        alert("Atributo adicionado!");
    });

    // Remover atributo
    btnRemoveAttr.addEventListener("click", function() {
        titulo.removeAttribute("title");
        alert("Atributo removido!");
    });

});
