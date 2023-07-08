function validaFormulario() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmacaoSenha = document.getElementById("confirmacaoSenha").value;
    var registroGeral = document.getElementById("regGeral").value;
    
    if (nome === "") {
        alert("Favor inserir seu nome.");
        return false;
    }

    if (email === "" || email.length < 14) {
        alert("E-mail inválido!");
        return false;
    }

    if (registroGeral === "") {
        alert("Favor inserir seu RG");
        return false;
    }

    if (senha.length < 5) {
        alert("A senha deve ter no mínimo 5 caracteres.");
        return false;
    }

    if (confirmacaoSenha != senha) {
        alert("A confirmação deve ser igual a senha.");
        return false;
    }

    return true;

}

document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validaFormulario()) {
        event.preventDefault();
    }
})