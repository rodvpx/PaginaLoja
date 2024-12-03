// Array para armazenar os itens do carrinho
let cart = [];

// Função para abrir o carrinho
function openCart() {
  document.getElementById("cart-modal").style.display = "flex";
  updateCartUI();
}

// Função para fechar o carrinho
function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// Função para adicionar itens ao carrinho
function addToCart(productName, price) {
  // Adiciona o item ao array do carrinho
  cart.push({ name: productName, price });
  alert(`${productName} foi adicionado ao carrinho!`);
  updateCartUI();
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = ""; // Limpa a lista

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} 
                    <button onclick="removeFromCart(${index})">Remover</button>`;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = `R$ ${total.toFixed(2)}`;
}

// Função para remover itens do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Manipula o formulário de contato para enviar uma mensagem
const form = document.querySelector(".form-contato");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Mensagem enviada com sucesso!");
  form.reset();
});
