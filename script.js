// Funções para redirecionar para outra página
function redirectToCadastro() {
    window.location.href = "cadastrar_page.html" ;
}

function redirectToLista() {
    window.location.href = "lista_page.html" ;
}

const listaItens = JSON.parse(localStorage.getItem('armazenados')) || [];
//Códigos para página de cadastro

function cadastrar_itens(){
    // Obtém os valores dos campos de input
    let name = document.getElementById(entry_name);
    let price = document.getElementById(entry_price);
    // Obtém o valor selecionado no radio
    let estadoItem;
    let radioComprar = document.getElementById('comprar');
    let radioComprado = document.getElementById('comprado');
    if (radioComprar.checked) {
        estadoItem = 'Para Comprar';
    } else if (radioComprado.checked) {
        estadoItem = 'Já comprei';
    }

    const item = {
        nome: name,
        valor: price,
        estado: estadoItem
      };
      localStorage.setItem('armazenados', JSON.stringify(items))
}