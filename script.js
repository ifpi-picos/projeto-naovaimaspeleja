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
    let name = document.getElementById('entry_name').value;
    let price = document.getElementById('entry_price').value;
    // Obtém o valor selecionado no radio
    let estadoItem;
    let radioComprar = document.getElementById('comprar');
    let radioComprado = document.getElementById('comprado');
    if (radioComprar.checked) {
        estadoItem = 'Para Comprar';
    } else if (radioComprado.checked) {
        estadoItem = 'Já comprei';
    }
    //armazena os campos preenchidos no item 
    const item = {
        nome: name,
        valor: price,
        estado: estadoItem
    };
    //armazena o item no localstorage
    listaItens.push(item)
    localStorage.setItem('armazenados', JSON.stringify(listaItens))
    limpar_input()
}

// Limpa os campos de input
function limpar_input (){
    let radioComprar = document.getElementById('comprar');
    let radioComprado = document.getElementById('comprado');
    radioComprar.checked = false;
    radioComprado.checked = false;
}

// function exibirItens() {
//     // Obtém a referência da tabela
//     let tabela = document.querySelector('.itens_table');

//     // Obtém os itens armazenados no localStorage
//     let itensArmazenados = JSON.parse(localStorage.getItem('armazenados')) || [];
  
//     // Verifica se existem itens para exibir
//     if (armazenados.length === 0) {
//       let mensagem = document.createElement('tr');
//       mensagem.innerHTML = '<td colspan="4">Nenhum item cadastrado.</td>';
//       tabela.appendChild(mensagem);
//       return;
//     }
//     // Cria as linhas da tabela para cada item
//     for (let i = 0; i < itensArmazenados.length; i++) {
//       let item = itensArmazenados[i];
//       let linha = document.createElement('tr');
//       linha.innerHTML = '<td>' + item.nome + '</td>' +
//                         '<td>' + item.valor + '</td>' +
//                         '<td>' + item.estado + '</td>' +
//                         '<td><button onclick="removerItem(' + i + ')">Remover</button></td>';
  
//       tabela.appendChild(linha);
//     }
// }
//   // Função para remover um item da lista
//     function removerItem(index) {
//         let itensArmazenados = JSON.parse(localStorage.getItem('armazenados')) || [];
//         // Remove o item do array
//         itensArmazenados.splice(index, 1);
//         // Salva o array atualizado no localStorage
//         localStorage.setItem('armazenados', JSON.stringify(itensArmazenados));
//         // Atualiza a exibição da tabela
//         exibirItens();
// }