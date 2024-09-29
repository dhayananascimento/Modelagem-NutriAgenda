import { Dados } from './dados.js';
import Nutricionista from './nutricionista.js';
import Assistente from './assistente.js';
import { gerarIdUnico } from './dados.js';
// Variável Global para armazenar o nutricionista logado
let nutricionistaLogado;

// Função de logout (para ser chamada a partir do HTML)
function logout() {
    sessionStorage.removeItem('usuarioLogadoId');
    window.location.href = '../../index.html';
}

// Função para carregar o nutricionista logado
function carregarNutricionista() {
    const usuarioId = sessionStorage.getItem('usuarioLogadoId');
    if (!usuarioId) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '../../index.html';
        return;
    }

    const dados = Dados.carregarDados();
    const nutricionistaData = dados.nutricionistas.find(n => n.id === usuarioId);

    if (nutricionistaData) {
        nutricionistaLogado = new Nutricionista(
            nutricionistaData.id,
            nutricionistaData.nome,
            nutricionistaData.email,
            nutricionistaData.senha
        );
        nutricionistaLogado.pacientes = nutricionistaData.pacientes;
        nutricionistaLogado.assistentes = nutricionistaData.assistentes;
    } else {
        alert('Dados do nutricionista não encontrados.');
        window.location.href = '../../index.html';
    }
}

// Função para listar os assistentes na tabela
function listarAssistentes(filtro = '') {
    const dados = Dados.carregarDados();
    const tabelaAssistentes = document.getElementById('tabelaAssistentes').getElementsByTagName('tbody')[0];

    // Limpar tabela antes de listar
    tabelaAssistentes.innerHTML = '';

    // Iterar sobre os assistentes do nutricionista
    nutricionistaLogado.assistentes.forEach(assistenteId => {
        const assistenteData = dados.assistentes.find(a => a.id === assistenteId);
        if (assistenteData) {
            // Verificar se o nome do assistente corresponde ao filtro
            if (assistenteData.nome.toLowerCase().includes(filtro.toLowerCase())) {
                const row = tabelaAssistentes.insertRow();

                const cellNome = row.insertCell(0);
                const cellAcoes = row.insertCell(1);

                cellNome.textContent = assistenteData.nome;

                // Container para os ícones de ação
                const acoesDiv = document.createElement('div');
                acoesDiv.className = 'acoes';


                // Ícone de Editar
                const btnEditar = document.createElement('i');
                btnEditar.className = 'fa-solid fa-edit';
                btnEditar.setAttribute('data-tooltip', 'Editar');
                btnEditar.addEventListener('click', () => editarAssistente(assistenteData.id));
                acoesDiv.appendChild(btnEditar);

                // Ícone de Excluir
                const btnExcluir = document.createElement('i');
                btnExcluir.className = 'fa-solid fa-trash-alt';
                btnExcluir.setAttribute('data-tooltip', 'Excluir');
                btnExcluir.addEventListener('click', () => removerAssistente(assistenteData.id));
                acoesDiv.appendChild(btnExcluir);

                cellAcoes.appendChild(acoesDiv);
            }
        }
    });
}

// Função para abrir o modal de cadastro de assistente
function abrirModalCadastroAssistente() {
    const modal = document.getElementById('modalCadastroAssistente');
    modal.style.display = 'block';
}

// Função para fechar o modal de cadastro de assistente
function fecharModalCadastroAssistente() {
    const modal = document.getElementById('modalCadastroAssistente');
    modal.style.display = 'none';
}

