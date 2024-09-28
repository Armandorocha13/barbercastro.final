document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o envio do formulário

    // Captura as credenciais
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    // Verifica se as credenciais estão corretas
    if (usuario === 'admin' && senha === '123456') {
        sessionStorage.setItem('loggedIn', 'true'); // Armazena o estado de login
        window.location.href = 'admin.html'; // Redireciona para o painel de administração
    } else {
        // Se as credenciais estiverem incorretas, exibe uma mensagem de erro
        const mensagemErro = document.getElementById('mensagemErro');
        mensagemErro.textContent = 'Usuário ou senha incorretos.';
        mensagemErro.style.display = 'block';
    }
});
