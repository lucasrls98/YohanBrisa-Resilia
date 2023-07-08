    // Selecionando os elementos do formulário
    const formularioInput = document.getElementById('formularioInput');
    const cepInput = document.getElementById('cepInput');
    const enderecoInput = document.getElementById('enderecoInput');
    const cidadeInput = document.getElementById('cidadeInput');
    const bairroInput = document.getElementById('bairroInput');
    const regiaoInput = document.getElementById('regiaoInput');

    // Adicionando um ouvinte de evento ao campo de CEP
    cepInput.addEventListener("input", (e) => {
        const cep = e.target.value;

        const cepFormatado = formatarCEP(cep);

        e.target.value = cepFormatado;
    });

    // Função para formatar o CEP adicionando o hífen
    function formatarCEP(cep) {
        cep = cep.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

        if (cep.length > 5) {
            cep = cep.replace(/^(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen após os primeiros 5 dígitos
        }

        return cep;
    }

    // Função para buscar o endereço com base no CEP
    const GetEndereco = async (cep) => {
        toggleLoader();

        cepInput.blur();

        const cepLimpo = cep.replace(/[^0-9]/g, ""); // Remove todos os caracteres não numéricos do CEP

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
        } catch (error) {
            console.log(error.message);
        } finally {
            toggleLoader();
        }
    };

    // Ouvinte de evento para o envio do formulário
    formularioInput.addEventListener("submit", (e) => {
        e.preventDefault();

        const cep = cepInput.value;

        GetEndereco(cep);
    });

    // Função para mostrar ou ocultar o loader
    function toggleLoader() {
        const loader = document.getElementById("loader");
        loader.classList.toggle("hidden");
    }