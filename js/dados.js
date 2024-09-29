const Dados = {
    carregarDados: function() {
        const dados = localStorage.getItem('banco');
        if (dados) {
            return JSON.parse(dados);
        } else {
            // Inicializa com estrutura vazia se não existir
            const bancoInicial = {
                usuarios: [],
                nutricionistas: [],
                pacientes: [],
                assistentes: []
            };
            localStorage.setItem('banco', JSON.stringify(bancoInicial));
            return bancoInicial;
        }
    },

    salvarDados: function(dados) {
        localStorage.setItem('banco', JSON.stringify(dados));
    }
};

// Função para Gerar IDs Únicos
function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export { Dados, gerarIdUnico };
