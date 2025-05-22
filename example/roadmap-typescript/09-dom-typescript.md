# Робота з DOM в TypeScript

Робота з Document Object Model (DOM) є важливою частиною веб-розробки. TypeScript надає типи та інтерфейси для безпечної роботи з DOM, що допомагає уникнути багатьох поширених помилок.

## Типи DOM елементів

TypeScript має вбудовані типи для всіх DOM елементів та подій:

```typescript
// Типи DOM елементів
const div: HTMLDivElement = document.createElement('div');
const button: HTMLButtonElement = document.createElement('button');
const input: HTMLInputElement = document.createElement('input');
const canvas: HTMLCanvasElement = document.createElement('canvas');

// Доступ до елементів за допомогою querySelector
const header: HTMLElement | null = document.querySelector('header');
const paragraphs: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('p');
```

## Доступ до DOM елементів

### Отримання елементів

```typescript
// За ID
const element = document.getElementById('myElement');

// За класом
const elements = document.getElementsByClassName('myClass');

// За тегом
const divs = document.getElementsByTagName('div');

// За селектором
const header = document.querySelector('header');
const paragraphs = document.querySelectorAll('p');
```

### Типова безпека при доступі до елементів

TypeScript допомагає забезпечити типову безпеку при роботі з DOM:

```typescript
// getElementById повертає HTMLElement | null
const element = document.getElementById('myElement');

// Перевірка на null перед використанням
if (element) {
  element.textContent = 'Новий текст';
} else {
  console.error('Елемент не знайдено');
}

// Використання оператора "не-null" (!)
// Використовуйте це тільки якщо ви впевнені, що елемент існує
const element2 = document.getElementById('myElement')!;
element2.textContent = 'Новий текст';

// Приведення типів (type assertion)
const input = document.getElementById('myInput') as HTMLInputElement;
input.value = 'Новий текст';
```

## Маніпуляції з DOM

### Створення елементів

```typescript
// Створення нового елемента
const div = document.createElement('div');
div.className = 'container';
div.textContent = 'Привіт, світ!';

// Додавання елемента в DOM
document.body.appendChild(div);

// Створення та додавання кількох елементів
const ul = document.createElement('ul');

for (let i = 1; i <= 5; i++) {
  const li = document.createElement('li');
  li.textContent = `Пункт ${i}`;
  ul.appendChild(li);
}

document.body.appendChild(ul);
```

### Зміна елементів

```typescript
// Зміна вмісту
const header = document.querySelector('h1');
if (header) {
  header.textContent = 'Новий заголовок';
  header.innerHTML = 'Заголовок з <span>HTML</span>';
}

// Зміна атрибутів
const link = document.querySelector('a');
if (link) {
  link.setAttribute('href', 'https://example.com');
  link.setAttribute('target', '_blank');
}

// Робота з класами
const element = document.querySelector('.my-element');
if (element) {
  element.classList.add('active');
  element.classList.remove('hidden');
  element.classList.toggle('highlighted');
  const hasClass = element.classList.contains('active');
}

// Робота зі стилями
const box = document.querySelector('.box');
if (box) {
  box.style.width = '100px';
  box.style.height = '100px';
  box.style.backgroundColor = 'red';
  box.style.margin = '10px';
}
```

### Видалення елементів

```typescript
// Видалення елемента
const elementToRemove = document.querySelector('.remove-me');
if (elementToRemove && elementToRemove.parentNode) {
  elementToRemove.parentNode.removeChild(elementToRemove);
}

// Сучасний спосіб (не підтримується в IE)
if (elementToRemove) {
  elementToRemove.remove();
}

// Очищення вмісту елемента
const container = document.querySelector('.container');
if (container) {
  container.innerHTML = '';
  // або
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
```

## Обробка подій

### Додавання обробників подій

```typescript
// Додавання обробника події
const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', () => {
    console.log('Кнопку натиснуто!');
  });
}

// Типізація події
const input = document.querySelector('input');
if (input) {
  input.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log('Введений текст:', target.value);
  });
}

// Типізація специфічних подій
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    console.log('Форму відправлено!');
  });
}
```

### Видалення обробників подій

```typescript
// Видалення обробника події
function handleClick() {
  console.log('Кнопку натиснуто!');
}

const button = document.querySelector('button');
if (button) {
  // Додавання обробника
  button.addEventListener('click', handleClick);
  
  // Видалення обробника
  button.removeEventListener('click', handleClick);
}
```

