// Exemplo de dados de serviços realizados e preços
const servicos = {
    "corteSimples": 20,
    "corteNavalhado": 25,
    "corteBarba": 35,
    "reflexoPintura": 40,
    "pezinho": 10
};


let lucroTotal = 0; // Variável para armazenar o lucro total acumulado

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
        atualizarRelatorioLucro(servicos[agendamentos[index].servico], true); // Atualiza o lucro total
        agendamentos.splice(index, 1); // Remove o agendamento da lista
        carregarAgendamentos(); // Atualiza a tabela de agendamentos
        exibirRelatorioLucro(); // Exibe o relatório atualizado com o lucro total acumulado
    }
}

function cancelarServico(index) {
    if (!agendamentos[index].finalizado) {
        agendamentos.splice(index, 1); // Remove o agendamento da lista
        carregarAgendamentos(); // Atualiza a tabela
    }
}

function atualizarRelatorioLucro(valor, finalizar) {
    if (finalizar) {
        lucroTotal += valor; // Acumula o valor no lucro total
    }

    exibirRelatorioLucro(); // Chama a função para exibir o relatório atualizado
}

function exibirRelatorioLucro() {
    const lucroTotalElement = document.getElementById('lucroTotal');
    lucroTotalElement.textContent = `Lucro Total do Dia: R$ ${lucroTotal.toFixed(2)}`;
    document.getElementById('relatorioLucro').style.display = 'block'; // Exibe o relatório
}

// Carrega os agendamentos ao iniciar a página
carregarAgendamentos();
