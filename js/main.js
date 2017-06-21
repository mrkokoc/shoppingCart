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
}


// removes all by item name
function removeItemFromCartAll(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
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
}


// clear cart
function clearCart() {
    cart = []
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


addItemToCart("Apple", 1.99, 5);
addItemToCart("Banana", 0.99, 2);
addItemToCart("Orange", 2.99, 10);
addItemToCart("Tomato", 1.49, 3);
addItemToCart("Apple", 1.99, 5);
addItemToCart("Grape", 3.99, 1);
addItemToCart("Peach", 0.49, 4);

console.log(cart.length);
console.log(cart);

removeItemFromCart("Apple");

console.log(cart.length);
console.log(countCart());
console.log(totalCartCost());





// listCart // array of Item

// saveCart

// loadCart