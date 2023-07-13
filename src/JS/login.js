class LoginForm {
    constructor() {
        this.form = document.querySelector("#modalLogin form");
        this.emailInput = document.querySelector("#loginEmail");
        this.passwordInput = document.querySelector("#loginSenha");

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();

        const email = this.emailInput.value;
        const senha = this.passwordInput.value;

        if (this.validarSenha(senha)) {
            window.location.href = "../../index.html";
        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    }

    validarSenha(senha) {
        if (senha.length < 5) {
            this.mostrarMensagemDeErro("A senha deve ter pelo menos 5 caracteres.");
            this.passwordInput.classList.add("erro");
            return false;
        }
        return true;
    }
}

// Cria uma instância do formulário de login
const loginForm = new LoginForm();
