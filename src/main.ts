import './styles.css';
import { Book, formatBook, Catalog} from './task1-types';
import { addBook, removeBook, getBook} from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from "./task4-integration";
// Готовые данные для старта
let catalog: Catalog = {
  '1': { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2024 },
  '2': { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
};

// TODO: Студенты пишут код ниже
const bookList = document.querySelector('#bookList') as HTMLDivElement;
const form = document.querySelector('#bookForm') as HTMLFormElement;
const filterBtn = document.querySelector('#applyFilters') as HTMLButtonElement;
const authorInput = document.querySelector('#filterAuthor') as HTMLInputElement;
const yearInput = document.querySelector('#filterYear')as HTMLInputElement;
const errorMessage = document.querySelector('#errorMessage')as HTMLDivElement;


function renderBooks(books: Book[]) {
  bookList.innerHTML = ''; 

  if (books.length === 0) {
    bookList.textContent = 'Книги не найдены. Попробуйте изменить фильтры.';
    return;
  }

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    // Безопасная вставка текста (Слайд 17)
    const titleEl = document.createElement('h3');
    titleEl.textContent = formatBook(book); // Используем функцию из Задания 1
    
    const authorsEl = document.createElement('p');
    authorsEl.textContent = `Авторы: ${book.authors.join(', ')}`;
    
    card.append(titleEl, authorsEl);
    
    if (book.year !== undefined) {
      const yearEl = document.createElement('p');
      yearEl.textContent = `Год: ${book.year}`;
      card.append(yearEl);
    }
    if (book.rating !== undefined) {
      const ratingEl = document.createElement('p');
      ratingEl.textContent = `Рейтинг: ${book.rating} `;
      card.append(ratingEl);
    }
    bookList.append(card);
  });
}

// Отрисовать начальные книги
renderBooks(Object.values(catalog));

// Обработчик формы
document.getElementById('bookForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.textContent= '';
  try{
    // TODO: Получить данные из формы
    const fromData = new FormData(form);
    // TODO:  добавить книгу, перерисовать
    const newBook = createBookFromForm(fromData);
    catalog = addBook( catalog, newBook)
    // TODO:  добавить книгу, перерисовать
    form.reset()
    renderBooks(Object.values(catalog));  
  }catch(error){
    if(error instanceof Error){   
      errorMessage.textContent = error.message; };
      };
      });


// Обработчик фильтров
document.getElementById('applyFilters')?.addEventListener('click', () => {
  const filters: ((book: Book) => boolean)[] = [];
  
  if (authorInput.value.trim()) {
    filters.push(filterByAuthor(authorInput.value.trim()));
  }
  if (yearInput.value) {
    filters.push(filterByMinYear(parseInt(yearInput.value, 10)));
  }

  // Превращаем словарь initialBooks в массив для фильтрации
  const allBooks = Object.values(catalog);
  const filteredBooks = applyFilters(allBooks, filters);
  
  renderBooks(filteredBooks);
});