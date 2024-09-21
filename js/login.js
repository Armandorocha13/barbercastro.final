document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    // Verifica as credenciais
    if (usuario === 'admin' && senha === '123456') {
        sessionStorage.setItem('auth', 'true'); // Armazena autenticação
        window.location.href = 'admin.html'; // Redireciona para a página de administração
    } else {
        const mensagemErro = document.getElementById('mensagemErro');
        mensagemErro.style.display = 'block'; // Exibe a mensagem de erro
    }
});
