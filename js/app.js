import Usuario from './usuario.js';
import Nutricionista from './nutricionista.js';
import { Dados, gerarIdUnico } from './dados.js';

// DOM 
const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro');
const toggleCadastro = document.getElementById('toggleCadastro');
const toggleLogin = document.getElementById('toggleLogin');

// Alternar entre os formulários
toggleCadastro.addEventListener('click', () => {
    formLogin.classList.remove('active');
    formCadastro.classList.add('active');
});

toggleLogin.addEventListener('click', () => {
    formCadastro.classList.remove('active');
    formLogin.classList.add('active');
});

// Realizar o login
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    try {
        const usuarioData = Usuario.autenticar(email, senha);
        sessionStorage.setItem('usuarioLogadoId', usuarioData.id);

        // Redireciona com base no tipo de usuário
        switch (usuarioData.tipo) {
            case 'nutricionista':
                window.location.href = 'pages/Home/nutricionista.html';
                break;
            case 'paciente':
                window.location.href = 'pages/Home/paciente.html';
                break;
            case 'assistente':
                window.location.href = 'pages/Home/assistente.html';
                break;
            default:
                throw new Error('Tipo de usuário desconhecido.');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Realizar o cadastro
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nomeCadastro').value.trim();
    const email = document.getElementById('emailCadastro').value.trim();
    const senha = document.getElementById('senhaCadastro').value.trim();

    try {
        const dados = Dados.carregarDados();

        // Verifica se o email já está em uso
        if (dados.usuarios.some(u => u.email === email)) {
            throw new Error('Email já está em uso.');
        }

        // Cria um novo nutricionista
        const idNutricionista = gerarIdUnico();
        const novoNutricionista = new Nutricionista(idNutricionista, nome, email, senha);

        // Adiciona ao banco de dados
        dados.usuarios.push({
            id: idNutricionista,
            email: email,
            senha: senha,
            tipo: 'nutricionista'
        });

        dados.nutricionistas.push({
            id: idNutricionista,
            nome: nome,
            email: email,
            senha: senha,
            tipo: 'nutricionista',
            pacientes: [],
            assistentes: []
        });

        // Salva os dados atualizados
        Dados.salvarDados(dados);

        alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
        
        // Limpa o formulário e alterna para o formulário de login
        formCadastro.reset();
        formCadastro.classList.remove('active');
        formLogin.classList.add('active');
    } catch (error) {
        alert(error.message);
    }
});
