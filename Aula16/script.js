document.addEventListener("DOMContentLoaded", () => {
    const fabricantesContainer = document.getElementById("fabricantes-container");

    // Função para buscar os fabricantes via API
    function carregarFabricantes() {
        fetch('http://localhost:8080/fabricante')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os fabricantes');
                }
                return response.json(); // converte a resposta para JSON
            })
            .then(fabricantes => {
                // Limpa o container antes de renderizar
                fabricantesContainer.innerHTML = ""; // ver se pode ser aspas duplas ou simples

                // Itera pelos fabricantes e cria os cards
                fabricantes.forEach(fabricante => {
                    const card = document.createElement("div");
                    card.classList.add("card");

                    card.innerHTML = `
                    <h2>${fabricante.nome}</h2>
                    <p>Pais : ${fabricante.nacionalidade}</p>
                    <p class="excluir">
                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                         </svg>
                    </p>
                    `;
                    fabricantesContainer.appendChild(card);  // Adiciona o card ao container

                    card.addEventListener('click', function () {
                        // Confirmação de exclusão
                        if (!confirm("Deseja realmente excluir o fabricante " + fabricante.nome + "?")) {
                            return;
                        }

                        // Configuração para o envio da requisição DELETE
                        fetch(`http://localhost:8080/fabricante/${fabricante.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    alert(`Fabricante ${fabricante.nome} excluído com sucesso!`);
                                    // Aqui você pode adicionar lógica adicional, como atualizar a lista de fabricantes na página
                                } else {
                                    alert("Erro ao excluir o fabricante " + fabricante.nome + ". Verifique o ID e tente novamente.");
                                }
                            })
                            .catch(error => {
                                console.error("Erro:", error);
                                alert("Erro ao excluir o fabricante " + fabricante.nome + ". Verifique a conexão com o servidor.");
                            });
                    })
                });
            })
            .catch(error => {
                console.error("Erro: ", error);
                fabricantesContainer.innerHTML = '<p> Erro ao carregar fabricantes! </p>'
            });
    }

    //Chama a função para carregar os fabricantes quando a página é carregada
    carregarFabricantes();

    const modelosContainer = document.getElementById("modelos-container");

    //carregando os modelos via API
    function carregarModelos() {
        fetch('http://localhost:8080/modelo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os modelos');
                }
                return response.json();
            })
            .then(modelos => {
                modelosContainer.innerHTML = "";

                modelos.forEach(modelo => {
                    const cardModelo = document.createElement("div");
                    cardModelo.classList.add("card");

                    cardModelo.innerHTML = `
                    <h2>${modelo.modelo}</h2>
                    <p>Fabricante : ${modelo.fabricante.nome}</p>
                    `;
                    modelosContainer.appendChild(cardModelo);
                });
            })
            .catch(error => {
                console.error("Erro: ", error);
                modelosContainer.innerHTML = '<p> Erro ao carregar modelos! </p>'
            });
    }

    carregarModelos();
});

function cadastrarFabricante() {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const nacionalidade = document.getElementById("nacionalidade").value;

    // Cria o objeto com os dados do fabricante
    const fabricante = {
        nome: nome,
        nacionalidade: nacionalidade
    };

    // Configuração para o envio da requisição
    fetch("http://localhost:8080/fabricante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fabricante)
    })
        .then(response => {
            if (response.ok) {
                alert("Fabricante cadastrado com sucesso!");
                document.getElementById("fabricanteForm").reset();
            } else {
                alert("Erro ao cadastrar fabricante. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar fabricante. Verifique a conexão com o servidor.");
        });
}