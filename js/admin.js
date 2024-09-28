
// Exemplo de dados de serviços realizados e preços
const servicos = {
    "corteSimples": 20,
    "corteNavalhado": 25,
    "corteBarba": 35,
    "reflexoPintura": 40,
    "pezinho": 10
};

const agendamentos = [
    { nome: "João", telefone: "123456789", servico: "corteSimples", data: "2023-09-21", hora: "10:00", pagamento: "pix", finalizado: false },
    { nome: "Maria", telefone: "987654321", servico: "corteBarba", data: "2023-09-21", hora: "11:00", pagamento: "dinheiro", finalizado: false },
    // Adicione mais agendamentos conforme necessário
];

function carregarAgendamentos() {
    const tbody = document.getElementById('listaAgendamentos').querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o tbody antes de adicionar os agendamentos
    agendamentos.forEach((agendamento, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.telefone}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>${agendamento.pagamento}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="finalizarServico(${index})">Finalizar</button>
                <button class="btn btn-danger btn-sm" onclick="cancelarServico(${index})">Cancelar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function finalizarServico(index) {
    if (!agendamentos[index].finalizado) {
        agendamentos[index].finalizado = true;
        atualizarRelatorioLucro(servicos[agendamentos[index].servico], true);
        agendamentos.splice(index, 1); // Remove o agendamento da lista
        carregarAgendamentos(); // Atualiza a tabela
    }
}

function cancelarServico(index) {
    if (!agendamentos[index].finalizado) {
        atualizarRelatorioLucro(servicos[agendamentos[index].servico], false);
        agendamentos.splice(index, 1); // Remove o agendamento da lista
        carregarAgendamentos(); // Atualiza a tabela
    }
}

function atualizarRelatorioLucro(valor, finalizar) {
    const lucroTotalElement = document.getElementById('lucroTotal');
    let lucroAtual = parseFloat(lucroTotalElement.textContent.replace(/[^0-9.-]+/g, "")) || 0;

    if (finalizar) {
        lucroAtual += valor; // Adiciona o valor ao lucro total
    } else {
        lucroAtual -= valor; // Subtrai o valor do lucro total
    }

    lucroTotalElement.textContent = `Lucro Total do Dia: R$ ${lucroAtual.toFixed(2)}`;
    document.getElementById('relatorioLucro').style.display = 'block'; // Exibe o relatório
}

document.getElementById('gerarRelatorio').addEventListener('click', function() {
    const dataAtual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    let lucroTotal = 0;

    agendamentos.forEach(agendamento => {
        if (agendamento.data === dataAtual && agendamento.finalizado) {
            lucroTotal += servicos[agendamento.servico];
        }
    });

    document.getElementById('lucroTotal').textContent = `Lucro Total do Dia (${dataAtual}): R$ ${lucroTotal.toFixed(2)}`;
    document.getElementById('relatorioLucro').style.display = 'block'; // Exibe o relatório
});

// Carrega os agendamentos ao iniciar a página
carregarAgendamentos();
