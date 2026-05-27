
// VERIFICAR LOGIN

function verificarLogin() {

    const token = localStorage.getItem('token');

    const headerNaoLogado =
    document.getElementById('headerNaoLogado');

    const headerLogado =
    document.getElementById('headerLogado');

    if (token) {

        headerNaoLogado.style.display = 'none';
        headerLogado.style.display = 'flex';

        try {

            const payload =
            JSON.parse(
                atob(token.split('.')[1])
            );

            document.getElementById(
                'usuarioNome'
            ).innerHTML =
            `Bem-vindo! ${payload.email}`;

        }

        catch (e) {

            console.log(e);

        }

    }

}

// LOGOUT

function logout() {

    localStorage.removeItem('token');

    window.location.href =
    '../telalogin/login.html';

}

verificarLogin();

// LISTAS

let adicionarArray = [];
let fazendoArray = [];
let feitoArray = [];

let listaFazer =
document.querySelector('#fazer .lista');

let listaFazendo =
document.querySelector('#fazendo .lista');

let listaFeito =
document.querySelector('#feito .lista');

// BUSCAR TAREFAS

async function buscarTarefas() {

    try {

        const token =
        localStorage.getItem('token');

        const resposta =
        await fetch(
            'http://localhost:3002/tarefas',
            {

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }
        );

        const tarefas =
        await resposta.json();

        adicionarArray =
        tarefas.filter(
            tarefa =>
            tarefa.status === 'fazer'
        );

        fazendoArray =
        tarefas.filter(
            tarefa =>
            tarefa.status === 'fazendo'
        );

        feitoArray =
        tarefas.filter(
            tarefa =>
            tarefa.status === 'feito'
        );

        redenrizarTarefa();
        redenrizarFazendo();
        redenrizarFeito();

    }

    catch (error) {

        console.log(
            'Erro ao buscar tarefas',
            error
        );

    }

}

// ADICIONAR

async function adicionarFazer() {

    const input =
    document.getElementById(
        'inputTarefa'
    );

    const titulo =
    input.value;

    if (titulo.trim() === '') {

        return alert(
            'Digite uma tarefa'
        );

    }

    try {

        const token =
        localStorage.getItem('token');

        await fetch(
            'http://localhost:3002/tarefas',
            {

                method: 'POST',

                headers: {

                    'Content-Type':
                    'application/json',

                    Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({

                    titulo

                })

            }
        );

        input.value = '';

        buscarTarefas();

    }

    catch (error) {

        console.log(error);

    }

}

// REMOVER

async function removerTarefa(id) {

    try {

        const token =
        localStorage.getItem('token');

        await fetch(
            `http://localhost:3002/tarefas/${id}`,
            {

                method: 'DELETE',

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }
        );

        buscarTarefas();

    }

    catch (error) {

        console.log(error);

    }

}

// EDITAR

async function editarTarefa(id, tituloAtual) {

    const novoTitulo =
    prompt(
        'Editar tarefa:',
        tituloAtual
    );

    if (
        !novoTitulo ||
        novoTitulo.trim() === ''
    ) {

        return;

    }

    try {

        const token =
        localStorage.getItem('token');

        await fetch(
            `http://localhost:3002/tarefas/${id}`,
            {

                method: 'PUT',

                headers: {

                    'Content-Type':
                    'application/json',

                    Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({

                    titulo: novoTitulo

                })

            }
        );

        buscarTarefas();

    }

    catch (error) {

        console.log(error);

    }

}

// STATUS

async function atualizarStatus(
    id,
    novoStatus
) {

    try {

        const token =
        localStorage.getItem('token');

        await fetch(
            `http://localhost:3002/tarefas/${id}`,
            {

                method: 'PUT',

                headers: {

                    'Content-Type':
                    'application/json',

                    Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({

                    status: novoStatus

                })

            }
        );

        buscarTarefas();

    }

    catch (error) {

        console.log(error);

    }

}

// RENDER FAZER

function redenrizarTarefa() {

    listaFazer.innerHTML = '';

    adicionarArray.forEach((item) => {

        let div =
        document.createElement('div');

        let bEditar =
        document.createElement('button');

        let bRemover =
        document.createElement('button');

        let bFazendo =
        document.createElement('button');

        let bPronto =
        document.createElement('button');

        div.innerHTML =
        item.titulo;

        bEditar.innerHTML =
        'Editar';

        bEditar.onclick = () =>
        editarTarefa(
            item._id,
            item.titulo
        );

        bRemover.innerHTML =
        'Remover';

        bRemover.onclick = () =>
        removerTarefa(
            item._id
        );

        bFazendo.innerHTML =
        'Fazendo';

        bFazendo.onclick = () =>
        atualizarStatus(
            item._id,
            'fazendo'
        );

        bPronto.innerHTML =
        'Pronto';

        bPronto.onclick = () =>
        atualizarStatus(
            item._id,
            'feito'
        );

        div.appendChild(bEditar);
        div.appendChild(bRemover);
        div.appendChild(bFazendo);
        div.appendChild(bPronto);

        listaFazer.appendChild(div);

    });

}

// RENDER FAZENDO

function redenrizarFazendo() {

    listaFazendo.innerHTML = '';

    fazendoArray.forEach((item) => {

        let div =
        document.createElement('div');

        let bEditar =
        document.createElement('button');

        let bRemover =
        document.createElement('button');

        let bFazer =
        document.createElement('button');

        let bPronto =
        document.createElement('button');

        div.innerHTML =
        item.titulo;

        bEditar.innerHTML =
        'Editar';

        bEditar.onclick = () =>
        editarTarefa(
            item._id,
            item.titulo
        );

        bRemover.innerHTML =
        'Remover';

        bRemover.onclick = () =>
        removerTarefa(
            item._id
        );

        bFazer.innerHTML =
        'Fazer';

        bFazer.onclick = () =>
        atualizarStatus(
            item._id,
            'fazer'
        );

        bPronto.innerHTML =
        'Pronto';

        bPronto.onclick = () =>
        atualizarStatus(
            item._id,
            'feito'
        );

        div.appendChild(bEditar);
        div.appendChild(bRemover);
        div.appendChild(bFazer);
        div.appendChild(bPronto);

        listaFazendo.appendChild(div);

    });

}

// RENDER FEITO

function redenrizarFeito() {

    listaFeito.innerHTML = '';

    feitoArray.forEach((item) => {

        let div =
        document.createElement('div');

        let bEditar =
        document.createElement('button');

        let bRemover =
        document.createElement('button');

        let bFazer =
        document.createElement('button');

        let bFazendo =
        document.createElement('button');

        div.innerHTML =
        item.titulo;

        bEditar.innerHTML =
        'Editar';

        bEditar.onclick = () =>
        editarTarefa(
            item._id,
            item.titulo
        );

        bRemover.innerHTML =
        'Remover';

        bRemover.onclick = () =>
        removerTarefa(
            item._id
        );

        bFazer.innerHTML =
        'Fazer';

        bFazer.onclick = () =>
        atualizarStatus(
            item._id,
            'fazer'
        );

        bFazendo.innerHTML =
        'Fazendo';

        bFazendo.onclick = () =>
        atualizarStatus(
            item._id,
            'fazendo'
        );

        div.appendChild(bEditar);
        div.appendChild(bRemover);
        div.appendChild(bFazer);
        div.appendChild(bFazendo);

        listaFeito.appendChild(div);

    });

}

buscarTarefas();