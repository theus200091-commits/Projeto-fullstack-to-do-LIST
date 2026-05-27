// VERIFICAR SE USUÁRIO ESTÁ LOGADO
function verificarLogin() {
  const token = localStorage.getItem('token');
  const headerNaoLogado = document.getElementById('headerNaoLogado');
  const headerLogado = document.getElementById('headerLogado');
  const inputArea = document.querySelector('.input-area');
  const board = document.querySelector('.board');

  if (token) {
    // USUÁRIO LOGADO
    headerNaoLogado.style.display = 'none';
    headerLogado.style.display = 'flex';
    inputArea.style.display = 'block';
    board.style.display = 'grid';

    // Decodificar token e pegar informações do usuário
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      document.getElementById('usuarioNome').innerHTML = `Bem-vindo! ${payload.email}`;
    } catch (e) {
      console.log('Erro ao decodificar token');
    }
  } else {
    // USUÁRIO NÃO LOGADO
    headerNaoLogado.style.display = 'flex';
    headerLogado.style.display = 'none';
    inputArea.style.display = 'block';
    board.style.display = 'grid';
  }
}

// FUNÇÃO LOGOUT
function logout() {
  localStorage.removeItem('token');
  alert('Logout realizado!');
  window.location.href = '../telalogin/login.html';
}

// Executar verificação ao carregar página
verificarLogin();

let adicionarArray = [];
let fazendoArray = [];
let feitoArray = [];
let historicoArray = []
let listaFazer = document.querySelector('#fazer .lista');
let listaFazendo = document.querySelector('#fazendo .lista');
let listaFeito = document.querySelector('#feito .lista');
let digiteTarefainput = document.getElementById('inputTarefa');

