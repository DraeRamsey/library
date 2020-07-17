'use strict';

const book_form = document.getElementById('book-form');
let myBookshelf = [];

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
});


function Book(title, author, pages, read)
{
  this.title  = title;
  this.author = author;
  this.pages  = pages;
  this.read   = read;

}

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
function renderBooks()
{

}