// Função para cadastrar um novo assistente
function cadastrarAssistente(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeAssistente').value.trim();
    const email = document.getElementById('emailAssistente').value.trim();
    const cpf = document.getElementById('cpfAssistente').value.trim();
    const dataNascimento = document.getElementById('dataNascimentoAssistente').value;
    const telefone = document.getElementById('telefoneAssistente').value.trim();
    const cep = document.getElementById('cepAssistente').value.trim();
    const estado = document.getElementById('estadoAssistente').value.trim();
    const cidade = document.getElementById('cidadeAssistente').value.trim();
    const bairro = document.getElementById('bairroAssistente').value.trim();
    const rua = document.getElementById('ruaAssistente').value.trim();
    const numero = document.getElementById('numeroAssistente').value.trim();
    const complemento = document.getElementById('complementoAssistente').value.trim();

    // Validações básicas
    if (!nome || !email || !cpf || !dataNascimento || !telefone || !cep || !estado || !cidade || !bairro || !rua || !numero) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    try {
        const novoAssistente = new Assistente(
            gerarIdUnico(),
            nome,
            email,
            'senhaPadrao', // Em produção, defina uma senha segura ou envie via email
            nutricionistaLogado.id,
            cpf,
            dataNascimento,
            telefone,
            cep,
            estado,
            cidade,
            bairro,
            rua,
            numero,
            complemento
        );

        // Adiciona o assistente ao banco de dados via Nutricionista
        nutricionistaLogado.cadastrarAssistente(
            nome,
            email,
            'senhaPadrao' // Em produção, trate a senha de forma segura
        );

        alert('Assistente cadastrado com sucesso!');

        // Atualizar a tabela de assistentes
        listarAssistentes(document.getElementById('searchAssistente').value.trim());

        // Fechar o modal e limpar o formulário
        fecharModalCadastroAssistente();
        document.getElementById('formCadastroAssistente').reset();
    } catch (error) {
        alert(error.message);
    }
}

// Função para editar um assistente (a implementar conforme necessidade)
function editarAssistente(assistenteId) {
    // Implementar funcionalidade de edição
    alert(`Função de editar assistente com ID: ${assistenteId} ainda não implementada.`);
}

// Função para remover um assistente
function removerAssistente(assistenteId) {
    if (confirm('Tem certeza que deseja remover este assistente?')) {
        const dados = Dados.carregarDados();

        // Remover do array de assistentes do nutricionista
        nutricionistaLogado.assistentes = nutricionistaLogado.assistentes.filter(id => id !== assistenteId);

        // Atualizar o nutricionista no banco de dados
        const indexNutri = dados.nutricionistas.findIndex(n => n.id === nutricionistaLogado.id);
        if (indexNutri !== -1) {
            dados.nutricionistas[indexNutri].assistentes = nutricionistaLogado.assistentes;
        }

        // Remover o assistente dos dados gerais
        dados.assistentes = dados.assistentes.filter(a => a.id !== assistenteId);

        // Salvar os dados atualizados
        Dados.salvarDados(dados);

        alert('Assistente removido com sucesso!');

        // Atualizar a tabela de assistentes
        listarAssistentes(document.getElementById('searchAssistente').value.trim());
    }
}

// Função para gerenciar atendimento (a implementar conforme necessidade)
function gerenciarAtendimento(assistenteId) {
    // Implementar funcionalidade de gerenciamento de atendimento para assistentes
    alert(`Função de gerenciar atendimento para o assistente com ID: ${assistenteId} ainda não implementada.`);
}

// Função para lidar com a pesquisa
function lidarComPesquisa() {
    const filtro = document.getElementById('searchAssistente').value.trim();
    listarAssistentes(filtro);
}

// Eventos de fechamento do modal ao clicar no "x"
document.getElementById('closeCadastroAssistente').addEventListener('click', fecharModalCadastroAssistente);

// Evento de submissão do formulário de cadastro
document.getElementById('formCadastroAssistente').addEventListener('submit', cadastrarAssistente);

// Evento para abrir o modal ao clicar no botão "+"
document.getElementById('btnNovoAssistente').addEventListener('click', abrirModalCadastroAssistente);

// Evento para fechar o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalCadastroAssistente');
    if (event.target == modal) {
        fecharModalCadastroAssistente();
    }
});

// Evento para a caixa de pesquisa
document.getElementById('searchAssistente').addEventListener('input', lidarComPesquisa);

// Carregar os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarNutricionista();
    listarAssistentes();
});
