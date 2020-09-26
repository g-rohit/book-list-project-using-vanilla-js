// Book constructor - which will handle the book object
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  // creating alerts
  showAlert(message, className) {
    // create div
    const div = document.createElement("div");
    // append classnames
    div.className = `alert ${className}`;
    // creating text node:
    div.appendChild(document.createTextNode(message));
    //   getting the form element to insert div before it ends
    const form = document.getElementById("book-form");
    //   wrapper.insertBefore(div,form)
    form.insertAdjacentElement("beforeend", div);
    //   set timeout of 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  // adding book to list
  addBookToList(book) {
    // console.log(book);
    const list = document.getElementById("book-list");
    // create row
    const row = document.createElement("tr");
    // creating cols
    row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td ><a href="#" title="Delete" class="delete">Delete record</td>
`;
    list.appendChild(row);
  }
  // deleting the book from the list :
  deleteBook(target) {
    if (target.className === "delete") {
      // console.log(target);
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("ISBN").value = "";
  }
}

// Local storage class, and we will all the classes static so we dont have to instantiate it

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks(); // we are using the store class coz its a static method and we dont need to instansiate

    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks(); // we are using the store class coz its a static method and we dont need to instansiate

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks(isbn) {
    const books = Store.getBooks(); // we are using the store class coz its a static method and we dont need to instansiate

books.forEach((book,index) =>{
  if (book.isbn === isbn) {
    books.splice(index,1);

  }  

  localStorage.setItem("books", JSON.stringify(books));

})

     

  }
}

// Dom load event

document.addEventListener("DOMContentLoaded", Store.displayBooks);

// event listeners for adding book:
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get form values
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const isbn = document.getElementById("ISBN").value;
  // instantiate book object
  const book = new Book(title, author, isbn);
  // console.log(book);
  // instantiate UI object
  const ui = new UI();
  //   validation
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Kindly enter valid information in all fields", "error");
  } else {
    // Adding the book the the UI
    ui.addBookToList(book);

    // Adding to the Local storage
    Store.addBook(book);

    // showing alert
    ui.showAlert("Book info added successfully", "success");
    // clearing fields
    ui.clearFields();
  }
  e.preventDefault();
});
// event listener for deleting book
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();

  if (confirm("Confirm Deletion?")) {
    ui.deleteBook(e.target);

    // Deleting from Local storage

    Store.removeBooks(
      e.target.parentElement.previousElementSibling.textContent
    ); // this will give us the ISBN number which is basically unique for each book
    // console.log(e.target);

    ui.showAlert("Book info deleted", "error");
  }
  e.preventDefault();
});
