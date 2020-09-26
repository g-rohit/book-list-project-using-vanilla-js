// Book constructor - which will handle the book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor - which will be set of prototypes and methods and will handle the adding of book and delet of the book from the UI
function UI() {}
// prototypes
// creating alerts
UI.prototype.showAlert = function (message, className) {
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
};
// adding book to list
UI.prototype.addBookToList = function (book) {
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
};
// deleting the book from the list :
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    // console.log(target);
    target.parentElement.parentElement.remove(); 
  }
   
};
// clearing fields prototype
UI.prototype.clearFields = function () {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("ISBN").value = "";
};


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

  if (confirm('Confirm Deletion?')) {
      
    ui.deleteBook(e.target);
  console.log(e.target);
  
  ui.showAlert("Book info deleted", "error");
}  
  e.preventDefault();
});
