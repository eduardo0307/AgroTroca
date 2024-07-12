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

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('products-list');
    const feedback = document.getElementById('feedback');
    const filterBrand = document.getElementById('filter-brand');
    const filterPrice = document.getElementById('filter-price');
    const filterType = document.getElementById('filter-type');
    const filterCondition = document.getElementById('filter-condition');
    const filterRating = document.getElementById('filter-rating');
    const filterDiscount = document.getElementById('filter-discount');
    const applyFiltersButton = document.getElementById('apply-filters');

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = document.getElementById('product-name').value.trim();
            const productPrice = parseFloat(document.getElementById('product-price').value.trim());
            const productImage = document.getElementById('product-image').value.trim();
            const productDescription = document.getElementById('product-description').value.trim();
            const productBrand = document.getElementById('product-brand').value.trim();
            const productType = document.getElementById('product-type').value;
            const productCondition = document.getElementById('product-condition').value;
            const productDiscount = parseFloat(document.getElementById('product-discount').value.trim());
            const productRating = parseFloat(document.getElementById('product-rating').value.trim());

            if (!productName || isNaN(productPrice) || productPrice <= 0 || !productImage || !productDescription || !productBrand || isNaN(productDiscount) || productDiscount < 0 || productDiscount > 100 || isNaN(productRating) || productRating < 1 || productRating > 5) {
                showFeedback('Por favor, preencha todos os campos corretamente.', 'error');
                return;
            }

            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({
                name: productName,
                price: productPrice.toFixed(2),
                image: productImage,
                description: productDescription,
                brand: productBrand,
                type: productType,
                condition: productCondition,
                discount: productDiscount,
                rating: productRating
            });
            localStorage.setItem('products', JSON.stringify(products));

            showFeedback('Produto adicionado com sucesso!', 'success');
            productForm.reset();
        });
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">R$${product.price}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-brand">Marca: ${product.brand}</div>
                <div class="product-type">Tipo: ${product.type}</div>
                <div class="product-condition">Condição: ${product.condition}</div>
                <div class="product-discount">Desconto: ${product.discount}%</div>
                <div class="product-rating">Avaliação: ${product.rating} estrelas</div>
                <div class="product-actions">
                    <button class="btn">Comprar</button>
                    <button class="btn">Detalhes</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        displayProducts(products);
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const filteredProducts = JSON.parse(localStorage.getItem('products')) || [];
            const brandFilter = filterBrand.value.trim().toLowerCase();
            const priceFilter = parseFloat(filterPrice.value.trim());
            const typeFilter = filterType.value;
            const conditionFilter = filterCondition.value;
            const ratingFilter = parseFloat(filterRating.value.trim());
            const discountFilter = filterDiscount.checked;

            const filtered = filteredProducts.filter(product => {
                const matchesBrand = !brandFilter || product.brand.toLowerCase().includes(brandFilter);
                const matchesPrice = isNaN(priceFilter) || product.price <= priceFilter;
                const matchesType = !typeFilter || product.type === typeFilter;
                const matchesCondition = !conditionFilter || product.condition === conditionFilter;
                const matchesRating = isNaN(ratingFilter) || product.rating >= ratingFilter;
                const matchesDiscount = !discountFilter || product.discount > 0;

                return matchesBrand && matchesPrice && matchesType && matchesCondition && matchesRating && matchesDiscount;
            });

            displayProducts(filtered);
        });
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('products-list');
    const feedback = document.getElementById('feedback');
    const categorySelect = document.getElementById('product-category');
    const additionalFieldsContainer = document.getElementById('additional-fields');
    const filterBrand = document.getElementById('filter-brand');
    const filterPrice = document.getElementById('filter-price');
    const filterType = document.getElementById('filter-type');
    const filterCondition = document.getElementById('filter-condition');
    const filterRating = document.getElementById('filter-rating');
    const filterDiscount = document.getElementById('filter-discount');
    const applyFiltersButton = document.getElementById('apply-filters');

    const additionalFields = {
        Eletrônicos: '',
        Alimentos: '',
        Roupas: `
            <label for="product-gender">Gênero:</label>
            <select id="product-gender" required>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
            </select>
            <label for="product-size">Tamanho:</label>
            <input type="text" id="product-size" required>
        `,
        Sapatos: `
            <label for="product-size">Tamanho do Sapato:</label>
            <input type="text" id="product-size" required>
        `
    };

    categorySelect.addEventListener('change', () => {
        additionalFieldsContainer.innerHTML = additionalFields[categorySelect.value] || '';
    });

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = document.getElementById('product-name').value.trim();
            const productPrice = parseFloat(document.getElementById('product-price').value.trim());
            const productImage = document.getElementById('product-image').value.trim();
            const productDescription = document.getElementById('product-description').value.trim();
            const productBrand = document.getElementById('product-brand').value.trim();
            const productType = document.getElementById('product-type').value;
            const productCondition = document.getElementById('product-condition').value;
            const productDiscount = parseFloat(document.getElementById('product-discount').value.trim());
            const productRating = parseFloat(document.getElementById('product-rating').value.trim());
            const productCategory = document.getElementById('product-category').value;
            const productGender = document.getElementById('product-gender')?.value || '';
            const productSize = document.getElementById('product-size')?.value || '';

            if (!productName || isNaN(productPrice) || productPrice <= 0 || !productImage || !productDescription || !productBrand || isNaN(productDiscount) || productDiscount < 0 || productDiscount > 100 || isNaN(productRating) || productRating < 1 || productRating > 5) {
                showFeedback('Por favor, preencha todos os campos corretamente.', 'error');
                return;
            }

            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({
                name: productName,
                price: productPrice.toFixed(2),
                image: productImage,
                description: productDescription,
                brand: productBrand,
                type: productType,
                condition: productCondition,
                discount: productDiscount,
                rating: productRating,
                category: productCategory,
                gender: productGender,
                size: productSize
            });
            localStorage.setItem('products', JSON.stringify(products));

            showFeedback('Produto adicionado com sucesso!', 'success');
            productForm.reset();
            additionalFieldsContainer.innerHTML = '';
        });
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">R$${product.price}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-brand">Marca: ${product.brand}</div>
                <div class="product-type">Tipo: ${product.type}</div>
                <div class="product-condition">Condição: ${product.condition}</div>
                <div class="product-discount">Desconto: ${product.discount}%</div>
                <div class="product-rating">Avaliação: ${product.rating} estrelas</div>
                ${product.category === 'Roupas' || product.category === 'Sapatos' ? `<div class="product-gender">Gênero: ${product.gender}</div>` : ''}
                ${product.size ? `<div class="product-size">Tamanho: ${product.size}</div>` : ''}
                <div class="product-actions">
                    <button class="btn">Comprar</button>
                    <button class="btn">Detalhes</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        displayProducts(products);
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const filteredProducts = JSON.parse(localStorage.getItem('products')) || [];
            const brandFilter = filterBrand.value.trim().toLowerCase();
            const priceFilter = parseFloat(filterPrice.value.trim());
            const typeFilter = filterType.value;
            const conditionFilter = filterCondition.value;
            const ratingFilter = parseFloat(filterRating.value.trim());
            const discountFilter = filterDiscount.checked;

            const filtered = filteredProducts.filter(product => {
                const matchesBrand = !brandFilter || product.brand.toLowerCase().includes(brandFilter);
                const matchesPrice = isNaN(priceFilter) || product.price <= priceFilter;
                const matchesType = !typeFilter || product.type === typeFilter;
                const matchesCondition = !conditionFilter || product.condition === conditionFilter;
                const matchesRating = isNaN(ratingFilter) || product.rating >= ratingFilter;
                const matchesDiscount = !discountFilter || product.discount > 0;

                return matchesBrand && matchesPrice && matchesType && matchesCondition && matchesRating && matchesDiscount;
            });

            displayProducts(filtered);
        });
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('products-list');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Filtrar e exibir produtos
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">R$${product.price}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-brand">Marca: ${product.brand}</div>
                <div class="product-type">Tipo: ${product.type}</div>
                <div class="product-condition">Condição: ${product.condition}</div>
                <div class="product-discount">Desconto: ${product.discount}%</div>
                <div class="product-rating">Avaliação: ${product.rating} estrelas</div>
                ${product.category === 'Roupas' || product.category === 'Sapatos' ? `<div class="product-gender">Gênero: ${product.gender}</div>` : ''}
                ${product.size ? `<div class="product-size">Tamanho: ${product.size}</div>` : ''}
                <div class="product-actions">
                    <button class="btn">Comprar</button>
                    <button class="btn">Detalhes</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    // Carregar produtos do localStorage ao carregar a página
    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        displayProducts(products);
    }

    // Filtrar produtos com base na pesquisa
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
            displayProducts(filteredProducts);
        });
    }
});