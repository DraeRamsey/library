'use strict';

//stores book objects
let myBookshelf = [];

function Book(title, author, pages, read)
{
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

}

//we need to be able to change the "read" status of the book, to do this we need a function that can toggle the read status on the book prototype instance
Book.prototype.read = function()
{
   //if read make this.read is false if notread then this.read is true
}

//take user input and push to the myBookshelf array

function addBook()
{
  const newBook = new Book(userinput, userinput, etc)
  myBookshelf.push(newBook);
}

//array to HTML
//function that loops through myBookshelf and displays each book on the page
function renderBooks()
{

}
