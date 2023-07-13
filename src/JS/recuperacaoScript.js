//Aqui é criada uma classe para validação do email
class emailValidacao {
    constructor (email) {
        this.email = email;
    }
    //Aqui começa a validação do e-mail fornecido
    validar() {

        //Aqui, a posição do caractere "@" é buscada no e-mail fornecido;
        const posicaoArroba = this.email.indexOf("@");

        //Por sua vez, aqui a posição do caractere "." é buscada no e-mail juntamente com a posição do arroba;
        const posicaoPonto = this.email.indexOf(".", posicaoArroba);

        //Nessa condicional, ocorre uma verificação da existência de um "@" e um "." após ele;
        if (posicaoArroba > -1 && posicaoPonto > posicaoArroba) {

            //É extraido o trecho do endereço de e-mail que imediatamente sucede o "@";
            const depoisArroba = this.email.substring(posicaoArroba + 1, posicaoPonto);

            //Ocorre a verificação se o depoisArroba possui ao menos 5 caracteres;
            if (depoisArroba.length >= 5) {

                //Caso todas as condições sejam satisfeitas, o e-mail fornecido é julgado válido e enviado;
                return true;
            }
        }
        //Caso contrário, ele será declarado inválido e o usuário terá que corrigí-lo;
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

