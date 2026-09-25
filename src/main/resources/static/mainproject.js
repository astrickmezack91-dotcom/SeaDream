function validateform() {

    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let nameError = document.getElementById("nameError");
    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");
    let sucessMsg = document.getElementById("sucessMsg");

    nameError.innerHTML = "";
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";
    sucessMsg.innerHTML = "";

    let valid = true;

    if (name.trim() === "") {

        nameError.innerHTML = "Name is required";
        valid = false;

    }
    else if (name.trim().length < 3) {

        nameError.innerHTML =
            "Name must contain at least 3 characters";

        valid = false;
    }


    if (username.trim() === "") {

        usernameError.innerHTML = "Username is required";
        valid = false;

    }
    else if (username.trim().length < 4) {

        usernameError.innerHTML =
            "Username must contain at least 4 characters";

        valid = false;
    }


    if (password.trim() === "") {

        passwordError.innerHTML = "Password is required";
        valid = false;

    }
    else if (password.length < 6) {

        passwordError.innerHTML =
            "Password must contain at least 6 characters";

        valid = false;
    }


    // Validation failed
    if (!valid) {
        return false;
    }


    // SEND USER DATA TO SPRING BOOT

    fetch("/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,
            username: username,
            password: password

        })

    })

        .then(function(response) {

            if (!response.ok) {
                throw new Error("User could not be saved");
            }

            return response.json();

        })

        .then(function(user) {

            console.log("User saved successfully:", user);

            sucessMsg.innerHTML =
                "Login Successful 🎉";

            setTimeout(function() {

                window.location.href = "/shop";

            }, 1000);

        })

        .catch(function(error) {

            console.error("Database Error:", error);

            sucessMsg.innerHTML =
                "Failed to save user ❌";

        });


    return false;
}



// =====================================================
// FIRST PANEL
// =====================================================

function openFreshwaterDrawer() {

    document
        .getElementById("freshwaterDrawer")
        .classList.add("open");

}


function closeFreshwaterDrawer() {

    document
        .getElementById("freshwaterDrawer")
        .classList.remove("open");

}



// =====================================================
// SECOND PANEL
// =====================================================

function openSeawaterDrawer() {

    document
        .getElementById("seawaterDrawer")
        .classList.add("open");

}


function closeSeawaterDrawer() {

    document
        .getElementById("seawaterDrawer")
        .classList.remove("open");

}



// =====================================================
// THIRD PANEL
// =====================================================

function openLobsterDrawer() {

    document
        .getElementById("lobsterDrawer")
        .classList.add("open");

}


function closeLobsterDrawer() {

    document
        .getElementById("lobsterDrawer")
        .classList.remove("open");

}



// =====================================================
// FOURTH PANEL
// =====================================================

function openCrabDrawer() {

    document
        .getElementById("crabDrawer")
        .classList.add("open");

}


function closeCrabDrawer() {

    document
        .getElementById("crabDrawer")
        .classList.remove("open");

}



// =====================================================
// FIFTH PANEL
// =====================================================

function openComboDrawer() {

    document
        .getElementById("comboDrawer")
        .classList.add("open");

}


function closeComboDrawer() {

    document
        .getElementById("comboDrawer")
        .classList.remove("open");

}



// =====================================================
// SIXTH PANEL
// =====================================================

function openTodayDrawer() {

    document
        .getElementById("todayDrawer")
        .classList.add("open");

}


function closeTodayDrawer() {

    document
        .getElementById("todayDrawer")
        .classList.remove("open");

}



// =====================================================
// FRESHWATER
// =====================================================

function openFreshwater() {

    document
        .getElementById("freshwaterDrawer")
        .classList.add("active");

}


function closeFreshwater() {

    document
        .getElementById("freshwaterDrawer")
        .classList.remove("active");

}



// =====================================================
// ADD PRODUCT TO CART
// DATABASE VERSION
// =====================================================

function addToCart(name, price) {

    fetch("/cart/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            productName: name,
            price: Number(price),
            quantity: 1,
            image: ""

        })

    })

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Product could not be added");
            }

            return response.json();

        })

        .then(function(savedItem) {

            console.log(
                "Cart item saved successfully:",
                savedItem
            );

            alert(name + " added to cart 🛒");

            // Reload cart from database
            loadCartFromDatabase();

        })

        .catch(function(error) {

            console.error(
                "Cart Database Error:",
                error
            );

            alert(
                "Product could not be added ❌"
            );

        });

}



