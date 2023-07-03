// Funções para redirecionar para outra página
function redirectToCadastro() {
    window.location.href = "cadastrar_page.html" ;
}

function redirectToLista() {
    window.location.href = "lista_page.html" ;
}

const listaItens = JSON.parse(localStorage.getItem('armazenados')) || [];
//Códigos para página de cadastro

function validarCampos() {
  // Obtém os valores dos campos de input
  let name = document.getElementById('entry_name').value;
  let price = document.getElementById('entry_price').value;
  let radioComprar = document.getElementById('comprar');
  let radioComprado = document.getElementById('comprado');
  
  // Verifica se algum campo está vazio
  if (name === '' || price === '' || (radioComprar.checked === false && radioComprado.checked === false)) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
      return;
  }
  
  // Todos os campos estão preenchidos, chama a função cadastrar_itens()
  cadastrar_itens();
}

function cadastrar_itens(){
    // Obtém os valores dos campos de input
    let name = document.getElementById('entry_name').value;
    let price = document.getElementById('entry_price').value;
    // Obtém o valor selecionado no radio
    let estadoItem;
    let radioComprar = document.getElementById('comprar');
    let radioComprado = document.getElementById('comprado');
    if (radioComprar.checked) {
        estadoItem = 'Quero Comprar';
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
    
    // Limpa os campos de input
        document.getElementById('entry_name').value = '';
        document.getElementById('entry_price').value = '';
        radioComprar.checked = false;
        radioComprado.checked = false;
}

function exibirItens() {
    if (!localStorage.getItem('armazenados')) {
      // Cria um array vazio e armazena no localStorage
      localStorage.setItem('armazenados', JSON.stringify([]));
    }
    // Obtém a referência do corpo da tabela
    let tbody = document.querySelector('.itens_table tbody');

    // Limpa o corpo da tabela
    tbody.innerHTML = '';
    // Obtém a referência da tabela
    let tabela = document.querySelector('.itens_table');

    // Obtém os itens armazenados no localStorage
    let itensArmazenados = JSON.parse(localStorage.getItem('armazenados')) || [];

    // Verifica se existem itens para exibir
    if (itensArmazenados.length === 0) {
      let mensagem = document.createElement('tr');
      mensagem.classList.add('item-row');
      mensagem.innerHTML = '<td colspan="4">Nenhum item cadastrado.</td>';
      tabela.appendChild(mensagem);
      return;
    }
    // Cria as linhas da tabela para cada item
    for (let i = 0; i < itensArmazenados.length; i++) {
      let item = itensArmazenados[i];
      let linha = document.createElement('tr');
      linha.classList.add('item-row'); // Adiciona a classe CSS
      linha.setAttribute('data-index', i); // Atribui o data-index para a linha
      linha.innerHTML =
        '<td>' +
        item.nome +
        '</td>' +
        '<td>' +
        item.valor +
        '</td>' +
        '<td>' +
        item.estado +
        '</td>' +
        '<td>' +
        '<button onclick="removerItem(' +
        i +
        ')">Remover</button>' +
        '<button onclick="abrirFormulario(' +
        i +
        ')">Editar</button>' +
        '</td>';

      tabela.appendChild(linha);
    }
}

exibirItens();
  
// Função para remover um item da lista
function removerItem(index) {
    let itensArmazenados = JSON.parse(localStorage.getItem('armazenados')) || [];
    // Remove o item do array
    itensArmazenados.splice(index, 1);
    // Salva o array atualizado no localStorage
    localStorage.setItem('armazenados', JSON.stringify(itensArmazenados));
    // Encontra a linha da tabela pelo data-index e remove-a
    let linhas = document.querySelectorAll('.itens_table tbody tr');
    linhas.forEach((linha) => {
      let dataIndex = parseInt(linha.getAttribute('data-index'));
      if (dataIndex === index) {
        linha.remove();
      }
    });
    // Atualiza a exibição da tabela
    location.reload();
}

function abrirFormulario(index) {
    let itensArmazenados = JSON.parse(localStorage.getItem('armazenados')) || [];
    let item = itensArmazenados[index];
    document.getElementById('edit_form').setAttribute('data-index', index);
    // Preenche os campos com as informações do item
    document.getElementById('entry_name').value = item.nome;
    document.getElementById('entry_price').value = item.valor;
    if (item.estado === 'Para Comprar') {
      document.getElementById('comprar').checked = true;
    } else if (item.estado === 'Já comprei') {
      document.getElementById('comprado').checked = true;
    }
    // Exibe o formulário de edição
    let popupContainer = document.querySelector('.popup-container');
    popupContainer.style.display = 'flex';
}

function fecharFormulario() {
    // Limpa os campos do formulário
    document.getElementById('entry_name').value = '';
    document.getElementById('entry_price').value = '';
    document.getElementById('comprar').checked = false;
    document.getElementById('comprado').checked = false;
    // Fecha o formulário de edição
    let popupContainer = document.querySelector('.popup-container');
    popupContainer.style.display = 'none';
}

function salvarEdicoes() {
    let itensArmazenados = JSON.parse(localStorage.getItem('armazenados')) || [];
    let index = parseInt(document.getElementById('edit_form').getAttribute('data-index'));
  
    // Atualiza as informações do item com base nos campos de input
    itensArmazenados[index].nome = document.getElementById('entry_name').value;
    itensArmazenados[index].valor = document.getElementById('entry_price').value;
    itensArmazenados[index].estado = document.getElementById('comprar').checked ? 'Para Comprar' : 'Já comprei';
  
    // Salva o array atualizado no localStorage
    localStorage.setItem('armazenados', JSON.stringify(itensArmazenados));
  
    // Fecha o formulário de edição
    fecharFormulario();
  
    // Atualiza a exibição da tabela
    location.reload();
}