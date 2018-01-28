class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book){
    const bookList = document.getElementById('book-list');
    const row = document.createElement('tr');
          
    row.innerHTML = `
    <th>${book.title}</th>
    <th>${book.author}</th>
    <th>${book.isbn}</th>
    <th><a><i class="fa fa-times-circle" aria-hidden="true"></i></a></th>`;
  
    bookList.appendChild(row);
  }

  clearForm() {
    document.getElementById('book-title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
  
    const container = document.querySelector('.container');
    const form = document.querySelector('#form');
  
    container.insertBefore(div, form);
  
    setTimeout(function(){
      container.removeChild(div);
    }, 2000);
  }

  deleteBook(e) {
    if(e.classList.contains('fa') == true) {
      e.parentElement.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooksFormLS() {
    let books;
    if(localStorage.getItem('books') == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBook() {
    const books = Store.getBooksFormLS();

    books.forEach(function(book) {
      const ui = new UI;
      ui.addBook(book);
    });
  }

  static addBookToLS(book) {
    const books = Store.getBooksFormLS();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBookFromLS(isbn) {
    const books = Store.getBooksFormLS();
    books.forEach(function(book, index) {
      if(book.isbn == isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBook);

document.getElementById('form').addEventListener('submit', function(e) {
  const title = document.getElementById('book-title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if(title == '' || author == '' || isbn == '') {
    ui.showAlert('Fill the form!!!', 'alert');
  } else { 
    ui.showAlert('Book added!!!', 'success');
    ui.addBook(book);
    Store.addBookToLS(book);
    ui.clearForm();
  }

  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
const ui = new UI();

ui.deleteBook(e.target);
Store.removeBookFromLS(e.target.parentElement.parentElement.previousElementSibling.textContent);
ui.showAlert('Book deleted!', 'success');

e.preventDefault();
});
