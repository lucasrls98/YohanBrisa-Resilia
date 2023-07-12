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
    this.validarCepButton = document.getElementById('validarCepButton');

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

    this.validarCepButton.addEventListener("click", () => {
      this.validarCEP();
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

  // Função para validar o CEP
  validarCEP() {
    const cep = this.cepInput.value;
    const cepLimpo = cep.replace(/[^0-9]/g, "");

    if (cepLimpo.length !== 8) {
      this.mostrarMensagemDeErro("CEP inválido.");
      this.cepInput.classList.add("erro");
      return;
    }

    this.getEndereco(cepLimpo);
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

  
      const modal = new bootstrap.Modal(document.getElementById('cadastroEnviado'));
      modal.show();

    // alert("Formulário enviado com sucesso!");
    this.limparCampos();
    // window.location.href = "../index.html";
    
  }

  // Função para buscar o endereço com base no CEP
  async getEndereco(cep) {
    this.toggleLoader();
    this.cepInput.blur();

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      this.enderecoInput.value = data.logradouro || "";
      this.cidadeInput.value = data.localidade || "";
      this.bairroInput.value = data.bairro || "";
      this.regiaoInput.value = data.uf || "";

      this.mostrarMensagemDeErro(""); // Limpar a mensagem de erro, se houver

    } catch (error) {
      this.mostrarMensagemDeErro(error.message);
    } finally {
      this.toggleLoader();
    }
  }

  // Função para exibir a mensagem de erro
  mostrarMensagemDeErro(mensagem) {
    this.errorMessage.innerHTML = `<div class="alert alert-danger" role="alert">
    ${mensagem}
  </div>`;

    if (mensagem === "") {
      this.errorMessage.classList.add("hidden");
      this.errorMessage.innerHTML = ''
    } else {
      this.errorMessage.classList.remove("hidden");
    }
  }

  // Função para exibir ou ocultar o loader
  toggleLoader() {
    this.loader.classList.toggle("hidden");
  }

  // Função para limpar os campos do formulário
  limparCampos() {
    this.formularioInput.reset();
    this.desabilitarCamposEndereco();
    this.mostrarMensagemDeErro("");
    this.senhaInput.classList.remove("erro");
    this.confirmacaoSenhaInput.classList.remove("erro");
    this.cepInput.classList.remove("erro");
  }
}

// Instanciando o objeto Formulario
const formulario = new Formulario();
