class Formulario {
  constructor() {
    // Selecionando os elementos do formulário
    this.formularioInput = document.getElementById('formularioInput');
    this.nomeInput = document.getElementById('nomeInput');
    this.emailInput = document.getElementById('emailInput');
    this.senhaInput = document.getElementById('senhaInput');
    this.confirmacaoSenhaInput = document.getElementById('confirmacaoSenhaInput');
    this.rgInput = document.getElementById('rgInput');
    this.cepInput = document.getElementById('cepInput');
    this.enderecoInput = document.getElementById('enderecoInput');
    this.numeroCasaInput = document.getElementById('numeroCasaInput');
    this.complementoInput = document.getElementById('complementoInput');
    this.cidadeInput = document.getElementById('cidadeInput');
    this.bairroInput = document.getElementById('bairroInput');
    this.regiaoInput = document.getElementById('regiaoInput');
    this.loader = document.getElementById('loader');
    this.errorMessage = document.getElementById('errorMessage');
    this.enviarButton = document.getElementById('enviarButton');
    this.limparButton = document.getElementById('limparButton');

    // Adicionando ouvintes de evento aos campos do formulário
    this.senhaInput.addEventListener("input", () => {
      this.validarSenha();
    });

    this.confirmacaoSenhaInput.addEventListener("input", () => {
      this.validarSenha();
    });

    this.cepInput.addEventListener("input", (e) => {
      this.formatarCEP(e.target);

      // Verificando se o campo de CEP está vazio
      if (e.target.value === "") {
        this.desabilitarCamposEndereco();
      } else {
        this.habilitarCamposEndereco();
      }
    });

    this.formularioInput.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitFormulario();
    });

    this.limparButton.addEventListener("click", () => {
      this.limparCampos();
    });
  }

  // Função para formatar o CEP
  formatarCEP(input) {
    const cep = input.value;
    const cepFormatado = cep.replace(/\D/g, "");

    if (cepFormatado.length > 5) {
      input.value = cepFormatado.replace(/^(\d{5})(\d)/, "$1-$2");
    } else {
      input.value = cepFormatado;
    }
  }

  // Função para desabilitar os campos de endereço
  desabilitarCamposEndereco() {
    this.enderecoInput.disabled = true;
    this.numeroCasaInput.disabled = true;
    this.complementoInput.disabled = true;
    this.cidadeInput.disabled = true;
    this.bairroInput.disabled = true;
    this.regiaoInput.disabled = true;
  }

  // Função para habilitar os campos de endereço
  habilitarCamposEndereco() {
    this.enderecoInput.disabled = false;
    this.numeroCasaInput.disabled = false;
    this.complementoInput.disabled = false;
    this.cidadeInput.disabled = false;
    this.bairroInput.disabled = false;
    this.regiaoInput.disabled = false;
  }

  // Função para validar a senha
  validarSenha() {
    const senha = this.senhaInput.value;
    const confirmacaoSenha = this.confirmacaoSenhaInput.value;

    if (senha.length < 5) {
      this.mostrarMensagemDeErro("A senha deve ter pelo menos 5 caracteres.");
      this.senhaInput.classList.add("erro");
      return false;
    }

    if (senha !== confirmacaoSenha) {
      this.mostrarMensagemDeErro("A confirmação da senha não coincide com a senha digitada.");
      this.confirmacaoSenhaInput.classList.add("erro");
      return false;
    }

    // Limpar erros anteriores
    this.senhaInput.classList.remove("erro");
    this.confirmacaoSenhaInput.classList.remove("erro");
    this.mostrarMensagemDeErro("");
    return true;
  }

  // Função para enviar o formulário
  submitFormulario() {
    const cep = this.cepInput.value;
    const numeroCasa = this.numeroCasaInput.value;

    if (!this.validarSenha()) {
      return;
    }

    if (cep.length !== 9 || numeroCasa.trim() === "") {
      this.mostrarMensagemDeErro("CEP inválido ou número da casa não preenchido.");
      this.cepInput.classList.add("erro");
      return;
    }

    if (this.enderecoInput.disabled) {
      this.mostrarMensagemDeErro("Por favor, preencha o campo de CEP primeiro.");
      return;
    }

    // Restante do código para enviar o formulário
  }

  // Função para exibir a mensagem de erro
  mostrarMensagemDeErro(mensagem) {
    this.errorMessage.textContent = mensagem;

    if (mensagem === "") {
      this.errorMessage.classList.add("hidden");
    } else {
      this.errorMessage.classList.remove("hidden");
    }
  }

  // Função para limpar os campos do formulário
  limparCampos() {
    this.formularioInput.reset();
    this.desabilitarCamposEndereco();
    this.mostrarMensagemDeErro("");
    this.senhaInput.classList.remove("erro");
    this.confirmacaoSenhaInput.classList.remove("erro");
  }
}

// Instanciando o objeto Formulario
const formulario = new Formulario();
