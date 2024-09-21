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

    // Adiciona o agendamento ao localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
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
