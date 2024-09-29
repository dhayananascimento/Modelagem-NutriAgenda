// js/nutricionista-page.js

import { Dados } from './dados.js';
import Nutricionista from './nutricionista.js';
import Usuario from './usuario.js';

// Variáveis Globais
let nutricionista;

// Função de logout
function logout() {
    sessionStorage.removeItem('usuarioLogadoId');
    window.location.href = '../../index.html';
}

// Função para carregar os dados do nutricionista logado
document.addEventListener('DOMContentLoaded', () => {
    const usuarioId = sessionStorage.getItem('usuarioLogadoId');
    if (!usuarioId) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '../../index.html';
        return;
    }

    const dados = Dados.carregarDados();
    const nutricionistaData = dados.nutricionistas.find(n => n.id === usuarioId);

    if (nutricionistaData) {
        nutricionista = new Nutricionista(
            nutricionistaData.id,
            nutricionistaData.nome,
            nutricionistaData.email,
            nutricionistaData.senha
        );
        nutricionista.pacientes = nutricionistaData.pacientes;
        nutricionista.assistentes = nutricionistaData.assistentes;

        // Exibir o nome do nutricionista na interface
        document.getElementById('nomeNutricionista').innerText = nutricionista.nome;

        // Atualizar os totais de pacientes e assistentes
        document.getElementById('totalPacientes').innerText = nutricionista.pacientes.length;
        document.getElementById('totalAssistentes').innerText = nutricionista.assistentes.length;
    } else {
        alert('Dados do nutricionista não encontrados.');
        window.location.href = '../../index.html';
    }
});

// Seleciona os elementos do DOM
const btnGerenciarUsuario = document.getElementById('btnGerenciarUsuario');
const modalSelecao = document.getElementById('modalSelecao');
const modalPaciente = document.getElementById('modalPaciente');
const modalAssistente = document.getElementById('modalAssistente');
const closeSelecao = document.getElementById('closeSelecao');
const closePaciente = document.getElementById('closePaciente');
const closeAssistente = document.getElementById('closeAssistente');
const btnCadastrarPaciente = document.getElementById('btnCadastrarPaciente');
const btnCadastrarAssistente = document.getElementById('btnCadastrarAssistente');
const formPaciente = document.getElementById('formPaciente');
const formAssistente = document.getElementById('formAssistente');

// Função para abrir um modal
function abrirModal(modal) {
    modal.style.display = 'block';
}

// Função para fechar um modal
function fecharModal(modal) {
    modal.style.display = 'none';
}

// Eventos para abrir e fechar os modais
btnGerenciarUsuario.addEventListener('click', () => {
    abrirModal(modalSelecao);
});

closeSelecao.addEventListener('click', () => fecharModal(modalSelecao));

btnCadastrarPaciente.addEventListener('click', () => {
    fecharModal(modalSelecao);
    abrirModal(modalPaciente);
});

btnCadastrarAssistente.addEventListener('click', () => {
    fecharModal(modalSelecao);
    abrirModal(modalAssistente);
});

closePaciente.addEventListener('click', () => fecharModal(modalPaciente));
closeAssistente.addEventListener('click', () => fecharModal(modalAssistente));

// Fecha os modais se o usuário clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target == modalSelecao) {
        fecharModal(modalSelecao);
    }
    if (event.target == modalPaciente) {
        fecharModal(modalPaciente);
    }
    if (event.target == modalAssistente) {
        fecharModal(modalAssistente);
    }
});

// Função para cadastrar paciente
formPaciente.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nomePaciente').value;
    const email = document.getElementById('emailPaciente').value;
    const senha = document.getElementById('senhaPaciente').value;

    try {
        nutricionista.cadastrarPaciente(nome, email, senha);
        alert('Paciente cadastrado com sucesso!');
        // Limpar o formulário
        formPaciente.reset();
        fecharModal(modalPaciente);

        // Atualizar o total de pacientes
        document.getElementById('totalPacientes').innerText = nutricionista.pacientes.length;
    } catch (error) {
        alert(error.message);
    }
});

// Função para cadastrar assistente
formAssistente.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nomeAssistente').value;
    const email = document.getElementById('emailAssistente').value;
    const senha = document.getElementById('senhaAssistente').value;

    try {
        nutricionista.cadastrarAssistente(nome, email, senha);
        alert('Assistente cadastrado com sucesso!');
        // Limpar o formulário
        formAssistente.reset();
        fecharModal(modalAssistente);

        // Atualizar o total de assistentes
        document.getElementById('totalAssistentes').innerText = nutricionista.assistentes.length;
    } catch (error) {
        alert(error.message);
    }
});

// Função de logout (necessário no HTML)
window.logout = logout;