### Делегування подій

```typescript
// Делегування подій
const list = document.querySelector('ul');
if (list) {
  list.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    
    // Перевірка, чи клік був на елементі списку
    if (target.tagName === 'LI') {
      console.log('Натиснуто на елемент списку:', target.textContent);
    }
  });
}
```

## Робота з формами

```typescript
// Доступ до форми та її елементів
const form = document.querySelector('form') as HTMLFormElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const messageTextarea = document.querySelector('#message') as HTMLTextAreaElement;
const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;

// Обробка відправки форми
if (form) {
  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    
    // Отримання значень полів
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageTextarea.value
    };
    
    console.log('Дані форми:', formData);
    
    // Очищення форми
    form.reset();
  });
}

// Валідація форми
if (nameInput) {
  nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 3) {
      nameInput.setCustomValidity('Ім\'я повинно містити щонайменше 3 символи');
    } else {
      nameInput.setCustomValidity('');
    }
  });
}

// Робота з чекбоксами та радіокнопками
const checkbox = document.querySelector('#agree') as HTMLInputElement;
const radioButtons = document.querySelectorAll('input[name="gender"]') as NodeListOf<HTMLInputElement>;

if (checkbox) {
  checkbox.addEventListener('change', () => {
    console.log('Погоджено:', checkbox.checked);
  });
}

if (radioButtons.length > 0) {
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        console.log('Вибрано:', radio.value);
      }
    });
  });
}
```

## Робота з API браузера

### Локальне сховище (localStorage)

```typescript
// Збереження даних
localStorage.setItem('username', 'john_doe');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark', fontSize: 16 }));

// Отримання даних
const username = localStorage.getItem('username');
const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');

// Видалення даних
localStorage.removeItem('username');
localStorage.clear(); // Видалення всіх даних
```

### Сесійне сховище (sessionStorage)

```typescript
// Збереження даних
sessionStorage.setItem('sessionId', 'abc123');

// Отримання даних
const sessionId = sessionStorage.getItem('sessionId');

// Видалення даних
sessionStorage.removeItem('sessionId');
sessionStorage.clear(); // Видалення всіх даних
```

### Cookies

```typescript
// Встановлення cookie
document.cookie = 'username=john_doe; max-age=3600; path=/';

// Отримання всіх cookies
const cookies = document.cookie;

// Функція для отримання значення конкретного cookie
function getCookie(name: string): string | null {
  const cookieArr = document.cookie.split(';');
  
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    const cookieName = cookiePair[0].trim();
    
    if (cookieName === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  
  return null;
}

// Видалення cookie
document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
```

### Fetch API

```typescript
// Типізація даних
interface User {
  id: number;
  name: string;
  email: string;
}

// GET запит
async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error('Помилка отримання користувачів:', error);
    return [];
  }
}

// POST запит
async function createUser(user: Omit<User, 'id'>): Promise<User | null> {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const createdUser: User = await response.json();
    return createdUser;
  } catch (error) {
    console.error('Помилка створення користувача:', error);
    return null;
  }
}

// Використання
async function init() {
  const users = await getUsers();
  console.log('Користувачі:', users);
  
  const newUser = await createUser({ name: 'Іван', email: 'ivan@example.com' });
  console.log('Новий користувач:', newUser);
}

init();
```

## Типізація кастомних елементів

### Розширення існуючих типів

Іноді вам може знадобитися розширити існуючі типи DOM:

```typescript
// Розширення HTMLElement для кастомних атрибутів
interface CustomHTMLElement extends HTMLElement {
  customAttribute: string;
  customMethod(): void;
}

// Використання
const element = document.querySelector('.custom-element') as CustomHTMLElement;
console.log(element.customAttribute);
element.customMethod();
```

### Типізація кастомних подій

```typescript
// Визначення типу кастомної події
interface CustomEvent<T = any> extends Event {
  readonly detail: T;
  initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void;
}

// Визначення інтерфейсу для даних події
interface CustomEventData {
  message: string;
  timestamp: number;
}

// Створення та відправка кастомної події
const event = new CustomEvent<CustomEventData>('custom-event', {
  bubbles: true,
  detail: {
    message: 'Привіт, світ!',
    timestamp: Date.now()
  }
});

document.dispatchEvent(event);

// Обробка кастомної події
document.addEventListener('custom-event', (event: Event) => {
  const customEvent = event as CustomEvent<CustomEventData>;
  console.log('Повідомлення:', customEvent.detail.message);
  console.log('Час:', new Date(customEvent.detail.timestamp));
});
```

