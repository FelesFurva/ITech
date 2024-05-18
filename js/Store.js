// Create an empty array to hold the cart items
document.addEventListener("DOMContentLoaded", () => {
  let cartItems = [];
  let totalPrice = 0;

  console.log("Starting");
  //Database
  const firebaseURL =
    "https://magicbooks-d5551-default-rtdb.europe-west1.firebasedatabase.app/";
  const firebaseConfig = {
    databaseURL: firebaseURL,
  };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const bookshelfRef = database.ref("bookshelf");

  function updateItem(items, itemName, itemPrice) {
    let found = items.find((item) => item.name === itemName);
    if (found) {
      console.log(found);
      found.quantity += 1;
    } else {
      let item = {
        name: itemName,
        price: itemPrice,
        quantity: 1,
      };
      items.push(item);
    }
  }

  // Add a click event listener to each "Add to Cart" button
  document.querySelectorAll("button[data-item]").forEach(function (button) {
    button.addEventListener("click", function () {
      let itemName = this.getAttribute("data-item");
      let itemPrice = parseFloat(this.getAttribute("data-price"));
      updateItem(cartItems, itemName, itemPrice);
      console.log(cartItems);

      document.getElementById("selectedItems").innerHTML = cartItems
        .map((item) => {
          return (
            "<li data-title=\""+item.name+"\">" +
            item.name +
            " $" +
            item.price +
            " x" +
            item.quantity +
            "</li>"
          );
        })
        .join("");

      totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      document.getElementById("totalPrice").textContent =
        "$" + totalPrice.toFixed(2);
    });
  });

  document.getElementById("cartButton").addEventListener("click", function () {
    document.getElementById("cartOverlay").style.display = "block";
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.getElementById("cartOverlay").style.display = "none";
    }
  });

  // add book
  document.getElementById("buyAll").addEventListener("click", function () {
    let items = document.querySelectorAll("#selectedItems > li");
    for (item of items) {
      console.log(item.getAttribute("data-title"));
      const newBookRef = bookshelfRef.push();
      newBookRef.set({
        author: "any-data",
        published: "any-data",
        title: item.getAttribute("data-title"),
      });
    }
    document.getElementById("cartOverlay").style.display = "none";
    document.getElementById("selectedItems").innerHTML = "";
    document.getElementById("totalPrice").innerHTML = "";
    cartItems = [];
  });

  //console.log(newBookRef.getKey());

  //get book
  bookshelfRef.on("value", (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const value = data[key];
      //console.log(key);
      //console.log(value);
    }
  });

});

 