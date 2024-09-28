// Função para carregar a lista de agendamentos
function carregarAgendamentos() {
    const listaAgendamentos = document.getElementById('listaAgendamentos').getElementsByTagName('tbody')[0];
    listaAgendamentos.innerHTML = ''; // Limpa a lista antes de carregar

    // Carregar agendamentos do localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    agendamentos.forEach((agendamento, index) => {
        if (agendamento.status !== 'finalizado') { // Exibir apenas os agendamentos não finalizados
            const row = document.createElement('tr');

            // Cria o link para WhatsApp com o número e mensagem predefinida
            const linkWhatsApp = `https://wa.me/${agendamento.telefone}?text=Olá%20${agendamento.nome}%2C%20seu%20agendamento%20para%20${agendamento.servico}%20em%20${agendamento.data}%20às%20${agendamento.hora}%20foi%20confirmado.`;

            row.innerHTML = `
                <td>${agendamento.nome}</td>
                <td>
                    <a href="${linkWhatsApp}" target="_blank">
                        <button class="btn btn-success">Enviar WhatsApp</button>
                    </a>
                </td>
                <td>${agendamento.servico}</td>
                <td>${agendamento.data}</td>
                <td>${agendamento.hora}</td>
                <td>${agendamento.pagamento}</td>
                <td>
                    <button class="btn btn-warning" onclick="finalizarAgendamento(${index})">Finalizar</button>
                    <button class="btn btn-danger" onclick="excluirAgendamento(${index})">Excluir</button>
                </td>
            `;
            listaAgendamentos.appendChild(row);
        }
    });
}

// Função para excluir um agendamento da lista
function excluirAgendamento(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.splice(index, 1); // Remove o agendamento do array
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Atualiza o localStorage
    carregarAgendamentos(); // Recarrega a lista de agendamentos para refletir a remoção
}

// Função para finalizar um agendamento (remove da lista)
function finalizarAgendamento(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos[index].status = 'finalizado'; // Marca o agendamento como finalizado
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Atualiza o localStorage
    carregarAgendamentos(); // Recarrega a lista de agendamentos, ocultando o finalizado
}

// Carrega os agendamentos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarAgendamentos);
