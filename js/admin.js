// Exemplo de dados de serviços realizados e preços
const servicos = {
    "corteSimples": 20,
    "corteNavalhado": 25,
    "corteBarba": 35,
    "reflexoPintura": 40,
    "pezinho": 10
};

// Carrega os agendamentos do localStorage
function carregarAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const tbody = document.getElementById('listaAgendamentos').querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o tbody antes de adicionar os agendamentos

    agendamentos.forEach((agendamento, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="enviarWhatsApp('${agendamento.telefone}', '${agendamento.data}', '${agendamento.hora}')">Enviar Mensagem</button>
            </td>
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

// Função para enviar mensagem via WhatsApp
function enviarWhatsApp(telefone, data, hora) {
    const mensagem = encodeURIComponent(`Olá! Deseja confirmar presença no agendamento para o dia ${data} às ${hora}?`);
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
}

// Função para finalizar um serviço
function finalizarServico(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    
    // Aqui você pode adicionar lógica para atualizar o lucro, se necessário
    const servico = agendamentos[index].servico;
    // Por exemplo, atualizar o lucro total, se você estiver gerenciando isso.

    agendamentos.splice(index, 1); // Remove o agendamento da lista
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Atualiza o localStorage
    carregarAgendamentos(); // Atualiza a tabela
}

// Função para cancelar um serviço
function cancelarServico(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.splice(index, 1); // Remove o agendamento da lista
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Atualiza o localStorage
    carregarAgendamentos(); // Atualiza a tabela
}

// Carrega os agendamentos ao iniciar a página
carregarAgendamentos();
