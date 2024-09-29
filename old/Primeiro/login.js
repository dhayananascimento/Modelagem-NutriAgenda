document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Validação básica
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Autenticação simulada
  if (email === "nutricionista@exemplo.com" && password === "senha123") {
    window.location.href = "dashboard_nutricionista.html";
  } else if (email === "paciente@exemplo.com" && password === "senha123") {
    window.location.href = "dashboard_paciente.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
});
