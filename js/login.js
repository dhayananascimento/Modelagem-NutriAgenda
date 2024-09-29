import Usuario from './usuario.js';
import { Dados, gerarIdUnico } from './dados.js';
import Nutricionista from './nutricionista.js';

// DOM
const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro');
const btnCadastro = document.getElementById('btnCadastro');
const modalCadastro = document.getElementById('modalCadastro');
const closeCadastro = document.getElementById('closeCadastro');

// Função para abrir o modal de cadastro
btnCadastro.addEventListener('click', () => {
    modalCadastro.style.display = 'block';
});

// Função para fechar o modal de cadastro
closeCadastro.addEventListener('click', () => {
    modalCadastro.style.display = 'none';
});

// Fecha o modal se o usuário clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target == modalCadastro) {
        modalCadastro.style.display = 'none';
    }
});

// Função de login
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    try {
        const usuarioData = Usuario.autenticar(email, senha);

        // Armazenar o ID do usuário logado
        sessionStorage.setItem('usuarioLogadoId', usuarioData.id);

        // Redirecionar para a página correta
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

// Função de cadastro
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nomeCadastro').value.trim();
    const email = document.getElementById('emailCadastro').value.trim();
    const senha = document.getElementById('senhaCadastro').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    // Validações básicas
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const dados = Dados.carregarDados();

        // Verifica se o email já está em uso
        if (dados.usuarios.some(u => u.email === email)) {
            throw new Error('Email já está em uso.');
        }

        const idNutricionista = gerarIdUnico();
        const novoNutricionista = new Nutricionista(idNutricionista, nome, email, senha);

        // Adiciona o nutricionista ao banco de dados
        dados.usuarios.push({
            id: novoNutricionista.id,
            email: novoNutricionista.email,
            senha: novoNutricionista.senha,
            tipo: novoNutricionista.tipo
        });

        dados.nutricionistas.push({
            id: novoNutricionista.id,
            nome: novoNutricionista.nome,
            email: novoNutricionista.email,
            senha: novoNutricionista.senha,
            tipo: novoNutricionista.tipo,
            pacientes: novoNutricionista.pacientes,
            assistentes: novoNutricionista.assistentes
        });

        // Salva os dados atualizados
        Dados.salvarDados(dados);

        alert('Cadastro realizado com sucesso! Você pode agora fazer login.');

        // Limpa o formulário de cadastro
        formCadastro.reset();

        // Fecha o modal de cadastro
        modalCadastro.style.display = 'none';
    } catch (error) {
        alert(error.message);
    }
});
