import Usuario from './usuario.js';
import { Dados, gerarIdUnico } from './dados.js';

class Paciente extends Usuario {
    constructor(id, nome, email, senha, nutricionistaId, cpf, dataNascimento, telefone, cep, estado, cidade, bairro, rua, numero, complemento) {
        super(id, nome, email, senha, 'paciente');
        this.nutricionistaId = nutricionistaId;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.cep = cep;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
    }

}

export default Paciente;
