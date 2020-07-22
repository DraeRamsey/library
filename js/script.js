'use strict';

// TODO: manually add some book objects into the array so we can see what it looks like
// associate the DOM books with the actual book objects in some way, maybe add a data-attribute that corresponds to the index of the library array

const book_form         = document.getElementById('book-form');
const form_container    = document.getElementById('form-container');
const add_exit          = document.getElementById('add-exit');
const library_container = document.getElementById('library-container');

var form_open = false;

let myBookshelf = [];

window.onload = function(){
  renderBooks();
}

add_exit.addEventListener('click', function()
{
  formOpenClose();
});

book_form.addEventListener('submit', function(e)
{
  e.preventDefault();
  let title  = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages  = document.getElementById('pages').value;
  let read   = document.getElementById('read').checked;


  const new_book = new Book(title, author, pages, read);
  myBookshelf.push(new_book);
  book_form.reset();
  formOpenClose();
});




function Book(title, author, pages, read)
{
  this.title  = title;
  this.author = author;
  this.pages  = pages;
  this.read   = read;

}

function formOpenClose()
{
  if(form_open)
    {
      form_container.style.top = '-100vh';
      add_exit.classList.remove("add-exit-animate");
      document.body.style.overflowY = 'scroll';
      form_open = false;
    }


  else {
    form_container.style.top = 0;
    add_exit.classList.add("add-exit-animate");
    document.body.style.overflowY = 'hidden';
    form_open = true;
  }

}

//this resize solution is from CSS tricks:https://css-tricks.com/stop-animations-during-window-resizing/
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});


//we need to be able to change the "read" status of the book, to do this we need a function that can toggle the read status on the book prototype instance
Book.prototype.read = function()
{
   //if read make this.read is false if notread then this.read is true
}

//take user input and push to the myBookshelf array
//may or may not need this function
function addBook()
{
  // const newBook = new Book(userinput, userinput, etc)
  // myBookshelf.push(newBook);
}

//array to HTML
//function that loops through myBookshelf and displays each book on the page
//set data-attribute using the index
function renderBooks()
{
  var book_container, button_container, delete_btn, read_btn, check_icon, trash_icon, titleP, authorP;

  myBookshelf.forEach(function (bookItem, index) {
    const bookTitle   = bookItem.title;
    const bookAuthor  = bookItem.author;
    const bookPages   = bookItem.pages;
    const hasReadBook = bookItem.read;
    console.log(bookTitle, bookAuthor, bookPages, hasReadBook);
    console.log(index)

    book_container = document.createElement( "div" );
    book_container.setAttribute( "class", 'book-container');

    button_container = document.createElement( "div" );
    button_container.setAttribute('id', 'button-container');

    delete_btn = document.createElement( "div" );
     delete_btn.setAttribute( "class", 'circle');
    delete_btn.setAttribute( "id", 'delete-btn');

    read_btn = document.createElement( "div" );
    read_btn.setAttribute( "class", 'circle');
    read_btn.setAttribute( "id", 'read-btn');

    check_icon = document.createElement( "i" );
    check_icon.setAttribute( "class", 'fas fa-check');

    trash_icon = document.createElement( "i" );
    trash_icon.setAttribute( "class", 'far fa-trash-alt');

    titleP = document.createElement( "p" );
    titleP.textContent = bookTitle;

    authorP = document.createElement( "p" );
    authorP.textContent = bookAuthor;

    read_btn.appendChild(check_icon);
    delete_btn.appendChild(trash_icon);

    button_container.appendChild(read_btn);
    button_container.appendChild(delete_btn);

    book_container.appendChild(button_container);
    book_container.appendChild(titleP);
    book_container.appendChild(authorP);

    library_container.appendChild(book_container);

});


}

renderNewBook(){

}


// testing
const test_book = new Book("Lord of the Rings", "JRR Tolkien", "355", true);
const another_test_book = new Book("The Poisonwood Bible", "Barbara Kingsglover", "500", true);

myBookshelf.push(test_book, another_test_book);
//testing
