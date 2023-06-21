import bd from './bancoDados.js';
import { menu } from './index.js';
import { prompt } from 'readline-sync';

function janelaEditar(){
    console.log(`
================================================================
-----------------------    EDITAR   ----------------------------
================================================================
`); 
    const dados = bd.lerArquivos();
    if(dados.length ===0){
        console.log('Não há arquivos armazenados no momento')
        return menu();
    }
    console.log('Os itens armazenados na sua lista de compra são:\n');
    for(let i=0; i< dados.length; i++){
    console.log(`${i+1} -> ${dados[i].nome}`);
    }
    console.log('\n');
    editarRemover();
    return confirmacao()
}

function editando(){
    const dados = bd.lerArquivos();
    console.log('Digite o numero do item que você deseja modificar segundo a lista anterior:')
    let index = Number(prompt())-1;
    console.log(`
    O que você deseja editar:
    |-------------------------------|
    |       Nome -> press 1         |
    |-------------------------------|
    |       Valor -> press 2        |
    |-------------------------------|
    |       Estado -> press 3       |
    |-------------------------------|
`)
        let escolha = Number(prompt());
        if(escolha < 1 || escolha > 3 ||isNaN(escolha)){
            while(escolha < 1 || escolha > 3 ||isNaN(escolha)){
                console.log('Insira uma opção válida:');
                escolha = Number(prompt());
            }
        }
        if(escolha === 1){
            console.log(`O nome atual do item é: ${dados[index].nome}`);
            console.log(`Insira o nome alterado:`);
            dados[index].nome = prompt();
            bd.gravarArquivos(dados)
        }else if(escolha ===2){
            console.log(`O valor atual do item é: ${dados[index].valor}`);
            console.log(`Insira o novo valor:`);
            dados[index].valor = Number(prompt());
            bd.gravarArquivos(dados)
        }else{
            console.log(`O estado atual do item é: ${dados[index].estado}`);
            if(dados[index].estado === 'COMPRAR'){
                dados[index].estado = 'COMPRADO'
            }else{
                dados[index].estado = 'COMPRAR'
            }
            console.log(`O novo estado do produto é: ${dados[index].estado}`);
            bd.gravarArquivos(dados)
        }
    return confirmacaoEdit();
}

function removendo(){
    const dados = bd.lerArquivos();
    console.log('Digite o numero do item que você deseja remover segundo a lista anterior:')
    let index = Number(prompt())-1;
    dados.splice(index, 1);
    bd.gravarArquivos(dados);
    return confirmacaoRemover();
}

function editarRemover(){
    console.log(`
|----------------------------------------------------------------|
|   Presse 1 para editar      |      Presse 2 para remover       |
|----------------------------------------------------------------|
`);
    let escolha = Number(prompt());
    switch(escolha){
        case 1:
            return editando();
        case 2:
            return removendo();
        default:
            console.log('Opção inválida, tente novamente');
            return  editarRemover();
    }
}

function confirmacaoRemover(){
    console.log(`
    |------------------------------------------|
    |     Para repetir a operação, presse 1    |
    |------------------------------------------|
    |  Para voltar ao menu de edição, presse 2 |
    |------------------------------------------|
    |   Para voltar ao menu, presse 0          |
    |------------------------------------------|
    `);
    let escolha = Number(prompt())
    switch(escolha){
        case 0:
            return menu();
        case 1:
            return removendo();
        case 2:
            return janelaEditar();
        default:
            console.log('Opção inválida, tente novamente.');
        return confirmacaoEdit();
    }
}

function confirmacaoEdit(){
    console.log(`
    |------------------------------------------|
    |     Para repetir a operação, presse 1    |
    |------------------------------------------|
    |  Para voltar ao menu de edição, presse 2 |
    |------------------------------------------|
    |   Para voltar ao menu, presse 0          |
    |------------------------------------------|
    `);
    let escolha = Number(prompt())
    switch(escolha){
        case 0:
            return menu();
        case 1:
            return editando();
        case 2:
            return janelaEditar();
        default:
            console.log('Opção inválida, tente novamente.');
        return confirmacaoEdit();
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
            return janelaEditar();
        case 2:
            return menu();
        default:
            console.log('Opção inválida, tente novamente.');
        return confirmacao();
    }
}

export default {janelaEditar}