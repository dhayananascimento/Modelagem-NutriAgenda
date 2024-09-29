import { Dados } from './dados.js';

// Função de logout (para ser chamada a partir do HTML)
function logout() {
    sessionStorage.removeItem('usuarioLogadoId');
    window.location.href = '../../index.html';
}

// Função para abrir o modal de cadastro de avaliacao
function abrirModalCadastroAvaliacao() {
    const modal = document.getElementById('modalCadastroAvaliacao');
    modal.style.display = 'block';
}

// Função para fechar o modal de cadastro de avaliacao
function fecharModalCadastroAvaliacao() {
    const modal = document.getElementById('modalCadastroAvaliacao');
    modal.style.display = 'none';
}

// Função para lidar com a pesquisa
function lidarComPesquisa() {
    const filtro = document.getElementById('searchAvaliacao').value.trim();
    listarAvaliacao(filtro);
}

// Eventos de fechamento do modal ao clicar no "x"
document.getElementById('closeCadastroAvaliacao').addEventListener('click', fecharModalCadastroAvaliacao);

// Evento de submissão do formulário de cadastro
document.getElementById('formCadastroAvaliacao').addEventListener('submit', cadastrarAvaliacao);

// Evento para abrir o modal ao clicar no botão "+"
document.getElementById('btnNovaAvaliacao').addEventListener('click', abrirModalCadastroAvaliacao);

// Evento para fechar o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalCadastroAvaliacao');
    if (event.target == modal) {
        fecharModalCadastroAvaliacao();
    }
});

// Evento para a caixa de pesquisa
document.getElementById('searchAvaliacao').addEventListener('input', lidarComPesquisa);

