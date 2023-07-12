//Aqui é criada uma classe para validação do email
class emailValidacao {
    constructor (email) {
        this.email = email;
    }
    //Essa parte testa o e-mail fornecido pelo usuário para que seja avaliado pelo padrão Regex
    validar() {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}
//As constantes são declaradas, e os IDs dos elementos obtidos do HTML a partir do DOM
const emailEntrada = document.getElementById("emailRec");
const botaoEnvio = document.getElementById("enviar");

//Aqui, é adicionado um ouvinte, e o envio do formulário é previnido 
botaoEnvio.addEventListener("click", function(event) {
    event.preventDefault();
    //Aqui, é obtivo o "valor" digitado no input respectivo ao E-mail
    const email = emailEntrada.value;

    //Aqui, é criada uma instância do validador de E-mail
    const validadorEmail = new emailValidacao(email);

    //É criada uma condicional para verificação da validade do E-mail a partir da utilização do método 'validar()'
    // if (validadorEmail.validar()) {
    //     // alert("E-mail enviado com sucesso!");
    //     const modal = new bootstrap.Modal(document.getElementById('cadastroEnviado'));
    //     modal.show();
    //     const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
    //     modalLogin.show(); // Abre o modal de login
    // } else {
    //     alert("E-mail inválido!");
    // }
    if (validadorEmail.validar()) {
        const modalRecuperacao = new bootstrap.Modal(document.getElementById('cadastroEnviado'));
        modalRecuperacao.show(); // Mostra o modal de recuperação
    
        setTimeout(function() {
            const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
            modalRecuperacao.hide(); // Fecha o modal de recuperação
            modalLogin.show(); // Mostra o modal de login
        }, 2000); // 2 segundos de atraso (2000 milissegundos)
    } else {
        alert("E-mail inválido!");
    }
})

