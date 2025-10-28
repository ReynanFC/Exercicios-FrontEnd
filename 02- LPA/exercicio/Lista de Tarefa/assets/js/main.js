const inputTarefa = document.querySelector(`#input-tarefa`);
const btnTarefa = document.querySelector(`#btn-tarefa`);
const tarefas = document.querySelector(`#tarefas`);

btnTarefa.addEventListener('click', (e) => {
    if (!inputTarefa.value) return;

    criarTarefa(inputTarefa.value);
    salvarTarefas();

})

inputTarefa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputTarefa.value) {

    criarTarefa(inputTarefa.value);    }

});

// responsável pela funcionalidade do botão apagar
document.addEventListener('click', (e) => {
    const el = e.target; // pegar qual elemento ta sendo clicado
    if (!el.classList.contains('botaoApagar')) return;

    el.parentElement.remove(); // vai pegar a tag pai e vai remover
    
    salvarTarefas(); // pra apagar no json

})

function criarTarefa(textoInput) {
    const li = criarLi();

    li.innerText = textoInput;

    tarefas.appendChild(li);
    limparInput();
    criarBotaoApagar(li);
}

function criarLi() {
    const li = document.createElement('li');
    return li;
}

function limparInput() {
    inputTarefa.value = '';
    inputTarefa.focus(); // (evento HTML) 
}

function criarBotaoApagar(li) {
    // li.innerText += ' '; isso é uma opção sem precisar ajustar no css, pra não deixar grudado
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    
    // botaoApagar.setAttribute('', 'botaoApagar'); exemplo pra colocar id

    botaoApagar.classList.add('botaoApagar');

    li.appendChild(botaoApagar);
    
}

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll(`li`);
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // converto a string em string JSON
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');

    if (!tarefas) return;
    
    const listaDeTarefas = JSON.parse(tarefas); // converter para obj javascript

    for (let tarefa of listaDeTarefas) {
        criarTarefa(tarefa);
    }
}

adicionarTarefasSalvas();