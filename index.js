// Declare books list
let books = [];

// Check if a book exists
function bookExists(book) {
  for (let i = 0; i < books.length; i += 1) {
    if (books[i].title === book.title && books[i].author === book.author) {
      return true;
    }
  }
  return false;
}
// Add a new book to the list of books
function addBook(book) {
  if (!bookExists(book)) {
    books.push(book);
    displayElement(book);
    LocalStorage();
    return;
  }
  alert('The Book and Author already exist');
}

// Shows the added book in html
function displayElement(book) {
  const DisplayBooks = document.createElement('div');
  DisplayBooks.classList.add('book');

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.textContent = 'Remove';

  DisplayBooks.innerHTML = `
    <h2 class="title">${book.title}</h2>
    <p class="author">${book.author}</p>
  `;
  DisplayBooks.appendChild(removeButton);
  DisplayBooks.appendChild(document.createElement('hr'));

  booksList.appendChild(DisplayBooks);

  removeButton.addEventListener('click', () => {
    removeBook(book);
    DisplayBooks.remove();
  });
}

// Books Values & Functions
const booksList = document.getElementById('Listing');

// Remove a book from the list of lists
function removeBook(book) {
  for (let i = 0; i < books.length; i += 1) {
    if (books[i].title === book.title && books[i].author === book.author) {
      books.splice(i, 1);
      LocalStorage();
      return;
    }
  }
}

// Local Storage Functions
// Check if Storage is available
function StorageCheck(type) {
  let Store;
  try {
    Store = window[type];
    const x = '__storage_test__';
    Store.setItem(x, x);
    Store.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22
      || e.code === 1014
      || e.name === 'QuotaExceededError'
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && (Store && Store.length !== 0);
  }
}

// Updates the Local Storage
function LocalStorage() {
  if (StorageCheck('localStorage')) {
    localStorage.setItem('books', JSON.stringify(books));
  }
}

const BooksData = localStorage.getItem('books');

// Load initially stored data
if (BooksData) {
  books = JSON.parse(BooksData);
}

// Display all books when the page is loaded
books.forEach((book) => {
  displayElement(book);
});

// Add Event Listener on Add Book button
const addBooks = document.getElementById('AddBook');

addBooks.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook({
    title: addBooks.elements.title.value,
    author: addBooks.elements.author.value,
  });
});