function redenrizarTarefa() {
    listaFazer.innerHTML = '' //Limpa o array e faz com que não duplique as tarefas
    adicionarArray.forEach((item, index) => {
        //criação dos elementos
        let divFazer = document.createElement('div');
        let bPronto = document.createElement('button');
        let bFazendo = document.createElement('button');
        let bRemover = document.createElement('button');
        let bEditar = document.createElement('button');
        let bFazer = document.createElement('button');
        //div onde vai aparecer o conteúdo
        listaFazer.appendChild(divFazer)
        divFazer.style.height = "10%"
        divFazer.style.fontSize = "20px"
        divFazer.innerHTML = `${index} - ${item}.`
        divFazer.style.fontFamily = "Poppins";
        //botao Editar
        divFazer.appendChild(bEditar)
        bEditar.innerHTML = "Editar"
        bEditar.style.marginLeft = "5%"
        bEditar.style.padding="1%"
        bEditar.style.background="darkgrey"
         bEditar.style.color="white"
         bEditar.style.fontFamily = "Poppins";
        bEditar.onclick = () => editarTarefa(index)
        
        //botao Fazendo
        divFazer.appendChild(bFazendo);
        bFazendo.innerHTML = "Fazendo";
        bFazendo.style.marginLeft = "2%"
         bFazendo.style.padding="1%"
          bFazendo.style.background="yellow"
   bFazendo.style.fontFamily = "Poppins";
        bFazendo.onclick = () => fazendo(index);
        //botao Pronto
        divFazer.appendChild(bPronto)
        bPronto.innerHTML = "Pronto"
        bPronto.style.marginLeft = "2%"
         bPronto.style.padding="1%"
         bPronto.style.background="green"
          bPronto.style.color="white"
             bPronto.style.fontFamily = "Poppins";
        bPronto.onclick = () => feitoPrimeiro(index);
        //botao Remover
        divFazer.appendChild(bRemover)
        bRemover.innerHTML = "Remover"
        bRemover.style.marginLeft = "2%"
        bRemover.style.padding="1%"
           bRemover.style.background="red"
           bRemover.style.color="white"
              bRemover.style.fontFamily = "Poppins";
        bRemover.onclick = () => removerTarefa(index)
    })
}
function redenrizarFazendo() {

    listaFazendo.innerHTML = '';
    fazendoArray.forEach((item, index) => {
        //criação dos elementos
        let divFazer = document.createElement('div');
        let bPronto = document.createElement('button');
        let bFazendo = document.createElement('button');
        let bRemover = document.createElement('button');
        let bEditar = document.createElement('button');
        let bFazer = document.createElement('button');
        //div onde vai aparecer o conteúdo
        listaFazendo.appendChild(divFazer)
        divFazer.style.height = "10%"
        divFazer.style.fontSize = "20px"
        divFazer.innerHTML = `${index} - ${item}.`
        //botao Editar
        divFazer.appendChild(bEditar)
        bEditar.innerHTML = "Editar"
        bEditar.style.marginLeft = "5%"
        bEditar.style.padding="1%"
        bEditar.style.background="darkgrey"
         bEditar.style.color="white"
         bEditar.style.fontFamily = "Poppins";
        bEditar.onclick = () => editarTarefaFazendo(index)
        //botao mover para fazer
        divFazer.appendChild(bFazer)
        bFazer.innerHTML = "Fazer"
        bFazer.style.marginLeft = "2%"
        bFazer.style.padding="1%"
        bFazer.style.background="#0f172a"
         bFazer.style.color="white"
         bFazer.style.fontFamily = "Poppins";
        bFazer.onclick = () => moverFazendoParaFazer(index)
        //botao Pronto
        divFazer.appendChild(bPronto)
        bPronto.innerHTML = "Pronto"
        bPronto.style.marginLeft = "2%"
         bPronto.style.padding="1%"
         bPronto.style.background="green"
          bPronto.style.color="white"
             bPronto.style.fontFamily = "Poppins";
        bPronto.onclick = () => feitoSegundo(index);
        //botao Remover
        divFazer.appendChild(bRemover)
        bRemover.innerHTML = "Remover"
        bRemover.style.marginLeft = "2%"
        bRemover.style.padding="1%"
           bRemover.style.background="red"
           bRemover.style.color="white"
              bRemover.style.fontFamily = "Poppins";
        bRemover.onclick = () => removerFazendo(index);
    })
}
function redenrizarFeito() {
    listaFeito.innerHTML = '';
    feitoArray.forEach((item, index) => {
        //criação dos elementos
        let divFazer = document.createElement('div');
        let bPronto = document.createElement('button');
        let bFazendo = document.createElement('button');
        let bRemover = document.createElement('button');
        let bEditar = document.createElement('button');
        let bFazer = document.createElement('button');
        //div onde vai aparecer o conteúdo
        listaFeito.appendChild(divFazer)
        divFazer.style.height = "10%"
        divFazer.style.fontSize = "20px"
        divFazer.innerHTML = `${index} - ${item}.`
        //botao Editar
        divFazer.appendChild(bEditar)
        bEditar.innerHTML = "Editar"
        bEditar.style.marginLeft = "5%"
         bEditar.style.padding="1%"
        bEditar.style.background="darkgrey"
         bEditar.style.color="white"
         bEditar.style.fontFamily = "Poppins";
        bEditar.onclick = () => editarTarefaFeito(index)
         //botao mover para fazer
        divFazer.appendChild(bFazer)
        bFazer.innerHTML ="Fazer"
        bFazer.style.marginLeft = "2%"
         bFazer.style.padding="1%"
        bFazer.style.background="#0f172a"
         bFazer.style.color="white"
         bFazer.style.fontFamily = "Poppins";
        bFazer.onclick = () => feitoParaFazer(index)
        //botao Fazendo
        divFazer.appendChild(bFazendo);
        bFazendo.innerHTML = "Fazendo";
        bFazendo.style.marginLeft = "2%"
        bFazendo.style.padding="1%"
          bFazendo.style.background="yellow"
   bFazendo.style.fontFamily = "Poppins";
        bFazendo.onclick = () => feitoFazendo(index);
        //botao Remover
        divFazer.appendChild(bRemover)
        bRemover.innerHTML = "Remover"
        bRemover.style.marginLeft = "2%"
         bRemover.style.padding="1%"
           bRemover.style.background="red"
           bRemover.style.color="white"
              bRemover.style.fontFamily = "Poppins";
        bRemover.onclick = () => removerFeito(index);
    })
}
function redenrizarHistorico(){
    
}
//Remover
function removerTarefa(index) {
    adicionarArray.splice(index, 1)//Busca no array o indice e remove ele apenas
    redenrizarTarefa()
}
function removerFazendo(index) {
    fazendoArray.splice(index, 1);
    redenrizarFazendo();
}
function removerFeito(index) {
    feitoArray.splice(index, 1);
    redenrizarFeito()
}
//Editar
function editarTarefa(index) {
    let editar = prompt('Edite a tarefa:')
    if (editar === null) {
    } else if (editar.trim() === "") {
        editar = editar.trim()
        alert('Digite um valor valido')

    }
    else {
        adicionarArray[index] = editar
        redenrizarTarefa()
    }
}
function editarTarefaFazendo(index) {
    let editar = prompt('Edite a tarefa:')
    if (editar === null) {
    } else if (editar.trim() === "") {
        editar = editar.trim()
        alert('Digite um valor valido')

    }
    else {
        fazendoArray[index] = editar
        redenrizarFazendo()
    }
}
function editarTarefaFeito(index) {
    let editar = prompt('Edite a tarefa:')
    if (editar === null) {
    } else if (editar.trim() === "") {
        editar = editar.trim()
        alert('Digite um valor valido')

    }
    else {
        feitoArray[index] = editar
        redenrizarFeito()
    }
}
//Mover quadro
function adicionarFazer() {
    let digiteTarefa = document.getElementById('inputTarefa').value;

    if (digiteTarefa.trim() === "") {
        alert('Digite um valor valido: "Lavar carro, limpar casa, pagar conta, etc."')
    } else {
        adicionarArray.push(digiteTarefa); //adiciona a tarefa dentro do array

        digiteTarefainput.value = ""//Limpa o input depois do usuario digitar
        redenrizarTarefa()
    }
}
function fazendo(index) {
    let valor = adicionarArray[index];
    fazendoArray.push(valor);
    adicionarArray.splice(index, 1);
    redenrizarTarefa()
    redenrizarFazendo()
    redenrizarFeito()

}
function feitoPrimeiro(index) {
    let valorFazendo = adicionarArray[index];
    feitoArray.push(valorFazendo)
    adicionarArray.splice(index, 1);
    redenrizarTarefa()
    redenrizarFazendo()
    redenrizarFeito()
}
function feitoSegundo(index) {
    let valorFazendo = fazendoArray[index];
    feitoArray.push(valorFazendo)
    fazendoArray.splice(index, 1);
    redenrizarTarefa()
    redenrizarFazendo()
    redenrizarFeito()
}
//Voltar quadro
function moverFazendoParaFazer(index){
    let deFazendoParaFazer = fazendoArray[index];
    adicionarArray.push(deFazendoParaFazer);
    fazendoArray.splice(index,1);
    redenrizarTarefa()
    redenrizarFazendo()
    redenrizarFeito()

}
function feitoFazendo(index) {
    let deFeitoParaFazendo = feitoArray[index];
    fazendoArray.push(deFeitoParaFazendo);
    feitoArray.splice(index, 1);
    redenrizarTarefa()
    redenrizarFazendo()
    redenrizarFeito()

}

function feitoParaFazer(index) {
    let deFeitoParaFazer = feitoArray[index];
    adicionarArray.push(deFeitoParaFazer);
    feitoArray.splice(index, 1);
    redenrizarTarefa()
    redenrizarFazendo()
    redenrizarFeito()

}