document.addEventListener("DOMContentLoaded", () => {
    const fornecedoresContainer = document.getElementById("fornecedores-container");
   
    // Função para buscar os fornecedores via API
    function carregarfornecedores() {
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
                    <p>Pais : ${fornecedor.nacionalidade}</p>
                    `;
                    fornecedoresContainer.appendChild(card);  // Adiciona o card ao container
                });
            })
            .catch(error => {
                console.error("Erro: ", error);
                fornecedoresContainer.innerHTML = '<p> Erro ao carregar fornecedores! </p>'
            });
    }
 
    //Chama a função para carregar os fornecedores quando a página é carregada
    carregarfornecedores();
 
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
                    const cardModelo = document.createElement("div");
                    cardModelo.classList.add("card");
 
                    cardModelo.innerHTML = `
                    <h2>${produto.nome}</h2>
                    <p>Fabricante : ${produto.fornecedor.nome}</p>
                    `;
                    produtosContainer.appendChild(cardModelo);
                });
            })
            .catch(error => {
                console.error("Erro: ", error);
                produtosContainer.innerHTML = '<p> Erro ao carregar produtos! </p>'
            });
    }
 
    carregarProdutos();
});