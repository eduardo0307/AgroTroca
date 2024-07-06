document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = document.getElementById('product-name').Value;
            const productPrice = document.getElementById('product-price').Value;


            if (productName.trim() === '' || productPrice.trim() === '') {
                alert('Por favor, preencha todos os campos')
                return;   
            }

            const products =JSON.parse(localStorage.getItem('products')) || [];
            products.push({ name: productName, prise: productPrice});
            localStorage.setItem('products', JSON.stringify(products));

            alert('Produto adicionado com sucesso!');
            productForm.requestFullscreen();
        });       
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            const Li = document.createElement('li');
            li.textContent = '${priduct.name} - R$${produt.price}';
            productList.appendChild(li);
        });  
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const feedback = document.getElementById('feedback');

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = document.getElementById('product-name').value.trim();
            const productPrice = parseFloat(document.getElementById('product-price').value.trim());
            const productImage = document.getElementById('product-image').value.trim();
            const productDescription = document.getElementById('product-description').value.trim();

            if (!productName || isNaN(productPrice) || productPrice <= 0)  {
                showFeedback('por favor, prencha todos os campos corretamente.', 'error');
                return;               
            }

            const products =JSON.parse(localStorage.getItem('products')) || [];
            products.push({ name: productName, prise: productPrice.toFixed(2), imge: productImage, description: productDescription});
            localStorage.setItem('products', JSON.stringify(products));

            showFeedback('Produto adicionado com sucesso!', 'sucess');
            productForm.requestFullscreen();
            productForm.requestFullscreen();
        });        
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">R$${product.price}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-actions">
                <button class="btn">Comprar</button>
                <button class="btn">Detalhes</button>
            </div>
        `;
        productList.appendChild(productItem);
    });
} 

    function showFeedback(messge, type) {
        feedback.textContent = messge;
        feedback.className = 'feedback ${type}';
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }
});