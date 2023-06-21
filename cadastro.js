import bd from './bancoDados.js';
import { menu } from './index.js';
import { prompt } from 'readline-sync';

function janelaCadastro() {
    console.log(`
================================================================
-----------------------  CADASTRO   ----------------------------
================================================================
`);
        let lista = bd.lerArquivos();
        lista.push(cadastrarItem());
        bd.gravarArquivos(lista);
    return confirmacao();
}

function cadastrarItem(){
    console.log('| Insira os dados correspondentes ao seu produto:  |');
    const nomeProduto = receberNome();
    const valorProduto = receberValor();
    const estadoProduto = receberEstado();
    const produto = {
        nome: nomeProduto,
        valor: valorProduto,
        estado: estadoProduto
    }
    return produto;
}

function receberNome(){
    console.log('|           Informe o nome do produto:             |');
    let name = prompt();
    return name;
}
function receberValor(){
    console.log('|          Informe quanto custa o produto:         |');
    let preco = Number(prompt());
    if(isNaN(preco)){
        while(isNaN(preco)){
            console.log('Por favor insira um valor válido:\nObs: apenas numeros e pontos.');
            preco = Number(prompt());
        }
    }
    return preco;
}

function receberEstado(){
    console.log('   |------------------------------------------|');
    console.log('   |     Qual estado do seu produto?          |');
    console.log('   |------------------------------------------|');
    console.log('   |        Para COMPRADO, presse 1           |');
    console.log('   |------------------------------------------|');
    console.log('   |       Para item a COMPRAR, presse 0      |');
    console.log('   |------------------------------------------|');

    let escolha = Number(prompt())
    switch(escolha){
        case 1:
            return 'COMPRADO';
        case 0:
            return 'COMPRAR';
        default:
            console.log('Opção inválida, tente novamente');
            return receberEstado();
    }
}

function confirmacao(){
    console.log(`
    |------------------------------------------|
    |     Para repetir a operação, presse 1    |
    |------------------------------------------|
    |  Para voltar ao menu principal, presse 2 |
    |------------------------------------------|
    |   Para sair do aplicativo, presse 0      |
    |------------------------------------------|
    `);
    let escolha = Number(prompt())
    switch(escolha){
        case 0:
            return false;
        case 1:
            return janelaCadastro();
        case 2:
            return menu();
        default:
            console.log('Opção inválida, tente novamente.');
        return confirmacao();
    }
}

export default {janelaCadastro}