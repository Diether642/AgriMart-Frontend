// SELLER LOGIC SCRIPT

// 1. Initial Dummy Data
// NOTE: Placeholder image URLs are used here. Replace with actual assets if available.
let myProducts = [
  { name: 'Fresh Carrots', category: 'Vegetables', price: '45.00', img: 'assets/img/product/carrot.png', id: 1, desc: 'Organic, locally sourced carrots.' },
  { name: 'Red Apples', category: 'Fruits', price: '25.00', img: 'assets/img/product/apple.png', id: 2, desc: 'Sweet and crisp red apples.' },
  { name: 'Ginger', category: 'Spices', price: '15.00', img: 'assets/img/product/garlic.png', id: 3, desc: 'Fresh ginger root.' }
];

// 2. Render Products
function renderInventory() {
  const container = document.getElementById('seller-products-container');
  const badge = document.getElementById('product-count-badge');
  const dashCount = document.getElementById('dashboard-count');
  
  container.innerHTML = '';
  badge.innerText = myProducts.length;
  dashCount.innerText = myProducts.length;

  if(myProducts.length === 0) {
    container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No products yet. Click "Add New Product".</p></div>';
    return;
  }

  myProducts.forEach((product, index) => {
    const cardHTML = `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-info">
          <span class="badge bg-light text-dark mb-2">${product.category}</span>
          <h5>${product.name}</h5>
          <p class="price">₱${product.price}</p>
          
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-outline-primary btn-sm flex-grow-1 rounded-pill" onclick="editProduct(${index})">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-outline-danger btn-sm rounded-pill" onclick="deleteProduct(${index})">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// 3. Handle Image Preview (Mocks upload with a local URL)
window.previewImage = function(input) {
  const imagePreview = document.getElementById('image-preview');
  const imageIcon = document.getElementById('image-icon');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
      imageIcon.style.display = 'none';
    }
    reader.readAsDataURL(input.files[0]);
  } else {
     imagePreview.style.display = 'none';
     imageIcon.style.display = 'block';
  }
}

// 4. Handle Form Submission (Add or Update)
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    if (!productForm) return;

    productForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('product-name').value;
      const category = document.getElementById('product-category').value;
      // Using .valueAsNumber is better for number inputs
      const price = parseFloat(document.getElementById('product-price').value).toFixed(2); 
      const desc = document.getElementById('product-desc').value;
      const editIndex = parseInt(document.getElementById('edit-mode-index').value);
      
      let imgUrl = 'https://via.placeholder.com/100x100/cccccc/333333?text=Product'; // Fallback

      const imagePreview = document.getElementById('image-preview');
      if (imagePreview.style.display === 'block' && imagePreview.src) {
        imgUrl = imagePreview.src;
      } else if (editIndex > -1) {
        // Keep existing image if editing
        imgUrl = myProducts[editIndex].img;
      }

      const productData = { name, category, price, img: imgUrl, id: Date.now(), desc };

      if(editIndex > -1) {
        // Update existing
        myProducts[editIndex] = productData;
        alert('Product Updated Successfully!');
      } else {
        // Add new
        myProducts.push(productData);
        alert('Product Published Successfully!');
      }

      resetForm();
      renderInventory();
      switchToTab('inventory');
    });
});


// 5. Edit Product Function
window.editProduct = function(index) {
  const product = myProducts[index];
  
  switchToTab('add-product');

  // Populate fields
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-desc').value = product.desc || "";
  document.getElementById('edit-mode-index').value = index;

  // Update UI
  document.getElementById('form-title').innerText = "Edit Product";
  document.getElementById('save-btn').innerText = "Update Product";
  document.getElementById('save-btn').classList.remove('btn-primary');
  document.getElementById('save-btn').classList.add('btn-success');

  // Show current image
  document.getElementById('image-preview').src = product.img;
  document.getElementById('image-preview').style.display = 'block';
  document.getElementById('image-icon').style.display = 'none';
};

// 6. Delete Product Function
window.deleteProduct = function(index) {
  if(confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    myProducts.splice(index, 1);
    renderInventory();
  }
};

// 7. Reset Form
window.resetForm = function() {
  document.getElementById('product-form').reset();
  document.getElementById('edit-mode-index').value = -1;
  document.getElementById('form-title').innerText = "Add New Product";
  document.getElementById('save-btn').innerText = "Publish Product";
  document.getElementById('save-btn').classList.add('btn-primary');
  document.getElementById('save-btn').classList.remove('btn-success');
  
  // Reset Image input and preview
  document.getElementById('product-image').value = null;
  document.getElementById('image-preview').src = "";
  document.getElementById('image-preview').style.display = 'none';
  document.getElementById('image-icon').style.display = 'block';
};

// Helper: Switch Bootstrap Tabs Programmatically
window.switchToTab = function(tabId) {
  const triggerEl = document.querySelector(`a[href="#${tabId}"]`);
  if (triggerEl && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
    const tab = new bootstrap.Tab(triggerEl);
    tab.show();
  }
};

// Initialize the inventory view when the page loads
window.addEventListener('load', renderInventory);
