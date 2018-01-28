function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBook = function(book) {
  const bookList = document.getElementById('book-list');
  const row = document.createElement('tr');
        
  row.innerHTML = `
  <th>${book.title}</th>
  <th>${book.author}</th>
  <th>${book.isbn}</th>
  <th><a><i class="fa fa-times-circle" aria-hidden="true"></i></a></th>`;

  bookList.appendChild(row);
}

UI.prototype.clearForm = function() {
  document.getElementById('book-title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className) {
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

UI.prototype.deleteBook = function(e) {
  if(e.classList.contains('fa') == true) {
    e.parentElement.parentElement.parentElement.remove();
  }
}

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
      ui.clearForm();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book deleted!', 'success');

  e.preventDefault();
});
