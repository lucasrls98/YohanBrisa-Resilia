class Formulario {
    constructor() {
      // Selecionando os elementos do formulário pelo ID
      this.formularioInput = document.getElementById('formularioInput');
      this.cepInput = document.getElementById('cepInput');
      this.enderecoInput = document.getElementById('enderecoInput');
      this.numeroCasaInput = document.getElementById('numeroCasaInput');
      this.cidadeInput = document.getElementById('cidadeInput');
      this.bairroInput = document.getElementById('bairroInput');
      this.regiaoInput = document.getElementById('regiaoInput');
      this.loader = document.getElementById('loader');
      this.errorMessage = document.getElementById('errorMessage');
      this.limparButton = document.getElementById('limparButton');
  
      // Adicionando um ouvinte de evento para o input de CEP, para formatá-lo conforme é digitado
      this.cepInput.addEventListener("input", (e) => {
        this.formatarCEP(e.target);
      });
  
      // Adicionando um ouvinte de evento para o envio do formulário
      this.formularioInput.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitando o comportamento padrão de envio do formulário
        this.submitFormulario();
      });
  
      // Adicionando um ouvinte de evento para o botão "Limpar"
      this.limparButton.addEventListener("click", () => {
        this.limparCampos();
      });
    }
  
    // Método para formatar o CEP no formato 12345-678
    formatarCEP(input) {
      const cep = input.value;
      const cepFormatado = cep.replace(/\D/g, ""); // Removendo todos os caracteres não numéricos
  
      if (cepFormatado.length > 5) {
        input.value = cepFormatado.replace(/^(\d{5})(\d)/, "$1-$2"); // Inserindo o traço no meio do CEP
      } else {
        input.value = cepFormatado;
      }
    }
  
    // Método para enviar o formulário
    submitFormulario() {
      const cep = this.cepInput.value;
      const numeroCasa = this.numeroCasaInput.value;
  
      // Verificando se o CEP possui o formato válido (9 caracteres) e se o número da casa está preenchido
      if (cep.length !== 9 || numeroCasa.trim() === "") {
        this.mostrarMensagemDeErro("CEP inválido ou número da casa não preenchido.");
        this.cepInput.classList.add("erro"); // Adicionando uma classe de erro ao input de CEP
        return;
      }
  
      this.getEndereco(cep); // Obtendo o endereço com base no CEP
    }
  
    // Método assíncrono para obter o endereço através de uma requisição à API ViaCEP
    async getEndereco(cep) {
      this.toggleLoader(); // Exibindo o loader (indicador de carregamento)
      this.cepInput.blur(); // Removendo o foco do input de CEP
  
      const cepLimpo = cep.replace(/[^0-9]/g, ""); // Removendo todos os caracteres não numéricos do CEP
      const url = `https://viacep.com.br/ws/${cepLimpo}/json/`; // URL da API ViaCEP com o CEP fornecido
  
      try {
        const response = await fetch(url); // Fazendo a requisição à API ViaCEP
  
        if (!response.ok) {
          throw new Error("Erro na requisição"); // Lançando um erro caso a requisição não seja bem-sucedida
        }
  
        const data = await response.json(); // Convertendo a resposta em formato JSON
  
        if (data.erro) {
          throw new Error("CEP não encontrado"); // Lançando um erro caso o CEP não seja encontrado
        }
  
        // Preenchendo os campos do formulário com os dados obtidos da API ViaCEP
        this.enderecoInput.value = data.logradouro || "";
        this.cidadeInput.value = data.localidade || "";
        this.bairroInput.value = data.bairro || "";
        this.regiaoInput.value = data.uf || "";
  
        this.mostrarMensagemDeErro(""); // Limpar a mensagem de erro, se houver
  
      } catch (error) {
        this.mostrarMensagemDeErro(error.message); // Exibindo a mensagem de erro
      } finally {
        this.toggleLoader(); // Ocultando o loader
      }
    }
  
    // Método para alternar a exibição do loader
    toggleLoader() {
      this.loader.classList.toggle("hidden"); // Alternando a classe "hidden" para exibir ou ocultar o loader
    }
  
    // Método para exibir ou ocultar a mensagem de erro
    mostrarMensagemDeErro(mensagem) {
      this.errorMessage.textContent = mensagem; // Definindo o texto da mensagem de erro
  
      if (mensagem === "") {
        this.errorMessage.classList.add("hidden"); // Ocultando a mensagem de erro
      } else {
        this.errorMessage.classList.remove("hidden"); // Exibindo a mensagem de erro
      }
    }
  
    // Método para limpar todos os campos do formulário
    limparCampos() {
      this.cepInput.value = "";
      this.numeroCasaInput.value = "";
      this.enderecoInput.value = "";
      this.cidadeInput.value = "";
      this.bairroInput.value = "";
      this.regiaoInput.value = "";
      this.mostrarMensagemDeErro(""); // Limpar a mensagem de erro, se houver
      this.cepInput.classList.remove("erro"); // Remover a classe de erro do input de CEP
    }
  }
  
  // Instanciando a classe Formulario para inicializar o formulário
  const formulario = new Formulario();