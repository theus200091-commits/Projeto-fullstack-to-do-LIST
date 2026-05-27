```js id="qk9r7v"
// ===============================
// VERIFICAR LOGIN
// ===============================

function verificarLogin() {

    const token = localStorage.getItem('token');

    const headerNaoLogado =
    document.getElementById('headerNaoLogado');

    const headerLogado =
    document.getElementById('headerLogado');

    const inputArea =
    document.querySelector('.input-area');

    const board =
    document.querySelector('.board');

    if (token) {

        headerNaoLogado.style.display = 'none';

        headerLogado.style.display = 'flex';

        inputArea.style.display = 'block';

        board.style.display = 'grid';

        try {

            const payload =
            JSON.parse(atob(token.split('.')[1]));

            document.getElementById('usuarioNome')
            .innerHTML =
            `Bem - vindo! ${ payload.email } `;

        }

        catch (e) {

            console.log('Erro ao decodificar token');

        }

    }

    else {

        headerNaoLogado.style.display = 'flex';

        headerLogado.style.display = 'none';

        inputArea.style.display = 'none';

        board.style.display = 'none';

    }

}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem('token');

    alert('Logout realizado!');

    window.location.href =
    '../telalogin/login.html';

}


// ===============================
// ELEMENTOS HTML
// ===============================

let tarefas = [];

let listaFazer =
document.querySelector('#fazer .lista');

let listaFazendo =
document.querySelector('#fazendo .lista');

let listaFeito =
document.querySelector('#feito .lista');

let digiteTarefainput =
document.getElementById('inputTarefa');


// ===============================
// BUSCAR TAREFAS
// ===============================

async function buscarTarefas() {

    try {

        const token =
        localStorage.getItem("token");

        const resposta = await fetch(
            "http://localhost:3000/tarefas",
            {

                headers: {
                    Authorization:
                    `Bearer ${ token } `
                }

            }
        );

        tarefas = await resposta.json();

        renderizarTarefas();

    }

    catch (erro) {

        console.log(
            "Erro ao buscar tarefas",
            erro
        );

    }

}


// ===============================
// RENDERIZAR TAREFAS
// ===============================

function renderizarTarefas() {

    listaFazer.innerHTML = '';

    listaFazendo.innerHTML = '';

    listaFeito.innerHTML = '';

    tarefas.forEach((tarefa) => {

        // DIV PRINCIPAL
        let div =
        document.createElement('div');

        div.style.height = "10%";

        div.style.fontSize = "20px";

        div.style.fontFamily = "Poppins";

        div.style.marginBottom = "10px";

        div.innerHTML = tarefa.titulo;


        // =========================
        // BOTÃO EDITAR
        // =========================

        let bEditar =
        document.createElement('button');

        bEditar.innerHTML = "Editar";

        bEditar.style.marginLeft = "5%";

        bEditar.style.padding = "1%";

        bEditar.style.background =
        "darkgrey";

        bEditar.style.color = "white";

        bEditar.onclick =
        () => editarTarefa(tarefa._id);


        // =========================
        // BOTÃO FAZENDO
        // =========================

        let bFazendo =
        document.createElement('button');

        bFazendo.innerHTML = "Fazendo";

        bFazendo.style.marginLeft = "2%";

        bFazendo.style.padding = "1%";

        bFazendo.style.background =
        "yellow";

        bFazendo.onclick =
        () => atualizarStatus(
            tarefa._id,
            "fazendo"
        );


        // =========================
        // BOTÃO FAZER
        // =========================

        let bFazer =
        document.createElement('button');

        bFazer.innerHTML = "Fazer";

        bFazer.style.marginLeft = "2%";

        bFazer.style.padding = "1%";

        bFazer.style.background =
        "#0f172a";

        bFazer.style.color = "white";

        bFazer.onclick =
        () => atualizarStatus(
            tarefa._id,
            "fazer"
        );


        // =========================
        // BOTÃO PRONTO
        // =========================

        let bPronto =
        document.createElement('button');

        bPronto.innerHTML = "Pronto";

        bPronto.style.marginLeft = "2%";

        bPronto.style.padding = "1%";

        bPronto.style.background =
        "green";

        bPronto.style.color = "white";

        bPronto.onclick =
        () => atualizarStatus(
            tarefa._id,
            "feito"
        );


        // =========================
        // BOTÃO REMOVER
        // =========================

        let bRemover =
        document.createElement('button');

        bRemover.innerHTML = "Remover";

        bRemover.style.marginLeft = "2%";

        bRemover.style.padding = "1%";

        bRemover.style.background =
        "red";

        bRemover.style.color = "white";

        bRemover.onclick =
        () => removerTarefa(tarefa._id);


        // =========================
        // ADICIONAR BOTÕES
        // =========================

        div.appendChild(bEditar);

        div.appendChild(bFazer);

        div.appendChild(bFazendo);

        div.appendChild(bPronto);

        div.appendChild(bRemover);


        // =========================
        // STATUS
        // =========================

        if (tarefa.status === "fazer") {

            listaFazer.appendChild(div);

        }

        else if (
            tarefa.status === "fazendo"
        ) {

            listaFazendo.appendChild(div);

        }

        else if (
            tarefa.status === "feito"
        ) {

            listaFeito.appendChild(div);

        }

    });

}


// ===============================
// ADICIONAR TAREFA
// ===============================

async function adicionarFazer() {

    let digiteTarefa =
    digiteTarefainput.value;

    if (digiteTarefa.trim() === "") {

        alert(
            'Digite uma tarefa válida'
        );

        return;

    }

    try {

        const token =
        localStorage.getItem("token");

        await fetch(
            "http://localhost:3000/tarefas",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${ token } `

                },

                body: JSON.stringify({

                    titulo: digiteTarefa

                })

            }
        );

        digiteTarefainput.value = "";

        buscarTarefas();

    }

    catch (erro) {

        console.log(
            "Erro ao adicionar tarefa",
            erro
        );

    }

}


// ===============================
// ATUALIZAR STATUS
// ===============================

async function atualizarStatus(
    id,
    status
) {

    try {

        const token =
        localStorage.getItem("token");

        await fetch(
            `http://localhost:3000/tarefas/${id}`,
{

    method: "PUT",

        headers: {

        "Content-Type":
        "application/json",

            Authorization:
        `Bearer ${token}`

    },

    body: JSON.stringify({

        status: status

    })

}
        );

buscarTarefas();

    }

    catch (erro) {

    console.log(
        "Erro ao atualizar tarefa",
        erro
    );

}

}


// ===============================
// REMOVER TAREFA
// ===============================

async function removerTarefa(id) {

    try {

        const token =
            localStorage.getItem("token");

        await fetch(
            `http://localhost:3000/tarefas/${id}`,
            {

                method: "DELETE",

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }
        );

        buscarTarefas();

    }

    catch (erro) {

        console.log(
            "Erro ao remover tarefa",
            erro
        );

    }

}


// ===============================
// EDITAR TAREFA
// ===============================

async function editarTarefa(id) {

    let editar =
        prompt('Edite a tarefa');

    if (
        editar === null ||
        editar.trim() === ""
    ) {

        alert('Digite um valor válido');

        return;

    }

    try {

        const token =
            localStorage.getItem("token");

        await fetch(
            `http://localhost:3000/tarefas/${id}`,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`

                },

                body: JSON.stringify({

                    titulo: editar

                })

            }
        );

        buscarTarefas();

    }

    catch (erro) {

        console.log(
            "Erro ao editar tarefa",
            erro
        );

    }

}


verificarLogin();

buscarTarefas();

