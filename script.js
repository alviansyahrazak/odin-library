// class Book
class Book {
  constructor(title, author, pages, read, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.image = image;
  }

  toggleReadStatus = () => {
    this.read = !this.read;
  };
}

//class Library
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.renderBooks();
  }

  readStatus(index) {
    this.books[index].toggleReadStatus();
    this.renderBooks();
  }

  deleteBook(index) {
    this.books.splice(index, 1);
    this.renderBooks();
  }

  searchBooks(e) {
    const query = e.target.value.toLowerCase();
    const filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(query),
    );
    this.renderBooks(filteredBooks);
  }
  renderBooks(library = this.books) {
    const listsBooks = document.getElementById('lists-books');
    const output = library
      .map(
        (item, index) => `
        <div class="main__card">
          <div class="main__card-image">
            ${
              item.read
                ? `
              <div class="main__card-read-tag">
                <p class="main__card-read-tag-text">Read</p>
              </div>`
                : ''
            }
            <img src="${item.image}" alt="${
          item.title
        }" class="main__card-img" />
          </div>
          <div class="main__card-description">
            <h3 class="main__card-description-title">${item.title}</h3>
            <p class="main__card-description-author">${item.author}</p>
          </div>
          <div class="main__card-bottom">
            <small class="main__card-bottom-text-pages">${
              item.pages
            } Pages</small>
            <div class="main__card-actions">
              <button class="main__card-action-read-btn" onclick="library.readStatus(${index})">Read</button>
              <button class="main__card-action-delete-btn" onclick="library.deleteBook(${index})">Delete</button>
            </div>
          </div>
        </div>`,
      )
      .join('');
    listsBooks.innerHTML = output;
  }
}

// sample books
const books = [
  new Book(
    '윈드 브레이커 1 (Wind Breaker #1)',
    'Yongseok Jo',
    272,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1504722497i/36192724.jpg',
  ),
  new Book(
    'Wind Breaker #2',
    'Yongseok Jo',
    288,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1605011108i/55877195.jpg',
  ),
  new Book(
    'Wind Breaker #3',
    'Yongseok Jo',
    272,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1698720338i/98145080.jpg',
  ),
  new Book(
    'Wind Breaker #4',
    'Yongseok Jo',
    287,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1697899451i/98148582.jpg',
  ),
  new Book(
    'Wind Breaker #5',
    'Yongseok Jo',
    288,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1696759416i/98564977.jpg',
  ),
  new Book(
    'The Hobbit',
    'J.R.R. Tolkien, Douglas A. Anderson, Michael Hague (Illustrator), Jemima Catlin(Illustrator)',
    366,
    false,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg',
  ),
  new Book(
    'A Game of Thrones A Song of Ice and Fire',
    'George R.R. Martin',
    835,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562726234i/13496.jpg',
  ),
  new Book(
    'The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones',
    'George R.R. Martin, Elio M. García Jr., Linda Antonsson',
    326,
    true,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400360220i/17345242.jpg',
  ),
  new Book(
    'Fire & Blood A Targaryen History',
    'George R.R. Martin, Doug Wheatley (Illustrator)',
    706,
    false,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532828095i/39943621.jpg',
  ),
  new Book(
    'Tower of God Volume One: A WEBTOON Unscrolled Graphic Novel',
    'S.I.U',
    284,
    false,
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1653283653i/60653006.jpg',
  ),
];

const library = new Library();
books.forEach((book) => library.addBook(book));

// Event
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const image = document.getElementById('image').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read, image);
  library.addBook(newBook);

  document.getElementById('demo-modal').close();
  document.getElementById('book-form').reset();
});

//Event
document
  .getElementById('header-search-input')
  .addEventListener('input', (e) => library.searchBooks(e));

const modal = document.getElementById('demo-modal');
document
  .getElementById('open-modal-btn')
  .addEventListener('click', () => modal.showModal());
document
  .getElementById('close-modal-btn')
  .addEventListener('click', () => modal.close());

// Initial render
library.renderBooks();
