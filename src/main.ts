import './styles.css';
import { Book, formatBook, Catalog} from './task1-types';
import { addBook, removeBook, getBook} from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from "./task4-integration";
// Готовые данные для старта
let initialBooks: Catalog = {
  '1': { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2024 },
  '2': { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
};

// ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM (Слайд 15)
// Используем querySelector + as, чтобы TypeScript знал точный 
// тип элемента и давал автодополнение (.value, .reset() и т.д.)
const bookList = document.querySelector('#bookList') as HTMLDivElement;
const form = document.querySelector('#bookForm') as HTMLFormElement;
const filterBtn = document.querySelector('#applyFilters') as HTMLButtonElement;
const authorInput = document.querySelector('#filterAuthor') as HTMLInputElement;
const yearInput = document.querySelector('#filterYear')as HTMLInputElement;
const errorMessage = document.querySelector('#errorMessage')as HTMLDivElement;


//ФУНКЦИЯ ОТРИСОВКИ (createElement + textContent)
// ВАЖНО: Избегайте innerHTML для данных пользователя, чтобы 
// предотвратить XSS-атаки. Используйте textContent!
// ============================================================
function renderBooks(books: Book[]) {
  // Очищаем контейнер перед новой отрисовкой
  bookList.innerHTML = ''; 

  // Если книг нет, показываем сообщение
  if (books.length === 0) {
    bookList.textContent = 'Книги не найдены. Попробуйте изменить фильтры.';
    return;
  }

  // Перебираем книги и создаём для каждой карточку
  books.forEach(book => {
    // TODO 3.1: Создайте элемент div и добавьте ему класс 'book-card'
    const card = document.createElement('div');
    // ... ваш код ...

    // TODO 3.2: Создайте элемент h3 для названия. 
    // Используйте textContent и функцию formatBook(book) для безопасности.
    // Добавьте его в card через .append()
    
    // TODO 3.3: Создайте элемент p для авторов. 
    // Используйте textContent и book.authors.join(', ')
    
    // TODO 3.4: Если book.year существует (не undefined), 
    // создайте элемент p и добавьте текст `Год: ${book.year}`
    
    // TODO 3.5: Если book.rating существует, 
    // создайте элемент p и добавьте текст `Рейтинг: ${book.rating} ⭐`

    // TODO 3.6: Создайте кнопку "Удалить". 
    // Повесьте на неё обработчик 'click' (стрелочную функцию), 
    // внутри которого: 
    // 1. Обновите initialBooks: initialBooks = removeBook(initialBooks, book.id)
    // 2. Вызовите renderBooks(Object.values(initialBooks)) для перерисовки

    // TODO 3.7: Добавьте кнопку и саму карточку (initialBooks) в bookList
  });
}

// Первичная отрисовка при загрузке страницы
renderBooks(Object.values(initialBooks));

// ============================================================
// 4. ОБРАБОТЧИК ФОРМЫ (Слайд 18: preventDefault и события)
// ============================================================
form.addEventListener('submit', (e) => {
  // TODO 4.1: Отмените стандартную перезагрузку страницы при отправке формы
  
  // Очищаем предыдущие сообщения об ошибках
  errorMessage.textContent = '';

  try {
    // TODO 4.2: Создайте объект FormData из элемента form
    // const formData = ...

    // TODO 4.3: Вызовите createBookFromForm(formData). 
    // ВНИМАНИЕ: Эта функция может выбросить ошибку (throw new Error), 
    // если рейтинг не от 0 до 5. Мы ловим её в блоке catch ниже.
    // const newBook = ...

    // TODO 4.4: Обновите состояние каталога иммутабельно, 
    // используя функцию addBook из Задания 2
    // initialBooks = ...

    // TODO 4.5: Очистите поля формы (form.reset()) 
    // и перерисуйте список книг (renderBooks)
    
  } catch (error) {
    // TODO 4.6: Если произошла ошибка валидации, 
    // проверьте, является ли error экземпляром Error (instanceof Error),
    // и выведите error.message в элемент errorMessage
  }
});

// ============================================================
// 5. ОБРАБОТЧИК ФИЛЬТРОВ
// ============================================================
filterBtn.addEventListener('click', () => {
  // TODO 5.1: Создайте пустой массив для функций-фильтров
  const filters: ((book: Book) => boolean)[] = [];
  
  // TODO 5.2: Если authorInput.value не пустой (после .trim()), 
  // добавьте в массив filters результат вызова filterByAuthor(...)
  
  // TODO 5.3: Если yearInput.value не пустой, 
  // преобразуйте его в число (parseInt) и добавьте filterByMinYear(...)

  // TODO 5.4: Получите все книги из каталога в виде массива 
  // с помощью Object.values(initialBooks)
  
  // TODO 5.5: Примените все фильтры с помощью функции applyFilters
  // и передайте результат в renderBooks()
});