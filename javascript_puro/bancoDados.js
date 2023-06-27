import fs from 'fs';

function lerArquivos(){
    try {
        const lista = JSON.parse(fs.readFileSync('./bd.json'));
        return lista;
      } catch (err) {
        return [];
      }
}

function gravarArquivos(item) {
    const conteudo = item;
    try{
        fs.writeFileSync('./bd.json', JSON.stringify(conteudo));
        return console.log('Item cadastrado com sucesso');
    }catch (error){
        return console.log('Não foi possivel cadastrar seu item');
    }
}

export default {lerArquivos, gravarArquivos}