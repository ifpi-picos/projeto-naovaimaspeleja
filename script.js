// Função para redirecionar para outra página
function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
}

// Seleciona os botões pelo tipo e adiciona um ouvinte de evento para cada um
let buttons = document.querySelectorAll('button[type="button"]');
buttons.forEach(function(button) {
button.addEventListener('click', function() {
    // Chama a função de redirecionamento passando a URL da outa página
    redirectToPage('outra_pagina.html');
});
});