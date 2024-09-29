// gerenciar_usuarios.js

// Certifique-se de que o script 'usuarios.js' foi importado antes deste script

// Função para carregar os usuários na tabela
function carregarUsuarios() {
  const tabela = document
    .getElementById("tabelaUsuarios")
    .getElementsByTagName("tbody")[0];
  tabela.innerHTML = ""; // Limpar a tabela antes de carregar os dados

  usuarios.forEach((usuario) => {
    const linha = tabela.insertRow();

    const celulaNome = linha.insertCell(0);
    const celulaEmail = linha.insertCell(1);
    const celulaTipo = linha.insertCell(2);

    celulaNome.textContent = usuario.nome;
    celulaEmail.textContent = usuario.email;
    celulaTipo.textContent =
      usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1);
  });
}

// Carregar os usuários ao carregar a página
window.onload = carregarUsuarios;
