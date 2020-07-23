'use strict';

const book_form         = document.getElementById('book-form');
const form_container    = document.getElementById('form-container');
const add_exit          = document.getElementById('add-exit');
const library_container = document.getElementById('library-container');

var form_open = false;
var myBookshelf = [];

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


  const book = new Book(title, author, pages, read);
  myBookshelf.push(book);

  var new_book = myBookshelf[myBookshelf.length - 1];
  var new_book_index = myBookshelf.length - 1;
  renderNewBook(new_book, new_book_index);
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


 Book.prototype.toggleRead = function()
 {
    this.read ? this.read = false : this.read = true;
    return this.read;
 }


function renderBooks()
{
  library_container.innerHTML = '';
  myBookshelf.forEach(function (bookItem, index)
  {
  renderNewBook(bookItem,index);
  });

}

function renderNewBook(bookItem, index)
{

    var book_container, button_container, delete_btn, read_btn, check_icon, trash_icon, titleP, authorP;

  const bookTitle   = bookItem.title;
  const bookAuthor  = bookItem.author;
  const bookPages   = bookItem.pages;
  const hasReadBook = bookItem.read;

  book_container = document.createElement( "div" );
  book_container.setAttribute( "class", 'book-container');

  button_container = document.createElement( "div" );
  button_container.setAttribute('id', 'button-container');

  delete_btn = document.createElement( "div" );
  delete_btn.setAttribute( "class", 'circle');
  delete_btn.setAttribute( "id", 'delete-btn');

  delete_btn.setAttribute("data-index-number", index);

  read_btn = document.createElement( "div" );
  read_btn.setAttribute( "class", 'circle');
  read_btn.setAttribute( "id", 'read-btn');
  read_btn.setAttribute("data-index-number", index);

  check_icon = document.createElement( "i" );
  check_icon.setAttribute( "class", 'fas fa-check');

  trash_icon = document.createElement( "i" );
  trash_icon.setAttribute( "class", 'far fa-trash-alt');

  titleP = document.createElement( "p" );
  titleP.textContent = bookTitle;

  authorP = document.createElement( "p" );
  authorP.textContent = "By: " + bookAuthor;

  read_btn.appendChild(check_icon);
  delete_btn.appendChild(trash_icon);

  toggleColour(bookItem,read_btn);

  button_container.appendChild(delete_btn);
  button_container.appendChild(read_btn);

  book_container.appendChild(button_container);
  book_container.appendChild(titleP);
  book_container.appendChild(authorP);

  library_container.appendChild(book_container);

  //dynamically created element fucntions
  delete_btn.addEventListener("click", function()
  {
    let data_index_number = this.dataset.indexNumber;
    myBookshelf.splice(data_index_number, 1);
    renderBooks();
  });

  read_btn.addEventListener("click", function()
  {
    let data_index_number = this.dataset.indexNumber;
    let this_book = myBookshelf[data_index_number];
    this_book.toggleRead();
    toggleColour(this_book,this)

  });

}
function toggleColour(book,element)
{
  //add a read paragraph below author
  //put the click event on that instead, and give the data_index_number to that
  // for the checkmark, give it it's own class to toggle with the content being the checkmark instead of adding it dynamically in the funciton above
  

  book.read ? element.style.backgroundColor = "green" :  element.style.backgroundColor = "red";

}


//hard coded test books
const test_book = new Book("Lord of the Rings", "J.R.R Tolkien", "355", true);
const another_test_book = new Book("The Poisonwood Bible", "Barbara Kingsglover", "500", true);
myBookshelf.push(test_book, another_test_book);
