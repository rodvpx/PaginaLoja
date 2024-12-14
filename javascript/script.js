// Carrinho de compras
let carrinho = {};  // Usando um objeto para armazenar os produtos no carrinho

// Função para abrir o modal do carrinho
function openCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'flex';
  atualizarCarrinho();
}

// Função para fechar o modal do carrinho
function closeCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'none';
}

// Função para adicionar ou atualizar um produto no carrinho
function adicionarAoCarrinho(nome, preco) {
  // Verifica se o produto já está no carrinho
  if (!carrinho[nome]) {
    carrinho[nome] = { nome, preco, quantidade: 1 };
  } else {
    carrinho[nome].quantidade += 1;  // Aumenta a quantidade se o produto já estiver no carrinho
  }
  atualizarCarrinho();
}

// Função para remover um produto do carrinho
function removerDoCarrinho(nome) {
  delete carrinho[nome];
  atualizarCarrinho();
}

// Função para alterar a quantidade de um produto
function alterarQuantidade(nome, quantidade) {
  if (quantidade <= 0) {
    removerDoCarrinho(nome);
  } else {
    carrinho[nome].quantidade = quantidade;
    atualizarCarrinho();
  }
}

// Função para atualizar a lista de itens no carrinho
function atualizarCarrinho() {
  const lista = document.getElementById('produtos-carrinho');
  const total = document.getElementById('total-carrinho');
  lista.innerHTML = '';  // Limpa a lista de itens

  let soma = 0;
  for (const produto in carrinho) {
    const item = carrinho[produto];
    soma += item.preco * item.quantidade;

    // Cria o item de produto no carrinho
    const divProduto = document.createElement('div');
    divProduto.classList.add('produto-carrinho');

    divProduto.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <div class="quantidade">
        <button onclick="alterarQuantidade('${item.nome}', ${item.quantidade - 1})">-</button>
        <span>${item.quantidade}</span>
        <button onclick="alterarQuantidade('${item.nome}', ${item.quantidade + 1})">+</button>
        <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
      </div>
    `;

    lista.appendChild(divProduto);
  }

  // Atualiza o valor total
  total.innerHTML = `Total: R$ ${soma.toFixed(2)}`;
}

// Função para mostrar todos os produtos
function todosProdutos() {
  const produtos = document.querySelectorAll('.produto-card');
  produtos.forEach(produto => {
    produto.style.display = 'block';  // Exibe todos os produtos
  });
}

// Função para filtrar produtos por categoria
function filtrarCategoria(categoria) {
  const produtos = document.querySelectorAll('.produto-card');
  produtos.forEach(produto => {
    if (categoria === 'todas') {
      produto.style.display = 'block';
    } else {
      produto.style.display = produto.dataset.categoria === categoria ? 'block' : 'none';
    }
  });
}

// Carrossel
let slideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  const slides = document.querySelectorAll('.carousel-item');
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  const slides = document.querySelectorAll('.carousel-item');
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Iniciar carrossel ao carregar a página
window.onload = function () {
  showSlide(slideIndex);
  document.querySelector('.prev').addEventListener('click', prevSlide);
  document.querySelector('.next').addEventListener('click', nextSlide);

  // Mudar os slides automaticamente a cada 3 segundos (3000ms)
  setInterval(nextSlide, 3000);
};

// Menu responsivo
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Suavizar o clique no logo para rolar até o topo
document.querySelector('.logo a').addEventListener('click', function (e) {
  e.preventDefault(); // Impede o comportamento padrão
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Rolagem suave para o topo
});

// Função para alternar a visibilidade do carrinho
function toggleCarrinho() {
  const carrinhoDiv = document.getElementById('carrinho');
  carrinhoDiv.style.display = carrinhoDiv.style.display === 'none' ? 'block' : 'none';
}

// Função para finalizar a compra
function finalizarCompra() {
  alert("Compra finalizada! Total: " + calcularTotal());
  carrinho = {};  // Limpa o carrinho
  atualizarCarrinho();  // Atualiza a exibição do carrinho
}

// Função para calcular o total da compra
function calcularTotal() {
  let total = 0;
  for (const produto in carrinho) {
    total += carrinho[produto].preco * carrinho[produto].quantidade;
  }
  return total.toFixed(2);
}