// =====================================================
// UPDATE TOP CART COUNT
// DATABASE VERSION
// =====================================================

function updateCartCount() {

    fetch("/cart")

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Could not load cart");
            }

            return response.json();

        })

        .then(function(cart) {

            document.getElementById("cartCount").innerText =
                cart.length;

        })

        .catch(function(error) {

            console.error(
                "Cart Count Error:",
                error
            );

        });

}



// =====================================================
// OPEN CART
// =====================================================

function openCart() {

    document
        .getElementById("cartDrawer")
        .classList.add("active");

    loadCartFromDatabase();

}



// =====================================================
// CLOSE CART
// =====================================================

function closeCart() {

    document
        .getElementById("cartDrawer")
        .classList.remove("active");

}



// =====================================================
// LOAD CART FROM DATABASE
// =====================================================

function loadCartFromDatabase() {

    fetch("/cart")

        .then(function(response) {

            if (!response.ok) {
                throw new Error(
                    "Could not load cart from database"
                );
            }

            return response.json();

        })

        .then(function(cart) {

            console.log(
                "Cart loaded from database:",
                cart
            );

            displayDatabaseCart(cart);

            updateDatabaseCartCount(cart);

        })

        .catch(function(error) {

            console.error(
                "Cart Load Error:",
                error
            );

        });

}



// =====================================================
// DISPLAY CART PRODUCTS FROM DATABASE
// =====================================================

function displayDatabaseCart(cart) {

    let cartItems =
        document.getElementById("cartItems");

    let cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;


    // CART EMPTY

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty 🛒</p>';

        cartTotal.innerText = "0";

        return;

    }


    // DISPLAY EVERY DATABASE ITEM

    cart.forEach(function(item) {

        let quantity = item.quantity || 1;

        let price = Number(item.price) || 0;

        total += price * quantity;


        cartItems.innerHTML += `

        <div class="cart-product">

            <div>

                <h3>${item.productName}</h3>

                <p>₹${price}</p>

                <p>Quantity: ${quantity}</p>

            </div>


            <button
                onclick="removeFromDatabaseCart(${item.id})">

                Remove

            </button>

        </div>

        `;

    });


    cartTotal.innerText = total;

}



// =====================================================
// UPDATE DATABASE CART COUNT
// =====================================================

function updateDatabaseCartCount(cart) {

    document.getElementById("cartCount").innerText =
        cart.length;

}



// =====================================================
// REMOVE ONE PRODUCT FROM DATABASE
// =====================================================

function removeFromDatabaseCart(id) {

    fetch("/cart/remove/" + id, {

        method: "DELETE"

    })

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Could not remove product"
                );

            }

            return response.text();

        })

        .then(function(message) {

            console.log(
                "Remove result:",
                message
            );

            // Reload cart after removing
            loadCartFromDatabase();

        })

        .catch(function(error) {

            console.error(
                "Remove Error:",
                error
            );

            alert(
                "Product could not be removed ❌"
            );

        });

}



// =====================================================
// CLEAR ENTIRE CART FROM DATABASE
// =====================================================

function clearCart() {

    fetch("/cart/clear", {

        method: "DELETE"

    })

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Could not clear cart"
                );

            }

            return response.text();

        })

        .then(function(message) {

            console.log(
                "Clear cart result:",
                message
            );

            // Reload cart
            loadCartFromDatabase();

        })

        .catch(function(error) {

            console.error(
                "Clear Cart Error:",
                error
            );

            alert(
                "Cart could not be cleared ❌"
            );

        });

}



// =====================================================
// OLD DISPLAY CART FUNCTION
// Kept so existing HTML does not break
// =====================================================

function displayCart() {

    loadCartFromDatabase();

}



// =====================================================
// OLD REMOVE FUNCTION
// Redirect to database remove
// =====================================================

function removeFromCart(id) {

    removeFromDatabaseCart(id);

}



// =====================================================
// PAGE LOAD
// =====================================================

window.onload = function() {

    // Cart drawer is only present on the shop page (project2ndpage.html).
    // Without this guard the login page throws a console error on every load.
    if (document.getElementById("cartItems")) {

        loadCartFromDatabase();

    }

};