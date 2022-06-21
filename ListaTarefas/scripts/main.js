const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criarLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e){
    if(e.KeyCode === 13){
        if(!inputTarefa.value) return;
        criarTarefa(inputTarefa.value);
    }
    //console.log(e); //Para vê qual tecla foi pressionada, no caso a tecla 13 = tecla Enter
});

function limparInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function CriarBotaoApagar(li){
    li.innerText += ' '; //Para da um espaço
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
   //botaoApagar.classList.add('apagar');
   botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar);
}

function criarTarefa(textoInput){
    const li = criarLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limparInput();
    CriarBotaoApagar(li);
    salvarTarefas();
    //console.log(textoInput);
}

btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
    //console.log(inputTarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target;
    //console.log(el);

    if(el.classList.contains('apagar')){
        (el.parentElement).remove();
        salvarTarefas();
        //Do meu elemento o pai dele eserá removido, consequentemente ele tambem é removido pois é o filho!
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li'); //Quero pegar os textos dos li
    const listaDeTarefas = []; //Array vazio

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText; //Trim para tira o espaço em branco
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim; //Chamei o replace para substituir Apagar para nada, assim a palavra apagar não aparece na minha tela!!!
        listaDeTarefas.push(tarefaTexto); //Push para jogar dentro da tarefa Texto
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //Converti JSON em string
    localStorage.setItem('tarefas', tarefasJSON); //Para recuperar essas tarefas depois, o nome que quero recuperar é tarefas e o valor é tarefasJSON
} //localStorage é global do navegador

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); //Convertendo para um ARRAY
    //console.log(listaDeTarefas);

    for( let tarefas of listaDeTarefas){
        criarTarefa(tarefa);
    }
}

addTarefasSalvas();