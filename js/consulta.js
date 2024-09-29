// Classe consulta
import { Dados } from './dados.js';

class Consulta {
    constructor(id, idNutricionista,nome, cpf, data, status) {
        this.id = id;
        this.idNutricionista = idNutricionista;
        this.nome = nome;
        this.cpf = cpf;
        this.data = data;
        this.status = status;
    }

    // Método estático para autenticar usuário
    static async consultasNutricionista() {
        const res = await fetch("../data/consulta.json");
        const data = await res.json();
        console.log('valor: ',data)
    }

    // alterarSenha(novaSenha) {
    //     this.senha = novaSenha;
    //     // Atualizar no banco de dados
    //     const dados = Dados.carregarDados();
    //     const usuario = dados.usuarios.find(u => u.id === this.id);
    //     if (usuario) {
    //         usuario.senha = novaSenha;
    //         Dados.salvarDados(dados);
    //     }
    // }
}

export default Consulta;
