// VARIABLES

const cartBtn = document.querySelector('.better');
const closeCartBtn = document.querySelector('.close-cartus');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cartus');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.breat');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cartus-content');
const cartItem = document.querySelector('.cartus-item');
const productDOM = document.querySelector('.carousel-slider');
const productsDOM = document.querySelector('.product-item');


//cart
let cart = [];
// buttons
let buttonsDOM = [];

// getting the products
class Products{
    async getProducts() {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image}
            });
          return products;
        } catch (error) {
          console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products){
        let result = '';
        products.forEach (product =>{
            result += `
            <div class="product-image">
                            <img src=${product.image}>
                            <p class="product-text">${product.title}<br>
                                <p class="text-price"><span class="pric">$300.00 </span><span class="pric-two">$${product.price}</span></p>
                                <a href="#"><button class="cart" data-id=${product.id}>Add to cart</button></a>
                            </p>
                        </div>
            `;
        });
        productsDOM.innerHTML = result;
    }
    getCartButtons(){
        const buttons = [...document.querySelectorAll(".cart")];
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.innerText = "In Cart";
                button.disabled = true;
            }
                button.addEventListener('click',(event) => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    // get product from products
                    let cartItem = {...Storage.getProduct(id), amount:1};
                    console.log(cartItem);
                    // add product to the cart
                    cart = [...cart, cartItem];
                    console.log(cart);
                    // save cart in the local storage
                    Storage.saveCart(cart)
                    // set cart values
                    this.setCartValues(cart);
                    // display cart items
                    this.addCartItem(cartItem);
                    // show the cart
                    this.showCart();
                })
        })
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cartus-item');
        div.innerHTML = `<div class="cartus-cart">
        <img src=${item.image}>
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <button class="remove-item" data-id=${item.id}>Remove</button>
        </div>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amt">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>`
    cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
    }
    populateCart(cart){
        cart.forEach(item =>this.addCartItem(item));
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    // clear cart button
cartLogic(){
    // clear Cart Button
    clearCartBtn.addEventListener('click', ()=>{
        this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener("click", event => {
        if (event.target.classList.contains("remove-item"))
        {
            let removeItem = event.target;
            let id = removeItem.dataset.id;
            cartContent.remove(removeItem.id);
            this.removeItem(id);
        } else if  (event.target.classList.contains("fa-chevron-up")) {
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id===id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;
        }
        else if  (event.target.classList.contains("fa-chevron-down")) {
            let lowerAmount = event.target;
            let  id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount - 1;
            if(tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.amount;
            }
            else{
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                this.removeItem(id);
            }
        }
    });
}
    // cart functionality
clearCart(){
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    console.log(cartContent.children);
    while(cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
}
removeItem(id){
    cart = cart.filter(item => item.id !==id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled - false;
    button.innerHTML = `Add to Cart`;
}
getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id=== id);
}
}

// Local storage
class Storage{
    static saveProducts(products) {
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    static saveCart(cart){
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

    // setup app
    ui.setupAPP();
    // get all products
    products.getProducts().then(products => 
        {ui.displayProducts(products)
        Storage.saveProducts(products);
        }).then(()=>{
            ui.getCartButtons();
            ui.cartLogic()
        });
});