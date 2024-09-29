import { Dados } from './dados.js';
import Nutricionista from './nutricionista.js';
import Consulta from './consulta.js';

// Variável Global para armazenar o nutricionista logado
let nutricionistaLogado;

// Função de logout
function logout() {
    sessionStorage.removeItem('usuarioLogadoId');
    window.location.href = '../../index.html';
}

// Função para carregar o nutricionista logado
async function carregarNutricionista() {
    const usuarioId = sessionStorage.getItem('usuarioLogadoId');
    console.log('id: ',usuarioId)
    if (!usuarioId) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '../../index.html';
        return;
    }


    const dados = Dados.carregarDados();
    const nutricionistaData = dados.nutricionistas.find(n => n.id === usuarioId);


    if (nutricionistaData) {
    } else {
        alert('Dados do nutricionista não encontrados.');
        window.location.href = '../../index.html';
    }

    listarPacientes();
}

// Função para listar os pacientes na tabela
async function listarPacientes(filtro = '') {
    const res = await fetch("../../data/consulta.json");
    const data =  await res.json();
    const dados1 =  data;
    
    const usuarioId = sessionStorage.getItem('usuarioLogadoId');
    console.log('valor: ',usuarioId )
    const consultas = dados1.filter(n => n.idNutricionista = usuarioId);
    console.log('valor2: ',consultas)

    const dados = Dados.carregarDados();
    const tabelaConsultas = document.getElementById('tabelaConsultas').getElementsByTagName('tbody')[0];

    tabelaConsultas.innerHTML = '';

    consultas.forEach(consulta => {

            // Verificar se o nome do paciente corresponde ao filtro
            if (consulta.nome.toLowerCase().includes(filtro.toLowerCase())) {
                const row = tabelaConsultas.insertRow();

                const cellNome = row.insertCell(0);
                const cellData = row.insertCell(1)
                const cellAcoes = row.insertCell(2);

                cellNome.textContent = consulta.nome;
                cellData.textContent = consulta.data;

                // Container para os ícones de ação
                const acoesDiv = document.createElement('div');
                acoesDiv.className = 'acoes';
                
                // Modificar
                const btnModificar = document.createElement('i');
                btnModificar.className = 'fas fa-hands-helping';
                btnModificar.setAttribute('data-tooltip', 'Gerenciar Consulta');
                btnModificar.title = 'Gerenciar Consulta'; // Alternativa para acessibilidade
                btnModificar.addEventListener('click', () => modificarConsulta(consulta));
                acoesDiv.appendChild(btnModificar);

                // Deletar
                const btnExcluir = document.createElement('i');
                btnExcluir.className = 'fas fa-trash-alt';
                btnExcluir.setAttribute('data-tooltip', 'Excluir');
                btnExcluir.title = 'Excluir'; // Alternativa para acessibilidade
                btnExcluir.addEventListener('click', () => removerConsulta(consulta.id));
                acoesDiv.appendChild(btnExcluir);


                cellAcoes.appendChild(acoesDiv);
            }
        
    });

}

function lidarComPesquisa() {
    const filtro = document.getElementById('searchConsulta').value.trim();
    listarPacientes(filtro);
}


const btnCriarConsulta = document.getElementById('btnCriarConsulta');
// const modificarConsulta = document.getElementById('ModificarConsulta');
const btnDelConsulta = document.getElementById('btnDelConsulta');

const modalCriarConsulta = document.getElementById('modalCriarConsulta');
const modalModificarConsulta = document.getElementById('modalModificarConsulta');

const closeCriarConsulta = document.getElementById('closeCriarConsulta');
const closeModificarConsulta = document.getElementById('closeModificarConsulta');



function abrirModal(modal) {
    modal.style.display = 'block';
}

function fecharModal(modal) {
    modal.style.display = 'none';
}

 function modificarConsulta(consulta) {
    document.getElementById('nomePaciente').value = consulta.nome;
    document.getElementById('cpfPaciente').value = consulta.cpf;
    document.getElementById('dataPaciente').value = consulta.data;
    document.getElementById('statusPaciente').value = consulta.status;
    abrirModal(modalModificarConsulta);
 };

btnCriarConsulta.addEventListener('click', () => {
     abrirModal(modalCriarConsulta);
});


// btnModificarConsulta.addEventListener('click', () => {
//     // abrirModal(modalModificarConsulta);
// });

// btnDelConsulta.addEventListener('click', () => {
//     console.log('clocou')
// });



closeCriarConsulta.addEventListener('click', () => fecharModal(modalCriarConsulta));
closeModificarConsulta.addEventListener('click', () => fecharModal(modalModificarConsulta));



document.getElementById('searchConsulta').addEventListener('input', lidarComPesquisa);


// Carregar os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarNutricionista();
    
});
