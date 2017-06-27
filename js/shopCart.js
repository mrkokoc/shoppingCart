$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));

    shoppingCart.addItemToCart(name, price, 1);
    shoppingCart.displayCart();
});


$("#clear-cart").click(function (event) {
    event.preventDefault();
    shoppingCart.clearCart();
    shoppingCart.displayCart();
});


$("#show-cart").on("click", ".btn-add-to-cart", function () {
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    shoppingCart.addItemToCart(name, price, 1);
    shoppingCart.displayCart();
});


$("#show-cart").on("click", ".btn-remove-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    shoppingCart.displayCart();
});


$("#show-cart").on("click", ".btn-delete-all", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    shoppingCart.displayCart();
});


//  ***********************  //
//  Shopping cart functions  //

var shoppingCart = {};

shoppingCart.cart = [];


// fills <ul id="show-cart">
shoppingCart.displayCart = function () {
    var cartArray = this.listCart();
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
    $("#total-items").text(this.countCart());
    $("#total-price").text(this.totalCartCost());
};


// Object
shoppingCart.Item = function (name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count
};


// adds item(s) in cart
shoppingCart.addItemToCart = function (name, price, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count += count;
            this.saveCart();
            return;
        }
    }
    var item = new this.Item(name, price, count);
    this.cart.push(item);
    this.saveCart();
};


// removes all by item name
shoppingCart.removeItemFromCartAll = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
};


// removes one item from cart
shoppingCart.removeItemFromCart = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count--;
            if (this.cart[i].count === 0) {
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
};


// clear cart
shoppingCart.clearCart = function () {
    this.cart = [];
    this.saveCart();
};


// count cart items
shoppingCart.countCart = function () {
    var totalCount = 0;
    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount;
};


// total cart cost
shoppingCart.totalCartCost = function () {
    var totalPrice = 0;
    for (var i in this.cart) {
        totalPrice += this.cart[i].price * this.cart[i].count;
    }
    return totalPrice.toFixed(2);
};


// list cart
shoppingCart.listCart = function () {
    var cartCopy = [];
    for (var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
};


// saves cart
shoppingCart.saveCart = function () {
    localStorage.setItem("shoppingCart", JSON.stringify(this.listCart()));
};


// loads cart
shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
};

shoppingCart.loadCart();
shoppingCart.displayCart();
