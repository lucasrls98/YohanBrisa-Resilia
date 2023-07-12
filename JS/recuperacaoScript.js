class emailValidacao {
    constructor (email) {
        this.email = email;
    }

    validar() {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}

const emailEntrada = document.getElementById("emailRec");
const botaoEnvio = document.getElementById("enviar");


botaoEnvio.addEventListener("click", function(event) {
    event.preventDefault();
    const email = emailEntrada.value;

    const validadorEmail = new emailValidacao(email);
    if (validadorEmail.validar()) {
        alert("E-mail enviado com sucesso!");
    } else {
        alert("E-mail inválido!");
    }
})

