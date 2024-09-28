// Função para finalizar um serviço
function finalizarServico(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Aqui você pode adicionar lógica para atualizar o lucro, se necessário
    const servico = agendamentos[index].servico;
    // Por exemplo, atualizar o lucro total, se você estiver gerenciando isso.

    agendamentos.splice(index, 1); // Remove o agendamento da lista
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Atualiza o localStorage
    carregarAgendamentos(); // Atualiza a tabela
@@ -60,5 +55,29 @@ function cancelarServico(index) {
    carregarAgendamentos(); // Atualiza a tabela
}


// Gera relatório diário de lucro
document.getElementById('gerarRelatorio').addEventListener('click', function() {
    const dataAtual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    let lucroTotal = 0;
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    agendamentos.forEach(agendamento => {
        if (agendamento.data === dataAtual) {
            lucroTotal += servicos[agendamento.servico] || 0; // Adiciona o valor do serviço ao lucro total
        }
    });

    document.getElementById('lucroTotal').textContent = `Lucro Total do Dia (${dataAtual}): R$ ${lucroTotal.toFixed(2)}`;
    document.getElementById('relatorioLucro').style.display = 'block'; // Exibe o relatório
});

if (!sessionStorage.getItem('auth')) {
    // Redireciona para a página de login se não estiver autenticado
    window.location.href = 'login.html';
}



// Carrega os agendamentos ao iniciar a página
carregarAgendamentos();
