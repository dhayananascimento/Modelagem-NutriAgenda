import { Dados } from './dados.js';
import Nutricionista from './nutricionista.js';
import Paciente from './paciente.js';

// Variável Global para armazenar o nutricionista logado
let nutricionistaLogado;

// Função de logout (para ser chamada a partir do HTML)
function logout() {
    sessionStorage.removeItem('usuarioLogadoId');
    window.location.href = '../../index.html';
}

// Função para carregar o nutricionista logado
function  carregarNutricionista() {
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


// Função para listar os pacientes na tabela
function listarPacientes(filtro = '') {
    const dados = Dados.carregarDados();
    const tabelaPacientes = document.getElementById('tabelaPacientes').getElementsByTagName('tbody')[0];

    // Limpar tabela antes de listar
    tabelaPacientes.innerHTML = '';

    // Iterar sobre os pacientes do nutricionista
    nutricionistaLogado.pacientes.forEach(pacienteId => {
        const pacienteData = dados.pacientes.find(p => p.id === pacienteId);
        if (pacienteData) {
            // Verificar se o nome do paciente corresponde ao filtro
            if (pacienteData.nome.toLowerCase().includes(filtro.toLowerCase())) {
                const row = tabelaPacientes.insertRow();

                const cellNome = row.insertCell(0);
                const cellAcoes = row.insertCell(1);

                cellNome.textContent = pacienteData.nome;

                // Container para os ícones de ação
                const acoesDiv = document.createElement('div');
                acoesDiv.className = 'acoes';

                // Ícone de Gerenciar Atendimento
                const btnGerenciar = document.createElement('i');
                btnGerenciar.className = 'fa-solid fa-hands-helping';
                btnGerenciar.setAttribute('data-tooltip', 'Gerenciar Atendimento');
                btnGerenciar.addEventListener('click', () => gerenciarAtendimento(pacienteData.id));
                acoesDiv.appendChild(btnGerenciar);

                // Ícone de Editar
                const btnEditar = document.createElement('i');
                btnEditar.className = 'fa-solid fa-edit';
                btnEditar.setAttribute('data-tooltip', 'Editar');
                btnEditar.addEventListener('click', () => editarPaciente(pacienteData.id));
                acoesDiv.appendChild(btnEditar);

                // Ícone de Excluir
                const btnExcluir = document.createElement('i');
                btnExcluir.className = 'fa-solid fa-trash-alt';
                btnExcluir.setAttribute('data-tooltip', 'Excluir');
                btnExcluir.addEventListener('click', () => removerPaciente(pacienteData.id));
                acoesDiv.appendChild(btnExcluir);

                cellAcoes.appendChild(acoesDiv);
            }
        }
    });
}

// Função para abrir o modal de cadastro de paciente
function abrirModalCadastroPaciente() {
    const modal = document.getElementById('modalCadastroPaciente');
    modal.style.display = 'block';
}

// Função para fechar o modal de cadastro de paciente
function fecharModalCadastroPaciente() {
    const modal = document.getElementById('modalCadastroPaciente');
    modal.style.display = 'none';
}

// Função para cadastrar um novo paciente
function cadastrarPaciente(event) {
    event.preventDefault();

    const nome = document.getElementById('nomePaciente').value.trim();
    const email = document.getElementById('emailPaciente').value.trim();
    const cpf = document.getElementById('cpfPaciente').value.trim();
    const dataNascimento = document.getElementById('dataNascimentoPaciente').value;
    const telefone = document.getElementById('telefonePaciente').value.trim();
    const cep = document.getElementById('cepPaciente').value.trim();
    const estado = document.getElementById('estadoPaciente').value.trim();
    const cidade = document.getElementById('cidadePaciente').value.trim();
    const bairro = document.getElementById('bairroPaciente').value.trim();
    const rua = document.getElementById('ruaPaciente').value.trim();
    const numero = document.getElementById('numeroPaciente').value.trim();
    const complemento = document.getElementById('complementoPaciente').value.trim();

    // Validações básicas
    if (!nome || !email || !cpf || !dataNascimento || !telefone || !cep || !estado || !cidade || !bairro || !rua || !numero) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    try {
        const novoPaciente = new Paciente(
            gerarIdUnico(),
            nome,
            email,
            'senhaPadrao', 
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

        // Adiciona o paciente ao banco de dados via Nutricionista
        nutricionistaLogado.cadastrarPaciente(
            nome,
            email,
            'senhaPadrao'
        );

        alert('Paciente cadastrado com sucesso!');

        // Atualizar a tabela de pacientes
        listarPacientes(document.getElementById('searchPaciente').value.trim());

        // Fechar o modal e limpar o formulário
        fecharModalCadastroPaciente();
        document.getElementById('formCadastroPaciente').reset();
    } catch (error) {
        alert(error.message);
    }
}

// Função para editar um paciente (a implementar conforme necessidade)
function editarPaciente(pacienteId) {
    // Implementar funcionalidade de edição
    alert(`Função de editar paciente com ID: ${pacienteId} ainda não implementada.`);
}

// Função para remover um paciente
function removerPaciente(pacienteId) {
    if (confirm('Tem certeza que deseja remover este paciente?')) {
        const dados = Dados.carregarDados();

        // Remover do array de pacientes do nutricionista
        nutricionistaLogado.pacientes = nutricionistaLogado.pacientes.filter(id => id !== pacienteId);

        // Atualizar o nutricionista no banco de dados
        const indexNutri = dados.nutricionistas.findIndex(n => n.id === nutricionistaLogado.id);
        if (indexNutri !== -1) {
            dados.nutricionistas[indexNutri].pacientes = nutricionistaLogado.pacientes;
        }

        // Remover o paciente dos dados gerais
        dados.pacientes = dados.pacientes.filter(p => p.id !== pacienteId);

        // Salvar os dados atualizados
        Dados.salvarDados(dados);

        alert('Paciente removido com sucesso!');

        // Atualizar a tabela de pacientes
        listarPacientes(document.getElementById('searchPaciente').value.trim());
    }
}

// Função para gerenciar atendimento (a implementar conforme necessidade)
function gerenciarAtendimento(pacienteId) {
    // Implementar funcionalidade de gerenciamento de atendimento
    alert(`Função de gerenciar atendimento para o paciente com ID: ${pacienteId} ainda não implementada.`);
}

// Função para lidar com a pesquisa
function lidarComPesquisa() {
    const filtro = document.getElementById('searchPaciente').value.trim();
    listarPacientes(filtro);
}

// Eventos de fechamento do modal ao clicar no "x"
document.getElementById('closeCadastroPaciente').addEventListener('click', fecharModalCadastroPaciente);

// Evento de submissão do formulário de cadastro
document.getElementById('formCadastroPaciente').addEventListener('submit', cadastrarPaciente);

// Evento para abrir o modal ao clicar no botão "+"
document.getElementById('btnNovoPaciente').addEventListener('click', abrirModalCadastroPaciente);

// Evento para fechar o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalCadastroPaciente');
    if (event.target == modal) {
        fecharModalCadastroPaciente();
    }
});

// Evento para a caixa de pesquisa
document.getElementById('searchPaciente').addEventListener('input', lidarComPesquisa);

// Carregar os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarNutricionista();
    listarPacientes();
});
