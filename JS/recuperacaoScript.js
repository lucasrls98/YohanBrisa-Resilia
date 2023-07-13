//Aqui é criada uma classe para validação do email
class emailValidacao {
    constructor (email) {
        this.email = email;
    }
    //Aqui, começa a validação do email;
    validar() {
        //Aqui, o código busca a posição do caractere "@" no e-mail fornecido;
        const posicaoArroba = this.email.indexOf("@");
        //Por sua vez, aqui o código busca a posição do "." no e-mail fornecido;
        const posicaoPonto = this.email.indexOf(".", posicaoArroba);

        //Nessa condicional, ocorre uma verificação da existência de um "@" e um ponto após ele;
        if(posicaoArroba > -1 && posicaoPonto > posicaoArroba) {
            //É extraído o trecho do endereço de e-mail que vem logo após o "@"
            const depoisArroba = this.email.substring(posicaoArroba + 1, posicaoPonto);
            //Aqui, é verificado se o depoisArroba possui ao menos 5 caracteres;
            if (depoisArroba.length >= 5) {
                //Caso todas as condições sejam satisfeitas, o e-mail é julgado válido e enviado;
                return true;
            }
        }
        //Caso contrário, ele será declarado inválido e as devidas correções deveram ser feitas ao e-mail fornecido
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

