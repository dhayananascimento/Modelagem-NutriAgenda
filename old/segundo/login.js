// login.js

// Certifique-se de que o script 'usuarios.js' foi importado antes deste script
// Caso não esteja utilizando módulos ES6, o objeto 'usuarios' estará disponível globalmente

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Capturar os valores dos campos
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Procurar o usuário no banco de usuários
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioEncontrado) {
      // Armazenar o tipo de usuário e o nome no localStorage
      localStorage.setItem("tipoUsuario", usuarioEncontrado.tipo);
      localStorage.setItem("nomeUsuario", usuarioEncontrado.nome);

      // Redirecionar com base no tipo de usuário
      if (usuarioEncontrado.tipo === "admin") {
        alert(
          "Login bem-sucedido! Redirecionando para o painel de administração."
        );
        window.location.href = "dashboard_admin.html";
      } else if (usuarioEncontrado.tipo === "nutricionista") {
        alert(
          "Login bem-sucedido! Redirecionando para o dashboard do nutricionista."
        );
        window.location.href = "dashboard_nutricionista.html";
      } else if (usuarioEncontrado.tipo === "paciente") {
        alert(
          "Login bem-sucedido! Redirecionando para o dashboard do paciente."
        );
        window.location.href = "dashboard_paciente.html";
      }
    } else {
      alert("Usuário ou senha incorretos. Por favor, tente novamente.");
    }
  });
