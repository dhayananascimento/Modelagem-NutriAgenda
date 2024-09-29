// Exemplo de dados de dietas
const dietas = [
  {
    paciente: "João Silva",
    refeicoes: ["Café da Manhã", "Almoço", "Jantar"],
    calorias: 2000,
    validade: "01/10/2023 - 31/10/2023",
  },
  // Outras dietas
];

// Função para carregar dietas
function loadDiets() {
  const dietList = document.getElementById("dietList");
  dietList.innerHTML = "";
  dietas.forEach((dieta, index) => {
    const dietCard = `
            <div class="card mb-3">
                <div class="card-header">
                    Dieta de ${dieta.paciente}
                </div>
                <div class="card-body">
                    <p>Refeições: ${dieta.refeicoes.join(", ")}</p>
                    <p>Calorias: ${dieta.calorias}</p>
                    <p>Validade: ${dieta.validade}</p>
                    <button class="btn btn-warning btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Excluir</button>
                </div>
            </div>
        `;
    dietList.innerHTML += dietCard;
  });
}

// Chamar a função ao carregar a página
window.onload = loadDiets;
