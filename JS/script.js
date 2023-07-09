function validaFormulario() {
    //constantes para obter o ID dos elementos do HTML
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmacaoSenha = document.getElementById("confirmacaoSenha").value;
    const registroGeral = document.getElementById("regGeral").value;
    
    //condicional para validação do campo "Nome"
    if (nome === "") {
        alert("Favor inserir seu nome.");
        return false;
    }

    //condicional para validação do campo "E-mail"
    if (email === "" || email.length < 14) {
        alert("E-mail inválido!");
        return false;
    }

    //condicional para validação do campo "RG"
    if (registroGeral === "") {
        alert("Favor inserir seu RG");
        return false;
    }

    //condicional para validação do campo "senha"
    if (senha.length < 5) {
        alert("A senha deve ter no mínimo 5 caracteres.");
        return false;
    }

    //condicional para validação do campo "confirmação de senha"
    if (confirmacaoSenha != senha) {
        alert("A confirmação deve ser igual a senha.");
        return false;
    }

    //caso todas as condicionais forem satisfeitas, o formulário será aceito
    return true;

}

//essa parte chamará a função e fará com que, caso o formulário esteja incorreto, ele não seja enviado (preventDefault).
document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validaFormulario()) {
        event.preventDefault();
    }
})