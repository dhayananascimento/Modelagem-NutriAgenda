// Classe base Usuario
import { Dados } from './dados.js';
class Usuario {
    constructor(id, nome, email, senha, tipo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo; // 'nutricionista', 'paciente' ou 'assistente'
    }

    // Método estático para autenticar usuário
    static autenticar(email, senha) {
        const dados = Dados.carregarDados();
        const usuario = dados.usuarios.find(u => u.email === email && u.senha === senha);
        if (usuario) {
            return usuario;
        } else {
            throw new Error('Email ou senha incorretos.');
        }
    }

    alterarSenha(novaSenha) {
        this.senha = novaSenha;
        // Atualizar no banco de dados
        const dados = Dados.carregarDados();
        const usuario = dados.usuarios.find(u => u.id === this.id);
        if (usuario) {
            usuario.senha = novaSenha;
            Dados.salvarDados(dados);
        }
    }
}

export default Usuario;
