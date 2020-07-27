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

//let's learn React next
function renderNewBook(bookItem, index)
{

  var book_container, button_container, delete_btn, trash_icon, has_read, titleP, authorP, delete_modal, delete_paragraph;

  const bookTitle   = bookItem.title;
  const bookAuthor  = bookItem.author;
  const bookPages   = bookItem.pages;
  const hasReadBook = bookItem.read;

  book_container = document.createElement( "div" );
  book_container.setAttribute( "class", 'book-container');

  button_container = document.createElement( "div" );
  button_container.setAttribute('class', 'button-container');

  delete_btn = document.createElement( "div" );
  delete_btn.setAttribute( "class", 'circle');
  delete_btn.setAttribute("data-index-number", index);

  delete_modal = document.createElement( "div" );
  delete_modal.setAttribute( "class", 'delete-modal');

  delete_paragraph = document.createElement('p');
  delete_paragraph.textContent = "Are you sure you would like to delete " + bookTitle + "?";

  delete_modal.appendChild(delete_paragraph);

  trash_icon = document.createElement( "i" );
  trash_icon.setAttribute( "class", 'far fa-trash-alt');


  titleP = document.createElement( "p" );
  titleP.textContent = bookTitle;

  authorP = document.createElement( "p" );
  authorP.textContent = "By: " + bookAuthor;

  has_read = document.createElement("p");
  has_read.setAttribute("data-index-number", index);
  has_read.setAttribute( "class", 'has-read');
  toggleText(bookItem, has_read);
  delete_btn.appendChild(trash_icon);
  button_container.appendChild(delete_btn);


  book_container.appendChild(button_container);
  book_container.appendChild(titleP);
  book_container.appendChild(authorP);
  book_container.appendChild(has_read);
  book_container.appendChild(delete_modal);

  library_container.appendChild(book_container);

  delete_btn.addEventListener("click", function()
  {
  let this_icon = this.firstChild;
  let this_book_container = this.parentElement.parentElement;
  let this_delete_modal = this_book_container.lastChild;
  this_delete_modal.classList.toggle('delete-modal-open');
  delete_paragraph.classList.toggle('p-open');
  //  this_icon.classList.toggle('fas fa-times');
  //this_icon.setAttribute( "class", 'fas fa-times');

  this_icon.classList.contains("far", "fa-trash-alt") ? this_icon.setAttribute( "class", 'fas fa-times'): this_icon.setAttribute( "class", 'far fa-trash-alt');

     // let data_index_number = this.dataset.indexNumber;
     // myBookshelf.splice(data_index_number, 1);
     // renderBooks();
  });

  has_read.addEventListener("click", function()
  {
    let data_index_number = this.dataset.indexNumber;
    let this_book = myBookshelf[data_index_number];
    this_book.toggleRead();
    toggleText(this_book, this);
  });

}


function toggleText(book, element)
{
  let read_text = book.read? "read" : "not read";
  element.textContent = read_text;
};


//hard coded test books
const test_book = new Book("Lord of the Rings", "J.R.R Tolkien", "355", true);
const another_test_book = new Book("The Poisonwood Bible", "Barbara Kingsglover", "500", true);
myBookshelf.push(test_book, another_test_book);
