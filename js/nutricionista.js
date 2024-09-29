import Usuario from './usuario.js';
import { Dados, gerarIdUnico } from './dados.js';

class Nutricionista extends Usuario {
    constructor(id, nome, email, senha) {
        super(id, nome, email, senha, 'nutricionista');
        this.pacientes = [];
        this.assistentes = [];
    }

    cadastrarPaciente(nome, email, senha) {
        const dados = Dados.carregarDados();

        // Verifica se o email já está em uso
        if (dados.usuarios.some(u => u.email === email)) {
            throw new Error('Email já está em uso.');
        }

        const idPaciente = gerarIdUnico();
        const paciente = {
            id: idPaciente,
            nome: nome,
            email: email,
            senha: senha,
            tipo: 'paciente',
            nutricionistaId: this.id,
            dadosCadastro: {},
            dieta: {},
            avaliacaoFisica: {}
        };

        // Adiciona o paciente ao banco de dados
        dados.usuarios.push({
            id: idPaciente,
            email: email,
            senha: senha,
            tipo: 'paciente'
        });
        dados.pacientes.push(paciente);

        // Atualiza a lista de pacientes do nutricionista
        this.pacientes.push(idPaciente);

        // Atualiza o nutricionista no banco de dados
        const indexNutri = dados.nutricionistas.findIndex(n => n.id === this.id);
        if (indexNutri !== -1) {
            dados.nutricionistas[indexNutri] = {
                id: this.id,
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                tipo: 'nutricionista',
                pacientes: this.pacientes,
                assistentes: this.assistentes
            };
        }

        // Salva as alterações
        Dados.salvarDados(dados);
    }

    cadastrarAssistente(nome, email, senha) {
        const dados = Dados.carregarDados();

        // Verifica se o email já está em uso
        if (dados.usuarios.some(u => u.email === email)) {
            throw new Error('Email já está em uso.');
        }

        const idAssistente = gerarIdUnico();
        const assistente = {
            id: idAssistente,
            nome: nome,
            email: email,
            senha: senha,
            tipo: 'assistente',
            nutricionistaId: this.id
        };

        // Adiciona o assistente ao banco de dados
        dados.usuarios.push({
            id: idAssistente,
            email: email,
            senha: senha,
            tipo: 'assistente'
        });
        dados.assistentes.push(assistente);

        // Atualiza a lista de assistentes do nutricionista
        this.assistentes.push(idAssistente);

        // Atualiza o nutricionista no banco de dados
        const indexNutri = dados.nutricionistas.findIndex(n => n.id === this.id);
        if (indexNutri !== -1) {
            dados.nutricionistas[indexNutri] = {
                id: this.id,
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                tipo: 'nutricionista',
                pacientes: this.pacientes,
                assistentes: this.assistentes
            };
        }

        // Salva as alterações
        Dados.salvarDados(dados);
    }
}

export default Nutricionista;
