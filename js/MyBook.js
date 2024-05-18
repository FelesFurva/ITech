document.addEventListener("DOMContentLoaded", async () => {
  console.log("Starting");
  const firebaseURL =
    "https://magicbooks-d5551-default-rtdb.europe-west1.firebasedatabase.app/";
  const firebaseConfig = {
    databaseURL: firebaseURL,
  };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const bookshelfRef = database.ref("bookshelf");

  let data = await getBooks();
  let owndBooks = await getData();
  const originalDiv1 = document.querySelector("#container1");
  const originalDiv2 = document.querySelector("#container2");
  generateContent(originalDiv1, owndBooks);
  generateContent(originalDiv2, data);
});
//DB connection

console.log("Starting");
const firebaseURL =
  "https://magicbooks-d5551-default-rtdb.europe-west1.firebasedatabase.app/";
const firebaseConfig = {
  databaseURL: firebaseURL,
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const bookshelfRef = database.ref("bookshelf");

async function getData() {
  console.log("getting data through fetch");
  const fetchProducts = await fetch(`${firebaseURL}bookshelf.json`);
  let items = await fetchProducts.json();
  console.log(items);
  let ownedshelf = [];
  Object.keys(items).forEach(function (key, index) {
    let title = items[key].title;
    let author = items[key].author;
    let year = items[key].published;
    let book = {
      title: title,
      author: author,
      year: year,
    };
    ownedshelf.push(book);
  });
  console.log(ownedshelf);
  return ownedshelf;
}

//update book
document.getElementById('exchange').addEventListener('click', function(){
    const specificBook = database.ref("bookshelf/blossom");
    specificBook.update({ exchange: "true" });

});


//read books

console.log("starting template");
async function getBooks() {
  try {
    const response = await fetch(
      "https://openlibrary.org/people/mekBot/books/want-to-read.json"
    );
    console.log("response:  " + response);

    let data = await response.json();
    console.log(data);
    let bookshelf = [];
    for (item of data.reading_log_entries) {
      let title = item.work.title;
      let author = item.work.author_names;
      let year = item.work.first_publish_year;
      let book = {
        title: title,
        author: author,
        year: year,
      };
      bookshelf.push(book);
    }
    return bookshelf;
  } catch (e) {
    console.log(e);
  }
}

function fillCardData(card, work, i) {
  card.setAttribute("id", "position-" + i);
  card.querySelector(".card-title").innerText = "Title: " + work.title;
  card.querySelector(".card-author").innerText = "Author " + work.author;
  card.querySelector(".card-year").innerText = "Publsihed: " + work.year;
}

async function generateContent(container, data) {
  let cloned;
  let card;
  let div = container.querySelector(".row");
  let cardTemplate = div.querySelector(".col-md-3").cloneNode(true);
  let maxColCount = 3;

  data.forEach(function (value, i) {
    if (i % maxColCount === 0) {
      cloned = div.cloneNode(true);
      cloned.innerHTML = "";
      clonedCard = cardTemplate.cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      console.log(card);
      cloned.appendChild(clonedCard);
    } else if (i % maxColCount == (maxColCount - 1)) {
        clonedCard = cardTemplate.cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
      //cloned.removeChild(cloned.querySelector(".col-md-3"));
      if(i != data.length){document.querySelector(".container").appendChild(cloned);}
    } else {
        clonedCard = cardTemplate.cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    }
  });

  //additional appened for cases when there are less than 3 items
  document.querySelector(".container").appendChild(cloned);
  //container.querySelector(".container").removeChild(div);

}
