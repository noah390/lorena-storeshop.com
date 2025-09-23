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

// BACKEND CALLING

let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status == 200) {
      // console.log('call successful');
      contentTitle = JSON.parse(this.responseText);
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isAccessory) {
          console.log(contentTitle[i]);
          if(containerAccessories) containerAccessories.appendChild(
            dynamicClothingSection(contentTitle[i])
          );
        } else {
          console.log(contentTitle[i]);
          if(containerClothing) containerClothing.appendChild(
            dynamicClothingSection(contentTitle[i])
          );
        }
      }
    } else {
      console.log("call failed!");
    }
  }
};
httpRequest.open(
  "GET",
  "http://localhost:4000/api/products",
  true
);
httpRequest.send();

// Functions for specific page rendering
function renderAccessories() {
  fetch('http://localhost:4000/api/products')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('containerAccessories');
      if(container) {
        container.innerHTML = '';
        products.filter(p => p.isAccessory).forEach(product => {
          container.appendChild(dynamicClothingSection(product));
        });
      }
    })
    .catch(err => console.log('Failed to load accessories'));
}

function renderClothing() {
  fetch('http://localhost:4000/api/products')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('containerClothing');
      if(container) {
        container.innerHTML = '';
        products.filter(p => !p.isAccessory).forEach(product => {
          container.appendChild(dynamicClothingSection(product));
        });
      }
    })
    .catch(err => console.log('Failed to load clothing'));
}
