const getAllProducts = async () => {
  try {
    const response = await fetch('/api/v1/products');
    const products = await response.json();
    const container = document.getElementById('products');
    for (let i = 0; i < products.length; i++) {
      const { name, price, desc } = products[i];
      const card = document.createElement('div');
      card.innerHTML = `<h1>${name}</h1><p>Price: $${price}</p><p>Description: ${desc}</p>`;
      container.appendChild(card);
    }
  } catch (error) {
    console.error('Error during fetching:', error);
  }
};
getAllProducts();