// Exemplo de dados de pacientes
const pacientes = [
  { nome: "João Silva", ultimaConsulta: "01/10/2023", status: "Ativo" },
  { nome: "Maria Souza", ultimaConsulta: "15/09/2023", status: "Inativo" },
  // Outros pacientes
];

// Função para carregar pacientes na tabela
function loadPatients() {
  const tableBody = document.getElementById("patientTable");
  tableBody.innerHTML = "";
  pacientes.forEach((paciente, index) => {
    const row = `
            <tr>
                <td>${paciente.nome}</td>
                <td>${paciente.ultimaConsulta}</td>
                <td>${paciente.status}</td>
                <td>
                    <button class="btn btn-info btn-sm">Visualizar</button>
                    <button class="btn btn-warning btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Excluir</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

// Chamar a função ao carregar a página
window.onload = loadPatients;
