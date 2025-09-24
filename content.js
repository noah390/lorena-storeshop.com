// console.clear();

let contentTitle;

// Update cart badge function
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const badge = document.getElementById('badge');
    if (badge) badge.textContent = totalItems;
}

console.log(document.cookie);
function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "contentDetails.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("₦" + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// FIREBASE API CALLING WITH FALLBACK
async function loadProducts() {
  try {
    let products = [];
    
    // Try Firebase first
    if (typeof FirebaseProductsAPI !== 'undefined') {
      try {
        products = await FirebaseProductsAPI.getProducts();
      } catch (firebaseError) {
        console.log('Firebase error, using fallback:', firebaseError);
        products = getTestProducts();
      }
    } else {
      products = getTestProducts();
    }
    
    contentTitle = products;
    updateCartBadge();
    
    for (let i = 0; i < products.length; i++) {
      const product = {
        ...products[i],
        preview: products[i].image || products[i].imageURL || 'https://via.placeholder.com/300x200',
        photos: [products[i].image || products[i].imageURL || 'https://via.placeholder.com/300x200'],
        brand: products[i].brand || 'Lorena',
        isAccessory: products[i].isAccessory || products[i].category === 'accessories'
      };
      
      if (product.isAccessory) {
        if(containerAccessories) containerAccessories.appendChild(
          dynamicClothingSection(product)
        );
      } else {
        if(containerClothing) containerClothing.appendChild(
          dynamicClothingSection(product)
        );
      }
    }
    
    // Also populate products grid on home page
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
      productsGrid.innerHTML = '';
      products.slice(0, 8).forEach(product => {
        const productData = {
          ...product,
          preview: product.image || product.imageURL || 'https://via.placeholder.com/300x200',
          brand: product.brand || 'Lorena'
        };
        productsGrid.appendChild(dynamicClothingSection(productData));
      });
    }
  } catch (error) {
    console.log('Failed to load products:', error);
    loadTestProducts();
  }
}

// Fallback test products
function getTestProducts() {
  const stored = localStorage.getItem('testProducts');
  if (stored) return JSON.parse(stored);
  
  return [
    { id: '1', name: 'Summer Dress', price: 15000, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', category: 'clothing', isAccessory: false, brand: 'Lorena' },
    { id: '2', name: 'Designer Handbag', price: 25000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'accessories', isAccessory: true, brand: 'Lorena' },
    { id: '3', name: 'Classic Shirt', price: 8000, image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400', category: 'clothing', isAccessory: false, brand: 'Lorena' },
    { id: '4', name: 'Gold Necklace', price: 12000, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', category: 'jewelry', isAccessory: true, brand: 'Lorena' }
  ];
}

function loadTestProducts() {
  const products = getTestProducts();
  const productsGrid = document.getElementById('products-grid');
  if (productsGrid) {
    productsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #e75480;">Showing test products (Firebase connection issue)</div>';
    products.forEach(product => {
      const productData = {
        ...product,
        preview: product.image,
        photos: [product.image]
      };
      productsGrid.appendChild(dynamicClothingSection(productData));
    });
  }
}

// Load products when page loads
loadProducts();

// Functions for specific page rendering
async function renderAccessories() {
  try {
    const products = await FirebaseProductsAPI.getProducts();
    const container = document.getElementById('containerAccessories');
    if(container) {
      container.innerHTML = '';
      products.filter(p => p.isAccessory || p.category === 'accessories').forEach(product => {
        const productData = {
          ...product,
          preview: product.image || product.imageURL || 'https://via.placeholder.com/300x200',
          photos: [product.image || product.imageURL || 'https://via.placeholder.com/300x200'],
          brand: product.brand || 'Lorena',
          isAccessory: true
        };
        container.appendChild(dynamicClothingSection(productData));
      });
    }
  } catch (error) {
    console.log('Failed to load accessories:', error);
  }
}

async function renderClothing() {
  try {
    const products = await FirebaseProductsAPI.getProducts();
    const container = document.getElementById('containerClothing');
    if(container) {
      container.innerHTML = '';
      products.filter(p => !p.isAccessory && p.category !== 'accessories').forEach(product => {
        const productData = {
          ...product,
          preview: product.image || product.imageURL || 'https://via.placeholder.com/300x200',
          photos: [product.image || product.imageURL || 'https://via.placeholder.com/300x200'],
          brand: product.brand || 'Lorena',
          isAccessory: false
        };
        container.appendChild(dynamicClothingSection(productData));
      });
    }
  } catch (error) {
    console.log('Failed to load clothing:', error);
  }
}