## Практичний приклад: Створення простого TODO додатку

```typescript
// Інтерфейс для задачі
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Клас для управління списком задач
class TodoApp {
  private tasks: Task[] = [];
  private nextId: number = 1;
  private taskInput: HTMLInputElement;
  private taskList: HTMLUListElement;
  
  constructor() {
    // Отримання елементів DOM
    this.taskInput = document.getElementById('taskInput') as HTMLInputElement;
    this.taskList = document.getElementById('taskList') as HTMLUListElement;
    
    // Ініціалізація обробників подій
    this.initEventListeners();
    
    // Завантаження задач з localStorage
    this.loadTasks();
    
    // Відображення задач
    this.renderTasks();
  }
  
  private initEventListeners(): void {
    // Форма додавання задачі
    const form = document.getElementById('taskForm') as HTMLFormElement;
    form.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.addTask();
    });
    
    // Делегування подій для кнопок видалення та чекбоксів
    this.taskList.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      
      // Обробка кліку на кнопку видалення
      if (target.classList.contains('delete-btn')) {
        const taskId = Number(target.getAttribute('data-id'));
        this.deleteTask(taskId);
      }
      
      // Обробка кліку на чекбокс
      if (target.classList.contains('task-checkbox')) {
        const taskId = Number(target.getAttribute('data-id'));
        this.toggleTaskStatus(taskId);
      }
    });
  }
  
  private addTask(): void {
    const text = this.taskInput.value.trim();
    
    if (text) {
      // Створення нової задачі
      const newTask: Task = {
        id: this.nextId++,
        text,
        completed: false
      };
      
      // Додавання задачі до масиву
      this.tasks.push(newTask);
      
      // Очищення поля вводу
      this.taskInput.value = '';
      
      // Збереження та відображення задач
      this.saveTasks();
      this.renderTasks();
    }
  }
  
  private deleteTask(id: number): void {
    // Видалення задачі з масиву
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    // Збереження та відображення задач
    this.saveTasks();
    this.renderTasks();
  }
  
  private toggleTaskStatus(id: number): void {
    // Зміна статусу задачі
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    // Збереження та відображення задач
    this.saveTasks();
    this.renderTasks();
  }
  
  private renderTasks(): void {
    // Очищення списку задач
    this.taskList.innerHTML = '';
    
    // Відображення кожної задачі
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      
      // Створення чекбоксу
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.setAttribute('data-id', String(task.id));
      checkbox.checked = task.completed;
      
      // Створення тексту задачі
      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = task.completed ? 'completed' : '';
      
      // Створення кнопки видалення
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Видалити';
      deleteBtn.className = 'delete-btn';
      deleteBtn.setAttribute('data-id', String(task.id));
      
      // Додавання елементів до списку
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      this.taskList.appendChild(li);
    });
  }
  
  private saveTasks(): void {
    // Збереження задач в localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  private loadTasks(): void {
    // Завантаження задач з localStorage
    const tasksJson = localStorage.getItem('tasks');
    
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
      
      // Визначення наступного ID
      if (this.tasks.length > 0) {
        const maxId = Math.max(...this.tasks.map(task => task.id));
        this.nextId = maxId + 1;
      }
    }
  }
}

// Ініціалізація додатку після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});
```

HTML для TODO додатку:

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODO Додаток</title>
  <style>
    .completed {
      text-decoration: line-through;
      color: #888;
    }
    .task-item {
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <h1>TODO Додаток</h1>
  
  <form id="taskForm">
    <input type="text" id="taskInput" placeholder="Введіть нову задачу" required>
    <button type="submit">Додати</button>
  </form>
  
  <ul id="taskList"></ul>
  
  <script src="app.js"></script>
</body>
</html>
```

## Висновок

TypeScript надає потужні інструменти для типобезпечної роботи з DOM та API браузера. Використання типів для елементів, подій та даних допомагає виявляти помилки на етапі компіляції та робить код більш надійним.

Основні переваги використання TypeScript для роботи з DOM:
- Автодоповнення та підказки в IDE
- Виявлення помилок на етапі компіляції
- Краща документація коду
- Безпечніший рефакторинг

У наступному розділі ми розглянемо використання TypeScript з React, що є популярною бібліотекою для створення користувацьких інтерфейсів.
