console.clear()

let id = location.search.split('?')[1]
console.log(id)

// Update cart badge from localStorage
let cart = JSON.parse(localStorage.getItem('cart') || '{}');
let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
if(document.getElementById("badge")) {
    document.getElementById("badge").innerHTML = totalItems;
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('₦ ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    let buttonText = document.createTextNode('Add to Cart')
    buttonTag.style.cssText = 'background: #e75480; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s;'
    buttonTag.onmouseover = function() { this.style.background = '#d63384'; this.style.transform = 'translateY(-2px)'; }
    buttonTag.onmouseout = function() { this.style.background = '#e75480'; this.style.transform = 'translateY(0)'; }
    
    buttonTag.onclick = function()
    {
        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        
        // Add or increment item
        if(cart[id]) {
            cart[id] += 1;
        } else {
            cart[id] = 1;
        }
        
        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update badge
        let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        document.getElementById("badge").innerHTML = totalItems;
        
        // Show feedback
        const originalText = buttonText.textContent;
        buttonText.textContent = 'Added!';
        buttonTag.style.background = '#28a745';
        
        setTimeout(() => {
            buttonText.textContent = originalText;
            buttonTag.style.background = '#e75480';
        }, 1000);
        
        console.log('Added to cart:', cart);
    }
    buttonTag.appendChild(buttonText)


    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}



// BACKEND CALLING

let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', 'http://localhost:4000/api/products/'+id, true)
httpRequest.send()  
