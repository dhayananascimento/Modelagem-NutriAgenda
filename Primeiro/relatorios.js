// Exemplo de dados
const progresso = {
  peso: [70, 68, 67, 65],
  datas: ["01/07/2023", "01/08/2023", "01/09/2023", "01/10/2023"],
};

// Configuração do gráfico
const ctx = document.getElementById("progressChart").getContext("2d");
const progressChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: progresso.datas,
    datasets: [
      {
        label: "Peso (kg)",
        data: progresso.peso,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  },
  options: {
    // Opções do gráfico
  },
});
