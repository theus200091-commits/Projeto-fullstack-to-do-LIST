function entrarConta(){

  let email = document.getElementById('inputEmail').value;
  let senha = document.getElementById('inputSenha').value;
  const mensagem = document.getElementById('mensagem');

  if(email === '' || senha === ''){
    mensagem.innerText = 'Preencha email e senha';
    mensagem.style.color = 'red';
    return;
  }

  try {
    fetch('https://projeto-fullstack-to-do-list.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        senha
      })
    })
    .then(resposta => resposta.json())
    .then(dados => {
      if(dados.token) {
        mensagem.innerText = 'Login realizado com sucesso!';
        mensagem.style.color = 'lightgreen';
        localStorage.setItem('token', dados.token);
        setTimeout(() => {
          window.location.href = '../To do list/todo.html';
        }, 1500);
      } else {
        mensagem.innerText = dados.message || 'Erro ao fazer login';
        mensagem.style.color = 'red';
      }
    })
    .catch(error => {
      console.log(error);
      mensagem.innerText = 'Erro ao conectar com servidor';
      mensagem.style.color = 'red';
    });
  } catch(error) {
    console.log(error);
    mensagem.innerText = 'Erro ao conectar com servidor';
    mensagem.style.color = 'red';
  }

}