import Usuario from './usuario.js';

// DOM
const formLogin = document.getElementById('formLogin');


// Função de login
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    try {
        const usuarioData = Usuario.autenticar(email, senha);

        // Armazenar o ID do usuário logado
        sessionStorage.setItem('usuarioLogadoId', usuarioData.id);

        // Redirecionar para a página correta
        switch (usuarioData.tipo) {
            case 'nutricionista':
                window.location.href = 'pages/Home/nutricionista.html';
                break;
            case 'paciente':
                window.location.href = 'pages/Home/paciente.html';
                break;
            case 'assistente':
                window.location.href = 'pages/Home/assistente.html';
                break;
            default:
                throw new Error('Tipo de usuário desconhecido.');
        }
    } catch (error) {
        alert(error.message);
    }
});
