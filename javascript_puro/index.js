import { prompt } from "readline-sync";
import cadastro from './cadastro.js';
import busca from './busca.js'
import editar from './editar.js'
//Menu principal, onde todas as funções serão chamadas
function menu(){
    console.log('|==============================================================|')
    console.log('|------------------  Lista de Compras  ------------------------|')
    console.log('|==============================================================|')
    console.log('|           Olá, seja bem vindo, o que deseja ?                |')
    console.log('|--------------------------------------------------------------|')
    console.log('|          1 --> Cadastrar um item                             |')
    console.log('|          2 --> Verificar itens da lista                      |')
    console.log('|          3 --> Editar ou remover item da lista               |')
    console.log('|          0 --> Encerrar o Programa                           |')
    console.log('|==============================================================|')
    let escolha = Number(prompt())
    switch(escolha){
        case 1:
            return cadastro.janelaCadastro()//adicionar função de cadastrar itens
        case 2:
            return busca.janelaBusca()//adicionar função de verificar itens na lista
        case 3:
            return editar.janelaEditar()//adicionar função de remover itens da lista
        case 0:
            break;//encerrar o programa
        default:
            console.log('Opção inválida, por favor, insira escolha uma opção válida.');
            return menu();
    }
}

export {menu}
menu()