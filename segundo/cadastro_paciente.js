document
  .getElementById("cadastroPacienteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Capturar os valores dos campos
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpf").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    // Aqui você pode adicionar validações adicionais, como validação de CPF, telefone, etc.

    // Simulação de cadastro do paciente (aqui você faria a integração com o backend)
    alert("Paciente cadastrado com sucesso!");

    // Limpar o formulário
    document.getElementById("cadastroPacienteForm").reset();

    // Opcionalmente, redirecionar para a lista de pacientes
    // window.location.href = 'pacientes.html';
  });
