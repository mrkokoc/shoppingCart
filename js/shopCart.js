var cart = [];

var Item = function (name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count
};


// adds item(s) in cart
function addItemToCart(name, price, count) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            return;
        }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
}


// removes all by item name
function removeItemFromCartAll(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
}


// removes one item from cart
function removeItemFromCart(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count --;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
}


// clear cart
function clearCart() {
    cart = [];
    saveCart();
}


// count cart items
function countCart() {
    var totalCount = 0;
    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
}


// total cart cost
function totalCartCost(price) {
    var totalPrice = 0;
    for (var i in cart) {
        totalPrice += cart[i].price
    }
    return totalPrice;
}


// list cart
function listCart() {
    var cartCopy = [];
    for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}


// saves cart
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}


// loads cart
function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
