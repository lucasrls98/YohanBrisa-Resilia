// Selecionando os elementos do formulário
const formularioInput = document.getElementById('formularioInput');
const cepInput = document.getElementById('cepInput');
const enderecoInput = document.getElementById('enderecoInput');
const numeroCasaInput = document.getElementById('numeroCasaInput');
const cidadeInput = document.getElementById('cidadeInput');
const bairroInput = document.getElementById('bairroInput');
const regiaoInput = document.getElementById('regiaoInput');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');
const limparButton = document.getElementById('limparButton');

// Ouvinte de evento para o campo de CEP
cepInput.addEventListener("input", (e) => {
    const cep = e.target.value;
    const cepFormatado = formatarCEP(cep);

    e.target.value = cepFormatado;

    // Remove a classe de erro ao digitar
    cepInput.classList.remove("erro");
});

// Ouvinte de evento para o envio do formulário
formularioInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const cep = cepInput.value;
    const numeroCasa = numeroCasaInput.value;

    // Validação do CEP e número da casa
    if (cep.length !== 9 || numeroCasa.trim() === "") {
        mostrarMensagemDeErro("CEP inválido ou número da casa não preenchido.");

        // Adiciona a classe de erro para destacar a borda em vermelho
        cepInput.classList.add("erro");
        return;
    }

    GetEndereco(cep);
});

// Função para buscar o endereço com base no CEP
const GetEndereco = async (cep) => {
    toggleLoader();

    cepInput.blur();

    const cepLimpo = cep.replace(/[^0-9]/g, "");

    const Urlapi = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    try {
        const response = await fetch(Urlapi);

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        const data = await response.json();

        if (data.erro) {
            throw new Error("CEP não encontrado");
        }

        enderecoInput.value = data.logradouro || "";
        cidadeInput.value = data.localidade || "";
        bairroInput.value = data.bairro || "";
        regiaoInput.value = data.uf || "";

        mostrarMensagemDeErro(""); // Limpa a mensagem de erro, se houver

    } catch (error) {
        mostrarMensagemDeErro(error.message);
    } finally {
        toggleLoader();
    }
};

// Função para exibir ou ocultar o loader
function toggleLoader() {
    loader.classList.toggle("hidden");
}

// Função para exibir a mensagem de erro
function mostrarMensagemDeErro(mensagem) {
    errorMessage.textContent = mensagem;

    if (mensagem === "") {
        errorMessage.classList.add("hidden");
    } else {
        errorMessage.classList.remove("hidden");
    }
}

// Função para formatar o CEP
function formatarCEP(cep) {
    cep = cep.replace(/\D/g, "");

    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    return cep;
}
limparButton.addEventListener("click", () => {
    cepInput.value = "";
    numeroCasaInput.value = "";
    enderecoInput.value = "";
    cidadeInput.value = "";
    bairroInput.value = "";
    regiaoInput.value = "";
    mostrarMensagemDeErro(""); // Limpar mensagem de erro, se houver
    cepInput.classList.remove("erro"); // Remover classe de erro
  });