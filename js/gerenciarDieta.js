import { Dados } from './dados.js';

// Função de logout (para ser chamada a partir do HTML)
function logout() {
    sessionStorage.removeItem('usuarioLogadoId');
    window.location.href = '../../index.html';
}

// Função para abrir o modal de cadastro de dieta
function abrirModalCadastroDieta() {
    const modal = document.getElementById('modalCadastroDieta');
    modal.style.display = 'block';
}

// Função para fechar o modal de cadastro de dieta
function fecharModalCadastroDieta() {
    const modal = document.getElementById('modalCadastroDieta');
    modal.style.display = 'none';
}

// Função para lidar com a pesquisa
function lidarComPesquisa() {
    const filtro = document.getElementById('searchDieta').value.trim();
    listarDieta(filtro);
}

// Eventos de fechamento do modal ao clicar no "x"
document.getElementById('closeCadastroDieta').addEventListener('click', fecharModalCadastroDieta);

// Evento de submissão do formulário de cadastro
document.getElementById('formCadastroDieta').addEventListener('submit', cadastrarDieta);

// Evento para abrir o modal ao clicar no botão "+"
document.getElementById('btnNovaDieta').addEventListener('click', abrirModalCadastroDieta);

// Evento para fechar o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalCadastroDieta');
    if (event.target == modal) {
        fecharModalCadastroDieta();
    }
});

// Evento para a caixa de pesquisa
document.getElementById('searchDieta').addEventListener('input', lidarComPesquisa);

