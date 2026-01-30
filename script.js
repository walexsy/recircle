// Sample products data
let products = [
  {
    id: 1,
    title: "MacBook Pro 2019 - 16 inch",
    category: "electronics",
    price: 1200,
    description: "Excellent condition, barely used. Comes with original charger and box. 16GB RAM, 512GB SSD. Perfect for work or creative projects.",
    image: "https://picsum.photos/seed/macbook/400/300",
    seller: "Sarah Chen",
    contact: "sarah.chen@email.com",
    date: "2024-01-28"
  },
  {
    id: 2,
    title: "IKEA Desk - White",
    category: "furniture",
    price: 85,
    description: "Sturdy white desk, great for home office. Minor scratches on surface but overall in good condition. Dimensions: 120cm x 60cm.",
    image: "https://picsum.photos/seed/desk/400/300",
    seller: "Mike Johnson",
    contact: "+1234567890",
    date: "2024-01-27"
  },
  {
    id: 3,
    title: "Nike Running Shoes - Size 10",
    category: "clothing",
    price: 45,
    description: "Gently used Nike running shoes. Size 10 (US Men's). Very comfortable, only worn a handful of times. Great for jogging or gym.",
    image: "https://picsum.photos/seed/shoes/400/300",
    seller: "Alex Rivera",
    contact: "alex.r@email.com",
    date: "2024-01-26"
  },
  {
    id: 4,
    title: "The Complete Harry Potter Collection",
    category: "books",
    price: 60,
    description: "All 7 books in hardcover, excellent condition. Perfect gift or for collectors. No marks or damage.",
    image: "https://picsum.photos/seed/books/400/300",
    seller: "Emily Watson",
    contact: "emily.w@email.com",
    date: "2024-01-25"
  },
  {
    id: 5,
    title: "Gaming Chair - Ergonomic",
    category: "furniture",
    price: 150,
    description: "Black and red gaming chair with lumbar support. Very comfortable for long sessions. Minor wear on armrests.",
    image: "https://picsum.photos/seed/chair/400/300",
    seller: "David Kim",
    contact: "+1987654321",
    date: "2024-01-24"
  },
  {
    id: 6,
    title: "Canon EOS M50 Camera",
    category: "electronics",
    price: 450,
    description: "Mirrorless camera in great condition. Includes 15-45mm kit lens, battery, charger, and camera bag. Low shutter count.",
    image: "https://picsum.photos/seed/camera/400/300",
    seller: "Lisa Park",
    contact: "lisa.park@email.com",
    date: "2024-01-23"
  },
  {
    id: 7,
    title: "Mountain Bike - 21 Speed",
    category: "sports",
    price: 220,
    description: "Great condition mountain bike, perfect for trails. Recently serviced with new brakes and chain. 26 inch wheels.",
    image: "https://picsum.photos/seed/bike/400/300",
    seller: "Tom Anderson",
    contact: "+1122334455",
    date: "2024-01-22"
  },
  {
    id: 8,
    title: "Vintage Leather Jacket",
    category: "clothing",
    price: 95,
    description: "Genuine leather jacket, size Medium. Classic style, very well maintained. Perfect for fall and winter.",
    image: "https://picsum.photos/seed/jacket/400/300",
    seller: "Rachel Green",
    contact: "rachel.g@email.com",
    date: "2024-01-21"
  }
];

// Initialize app
function init() {
  renderProducts(products);
  showSection('browse');
}

// Show/hide sections
function showSection(section) {
  const browseSection = document.getElementById('browse-section');
  const sellSection = document.getElementById('sell-section');
  
  if (section === 'browse') {
    browseSection.classList.remove('hidden');
    sellSection.classList.add('hidden');
    renderProducts(products);
  } else {
    browseSection.classList.add('hidden');
    sellSection.classList.remove('hidden');
  }
}

// Render products
function renderProducts(productsToRender) {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  
  if (productsToRender.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }
  
  grid.classList.remove('hidden');
  emptyState.classList.add('hidden');
  
  grid.innerHTML = productsToRender.map(product => `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onclick="showProductModal(${product.id})">
      <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${product.title}</h3>
        <div class="flex items-center justify-between mb-3">
          <span class="text-2xl font-bold text-blue-600">$${product.price.toFixed(2)}</span>
          <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">${getCategoryLabel(product.category)}</span>
        </div>
        <p class="text-sm text-gray-600 line-clamp-2 mb-3">${product.description}</p>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>${product.seller}</span>
          <span>${formatDate(product.date)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter products
function filterProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;
  
  let filtered = products;
  
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  renderProducts(filtered);
}

// Show product modal
function showProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const modal = document.getElementById('product-modal');
  const modalContent = document.getElementById('modal-content');
  
  modalContent.innerHTML = `
    <div class="relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10">
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover rounded-t-xl">
      
      <div class="p-6">
        <div class="mb-4">
          <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">${getCategoryLabel(product.category)}</span>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.title}</h2>
        <p class="text-3xl font-bold text-blue-600 mb-4">$${product.price.toFixed(2)}</p>
        
        <div class="mb-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed">${product.description}</p>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Seller Information</h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-gray-700">${product.seller}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a href="mailto:${product.contact}" class="text-blue-600 hover:underline">${product.contact}</a>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-gray-500 text-sm">Listed ${formatDate(product.date)}</span>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <a href="mailto:${product.contact}?subject=Interest in: ${product.title}" class="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
            Contact Seller
          </a>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
  document.getElementById('product-modal').classList.add('hidden');
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();
  
  const newProduct = {
    id: products.length + 1,
    title: document.getElementById('title').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value,
    image: document.getElementById('image').value || `https://picsum.photos/seed/${Date.now()}/400/300`,
    seller: document.getElementById('seller-name').value,
    contact: document.getElementById('contact').value,
    date: new Date().toISOString().split('T')[0]
  };
  
  products.unshift(newProduct);
  
  document.getElementById('sell-form').reset();
  
  showSection('browse');
  
  setTimeout(() => {
    showProductModal(newProduct.id);
  }, 100);
}

// Utility functions
function getCategoryLabel(category) {
  const labels = {
    electronics: 'Electronics',
    furniture: 'Furniture',
    clothing: 'Clothing',
    books: 'Books',
    sports: 'Sports & Outdoors',
    other: 'Other'
  };
  return labels[category] || category;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Close modal on outside click
document.getElementById('product-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Initialize on load
init();