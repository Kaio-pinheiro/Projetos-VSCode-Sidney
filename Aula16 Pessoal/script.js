document.addEventListener("DOMContentLoaded", () => {
    const fornecedoresContainer = document.getElementById("fornecedores-container");
    carregarFornecedoresNoProduto();

    // Função para buscar os fornecedores via API
    function carregarFornecedores() {
        fetch('http://localhost:8080/fornecedor')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os fornecedores');
                }
                return response.json(); // converte a resposta para JSON
            })
            .then(fornecedores => {
                // Limpa o container antes de renderizar
                fornecedoresContainer.innerHTML = ""; // ver se pode ser aspas duplas ou simples

                // Itera pelos fornecedores e cria os cards
                fornecedores.forEach(fornecedor => {
                    const card = document.createElement("div");
                    card.classList.add("card");

                    card.innerHTML = `
                    <h2>${fornecedor.nome}</h2>
                    <p>Região : ${fornecedor.nacionalidade}</p>
                    <p class="excluir">
                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                         </svg>
                    </p>
                    `;
                    fornecedoresContainer.appendChild(card);  // Adiciona o card ao container

                    card.addEventListener('click', function () {
                        // Confirmação de exclusão
                        if (!confirm("Deseja realmente excluir o fornecedor " + fornecedor.nome + "?")) {
                            return;
                        }

                        // Configuração para o envio da requisição DELETE
                        fetch(`http://localhost:8080/fornecedor/${fornecedor.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    alert(`Fornecedor ${fornecedor.nome} excluído com sucesso!`);
                                    carregarFornecedores();  // Recarrega a lista de fornecedores após a exclusão

                                } else {
                                    alert("Erro ao excluir o fornecedor " + fornecedor.nome + ". Verifique o ID e tente novamente.");
                                }
                            })
                            .catch(error => {
                                console.error("Erro:", error);
                                alert("Erro ao excluir o fornecedor " + fornecedor.nome + ". Verifique a conexão com o servidor.");
                            });
                    })
                });
            })
            .catch(error => {
                console.error("Erro: ", error);
                fornecedoresContainer.innerHTML = '<p> Erro ao carregar fornecedores! </p>'
            });
    }

    //Chama a função para carregar os fornecedores quando a página é carregada
    carregarFornecedores();

    const produtosContainer = document.getElementById("produtos-container");

    //carregando os produtos via API
    function carregarProdutos() {
        fetch('http://localhost:8080/produto')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os produtos');
                }
                return response.json();
            })
            .then(produtos => {
                produtosContainer.innerHTML = "";

                produtos.forEach(produto => {
                    console.log("Produto carregado:", produto); // Para verificar a estrutura do objeto produto
                    const cardModelo = document.createElement("div");
                    cardModelo.classList.add("card");

                    cardModelo.innerHTML = `
                    <h2>${produto.nome}</h2>
                    <p>${produto.fornecedor.nome}</p>
                    <p class="excluir">
                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                         </svg>
                    </p>
                    `;
                    produtosContainer.appendChild(cardModelo);

                    cardModelo.addEventListener('click', function () {
                        // Confirmação de exclusão
                        if (!confirm("Deseja realmente excluir o produto " + produto.nome + "?")) {
                            return;
                        }
                        console.log("Tentando excluir produto com ID:", produto.id); // testatdno
                        // Configuração para o envio da requisição DELETE
                        fetch(`http://localhost:8080/produto/${produto.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(response => {
                                console.log("Resposta da API:", response); //testando
                                if (response.ok) {
                                    alert(`Produto ${produto.nome} excluído com sucesso!`);
                                    carregarProdutos();
                                    // Aqui você pode adicionar lógica adicional, como atualizar a lista de produtos na página
                                } else {
                                    alert("Erro ao excluir o produto " + produto.nome + ". Verifique o ID e tente novamente.");
                                }
                            })
                            .catch(error => {
                                console.error("Erro:", error);
                                alert("Erro ao excluir o produto " + produto.nome + ". Verifique a conexão com o servidor.");
                            });
                    })

                });
            })
            .catch(error => {
                console.error("Erro: ", error);
                produtosContainer.innerHTML = '<p> Erro ao carregar produtos! </p>'
            });
    }

    carregarProdutos();
});

function cadastrarFornecedor() {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const nacionalidade = document.getElementById("nacionalidade").value;

    // Verifica se os campos estão preenchidos
    if (!nome || !nacionalidade) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria o objeto com os dados do produto
    const fornecedor = {
        nome: nome,
        nacionalidade: nacionalidade
    };

    // Configuração para o envio da requisição
    fetch("http://localhost:8080/fornecedor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fornecedor)
    })
        .then(response => {
            if (response.ok) {
                alert("Fornecedor " + fornecedor.nome + " cadastrado com sucesso!");
                document.getElementById("fornecedorForm").reset();
            } else {
                alert("Erro ao cadastrar fornecedor " + fornecedor.nome + ". Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar fornecedor " + fornecedor.nome + ". Verifique a conexão com o servidor.");
        });
}


function cadastrarProduto() {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const fornecedorId = document.getElementById("fornecedor").value;

    // Verifica se os campos estão preenchidos
    if (!nome || !fornecedorId) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria o objeto com os dados do produto
    const produto = {
        nome: nome,
        fornecedor: {
            id: fornecedorId
        }
    };

    // Configuração para o envio da requisição
    fetch("http://localhost:8080/produto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
        .then(response => {
            if (response.ok) {
                alert("Produto " + produto.nome + " cadastrado com sucesso!");
                document.getElementById("produtoForm").reset();
            } else {
                alert("Erro ao cadastrar produto " + produto.nome + ". Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar produto " + produto.nome + ". Verifique a conexão com o servidor.");
        });
}


// Função para buscar fornecedores e preencher o select
function carregarFornecedoresNoProduto() {
    fetch('http://localhost:8080/fornecedor')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os fornecedores');
            }
            return response.json();
        })
        .then(fornecedores => {
            const fornecedorSelect = document.getElementById('fornecedor');
            fornecedorSelect.innerHTML = '<option value="" disabled selected>Selecione o fornecedor</option>';

            fornecedores.forEach(fornecedor => {
                const option = document.createElement("option");
                option.value = fornecedor.id;
                option.textContent = fornecedor.nome;
                fornecedorSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro: ", error);
            const fornecedorSelect = document.getElementById('fornecedor');
            fornecedorSelect.innerHTML = '<option value="">Erro ao carregar fornecedores!</option>';
        });
}
