const form = document.getElementById('formCadastro')

const mensagem = document.getElementById('mensagem')

form.addEventListener('submit', async (event) => {

    event.preventDefault()

    const nome =
        document.getElementById('nome').value

    const email =
        document.getElementById('email').value

    const senha =
        document.getElementById('senha').value

    const confirmaSenha =
        document.getElementById('confirmarSenha').value

     if(senha!==confirmaSenha){
        mensagem.innerText ='As senhas não coincidem'
        mensagem.style.color ='red'
        return
     }   

    try {

        const resposta = await fetch(
            'https://projeto-fullstack-to-do-list.onrender.com/autenticacao',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    nome,
                    email,
                    senha,
                    confirmaSenha
                })
            }
        )

        const dados = await resposta.json()

        

        if (resposta.ok) {

            mensagem.style.color = 'lightgreen'

            mensagem.innerText = dados.message
            setTimeout(()=>{ window.location.href = "../telalogin/login.html"

            }, 1500)


        } else {
 mensagem.innerText = dados.message
            mensagem.style.color = 'red'
        }

    } catch (error) {

        console.log(error)

        mensagem.innerText =
            'Erro ao conectar com servidor'

        mensagem.style.color = 'red'
    }

})