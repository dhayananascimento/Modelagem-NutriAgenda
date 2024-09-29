// usuarios.js

// Banco de usuários em memória
const usuarios = [
  {
    nome: "Administrador",
    email: "admin",
    senha: "admin",
    tipo: "admin", // Pode ser 'admin', 'nutricionista' ou 'paciente'
  },
  {
    nome: "Nutricionista Exemplo",
    email: "nutricionista@exemplo.com",
    senha: "senha123",
    tipo: "nutricionista",
  },
  {
    nome: "Paciente Exemplo",
    email: "paciente@exemplo.com",
    senha: "senha123",
    tipo: "paciente",
  },
];

// Exportar o banco de usuários para ser utilizado em outros scripts
// Se você estiver utilizando módulos ES6
// export { usuarios };
