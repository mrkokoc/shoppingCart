$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));

    addItemToCart(name, price, 1);
    displayCart();
});

$("#clear-cart").click(function (event) {
    event.preventDefault();
    clearCart();
    displayCart();
});

$("#show-cart").on("click", ".btn-add-to-cart", function () {
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    addItemToCart(name, price, 1);
    displayCart();
});

$("#show-cart").on("click", ".btn-remove-item", function (event) {
    var name = $(this).attr("data-name");
    removeItemFromCart(name);
    displayCart();
});

$("#show-cart").on("click", ".btn-delete-all", function (event) {
    var name = $(this).attr("data-name");
    removeItemFromCartAll(name);
    displayCart();
});

// fills <ul id="show-cart">
function displayCart() {
    var cartArray = listCart();
    var output = '';
    for (var i in cartArray) {
        output += "<li>"
                + cartArray[i].name
                + ": " + cartArray[i].count
                + " x $"
                + cartArray[i].price
                + " = $"
                + cartArray[i].total
                + "<button class='btn-add-to-cart' data-name='" + cartArray[i].name + "' data-price='" + cartArray[i].price + "'>" +
                "<i class='glyphicon glyphicon-plus'></i></button>"
                + "<button class='btn-remove-item' data-name='" + cartArray[i].name + "'><i class='glyphicon glyphicon-minus'></i></button>"
                + "<button class='btn-delete-all' data-name='" + cartArray[i].name + "'><i class='glyphicon glyphicon-remove'></i></button>"
                + "</li>";
    }
    $("#show-cart").html(output);
    $("#total-items").text(countCart());
    $("#total-price").text(totalCartCost());
}


//  ***********************  //
//  Shopping cart functions  //

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
            saveCart();
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
            cart[i].count--;
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
function totalCartCost() {
    var totalPrice = 0;
    for (var i in cart) {
        totalPrice += cart[i].price * cart[i].count;
    }
    return totalPrice.toFixed(2);
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
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}


// saves cart
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(listCart()));
}


// loads cart
function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();
displayCart();
