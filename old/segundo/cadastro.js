document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Capturar os valores dos campos
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpf").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const termos = document.getElementById("termos").checked;

    // Validar se as senhas coincidem
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    // Validar se o checkbox foi marcado
    if (!termos) {
      alert("Você deve aceitar os Termos de Uso e a Política de Privacidade.");
      return;
    }

    // Simulação de cadastro (aqui você faria a integração com o backend)
    alert("Cadastro realizado com sucesso!");

    // Redirecionar para a página inicial ou dashboard
    window.location.href = "index.html";
  });
