import { prompt } from "readline-sync"
import { menu } from "./index.js";
import bd from './bancoDados.js';

function janelaBusca() {
    const dados = bd.lerArquivos();
    console.log(`
================================================================
-----------------------     BUSCA   ----------------------------
================================================================
`);
    if(dados.length===0){
        console.log('Não há itens cadastrados!')
    }else{
        const escolha = escolherBusca()
        const itensExibir = dados.filter((item) => item.estado == escolha )
        if (itensExibir.length===0){
            console.log('Não há itens cadastrados!')
        }else{
            itensExibir.sort((a,b) => a.nome - b.nome);
            for(let i=0; i<itensExibir.length; i++){
                console.log(`
        |--------------------------------------|
        | Item: ${itensExibir[i].nome}         
        |--------------------------------------|
        | Valor: R$ ${itensExibir[i].valor}    
        |--------------------------------------|
        | Estado: ${itensExibir[i].estado}     
        |--------------------------------------|
        `)
        }
        }
        return confirmacao();
    }
}

function escolherBusca(){
    console.log('|------------------------------------------|');
    console.log('|   Qual lista de produtos deseja ver?     |');
    console.log('|------------------------------------------|');
    console.log('|        Para COMPRADO, presse 1           |');
    console.log('|------------------------------------------|');
    console.log('|       Para item a COMPRAR, presse 0      |');
    console.log('|------------------------------------------|');
    
    let escolha = Number(prompt())
    switch(escolha){
        case 1:
            return 'COMPRADO'
        case 0:
            return 'COMPRAR'
        default:
            console.log('Opção inválida, tente novamente');
            return escolherBusca();
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
            return janelaBusca();
        case 2:
            return menu();
        default:
            console.log('Opção inválida, tente novamente.');
        return confirmacao();
    }
}

export default {janelaBusca}