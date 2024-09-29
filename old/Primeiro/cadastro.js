document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Captura e validação dos dados
    const nome = document.getElementById("nome").value;
    // Capturar outros campos

    // Simulação de cadastro
    alert("Cadastro realizado com sucesso!");
    window.location.href = "dashboard_nutricionista.html";
  });
