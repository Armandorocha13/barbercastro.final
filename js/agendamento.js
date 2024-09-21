document.getElementById('formAgendamento').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o envio do formulário

    // Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const pagamento = document.getElementById('pagamento').value;

    // Cria um objeto de agendamento
    const agendamento = {
        nome,
        telefone,
        servico,
        data,
        hora,
        pagamento
    };

    // Carrega os agendamentos existentes do localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Conta quantos agendamentos já existem para a mesma data e hora
    const contagemAgendamentos = agendamentos.filter(a => a.data === data && a.hora === hora).length;

    // Verifica se já existem 2 agendamentos para a mesma data e hora
    if (contagemAgendamentos >= 2) {
        // Exibe a mensagem de indisponibilidade
        const mensagemIndisponivel = document.getElementById('mensagemIndisponivel');
        mensagemIndisponivel.textContent = 'Horário indisponível no momento. Selecione um horário diferente.';
        mensagemIndisponivel.style.display = 'block';

        // Remove a mensagem após alguns segundos
        setTimeout(() => {
            mensagemIndisponivel.style.display = 'none';
        }, 3000); // Esconde após 3 segundos
        return; // Sai da função se a limitação for alcançada
    }

    // Adiciona o agendamento ao localStorage
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    // Exibe a confirmação
    const confirmacaoAgendamento = document.getElementById('confirmacaoAgendamento');
    confirmacaoAgendamento.classList.add('mostra');

    // Remove a animação após a confirmação ser exibida
    setTimeout(() => {
        confirmacaoAgendamento.classList.remove('mostra');
    }, 3000); // Esconde após 3 segundos
});
