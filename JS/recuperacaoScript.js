//Aqui é criada uma classe para validação do email
class emailValidacao {
    constructor (email) {
        this.email = email;
    }
    //Essa parte testa o e-mail fornecido pelo usuário para que seja avaliado pelo padrão Regex
    validar() {
        const posicaoArroba = this.email.indexOf("@");
        const posicaoPonto = this.email.indexOf(".", posicaoArroba);

        if(posicaoArroba > -1 && posicaoPonto > posicaoArroba) {
            const depoisArroba = this.email.substring(posicaoArroba + 1, posicaoPonto);
            if (depoisArroba.length >= 5) {
                return true;
            }
        }
        return false;
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
    if (validadorEmail.validar()) {
        alert("E-mail enviado com sucesso!");
    } else {
        alert("E-mail inválido!");
    }
})

