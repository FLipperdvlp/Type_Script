# Дженерики в TypeScript

Дженерики (Generics) - це один з найпотужніших інструментів TypeScript, який дозволяє створювати компоненти, що працюють з різними типами даних, зберігаючи при цьому типову безпеку.

## Навіщо потрібні дженерики?

Уявімо, що ми хочемо створити функцію, яка повертає те ж саме значення, яке отримує:

```typescript
// Без дженериків
function identity(arg: any): any {
  return arg;
}

const value = identity("hello"); // тип: any
```

Проблема в тому, що функція втрачає інформацію про тип: ми передаємо рядок, але отримуємо значення типу `any`. Дженерики вирішують цю проблему:

```typescript
// З дженериками
function identity<T>(arg: T): T {
  return arg;
}

const value = identity("hello"); // тип: string
const num = identity(42); // тип: number
```

Тепер TypeScript "запам'ятовує" тип аргументу і повертає значення того ж типу.

## Основи дженериків

### Дженерик функції

Ось приклад дженерик функції:

```typescript
// Дженерик функція з одним типовим параметром
function identity<T>(arg: T): T {
  return arg;
}

// Виклик з явним вказанням типу
const output1 = identity<string>("myString"); // тип: string

// Виклик з автоматичним визначенням типу
const output2 = identity(42); // тип: number
```

### Дженерик функції з кількома типовими параметрами

Функція може мати кілька типових параметрів:

```typescript
// Функція, що приймає два аргументи різних типів
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair<string, number>("hello", 42); // тип: [string, number]
const p2 = pair(true, "world"); // тип: [boolean, string]
```

### Дженерик інтерфейси

Інтерфейси також можуть бути дженериками:

```typescript
// Дженерик інтерфейс
interface Box<T> {
  value: T;
}

// Використання інтерфейсу з різними типами
const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };
```

### Дженерик класи

Класи також можуть бути дженериками:

```typescript
// Дженерик клас
class Container<T> {
  private item: T;

  constructor(item: T) {
    this.item = item;
  }

  getItem(): T {
    return this.item;
  }

  setItem(item: T): void {
    this.item = item;
  }
}

// Створення екземплярів з різними типами
const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>("hello");
console.log(stringContainer.getItem()); // "hello"
```

## Обмеження дженериків (Generic Constraints)

Іноді ми хочемо обмежити типи, які можуть бути використані з дженериками. Для цього використовується ключове слово `extends`:

```typescript
// Інтерфейс для обмеження
interface Lengthwise {
  length: number;
}

// Дженерик функція з обмеженням
function getLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

// Коректні виклики
console.log(getLength("hello")); // 5 (рядки мають властивість length)
console.log(getLength([1, 2, 3])); // 3 (масиви мають властивість length)
console.log(getLength({ length: 10 })); // 10 (об'єкт має властивість length)

// Помилка: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
// console.log(getLength(42));
```

## Використання типових параметрів в обмеженнях

Типовий параметр може бути обмежений іншим типовим параметром:

```typescript
// Функція, що отримує об'єкт та ім'я властивості цього об'єкта
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Іван", age: 30 };

// Коректні виклики
console.log(getProperty(person, "name")); // "Іван"
console.log(getProperty(person, "age")); // 30

// Помилка: Argument of type '"address"' is not assignable to parameter of type '"name" | "age"'
// console.log(getProperty(person, "address"));
```

## Дженерик типи за замовчуванням

TypeScript дозволяє вказувати типи за замовчуванням для дженериків:

```typescript
// Інтерфейс з типом за замовчуванням
interface Box<T = string> {
  value: T;
}

// Тип за замовчуванням - string
const box1: Box = { value: "hello" };

// Явне вказання типу
const box2: Box<number> = { value: 42 };
```

## Дженерики з масивами та колекціями

Дженерики особливо корисні при роботі з масивами та колекціями:

```typescript
// Функція, що повертає останній елемент масиву
function getLast<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

// Функція, що перевіряє, чи містить масив елемент
function contains<T>(arr: T[], item: T): boolean {
  return arr.includes(item);
}

// Функція, що об'єднує два масиви
function merge<T>(arr1: T[], arr2: T[]): T[] {
  return [...arr1, ...arr2];
}

// Приклади використання
console.log(getLast([1, 2, 3])); // 3
console.log(contains(["a", "b", "c"], "b")); // true
console.log(merge([1, 2], [3, 4])); // [1, 2, 3, 4]
```

## Дженерик типи в типових псевдонімах

Типові псевдоніми (type aliases) також можуть бути дженериками:

```typescript
// Дженерик типовий псевдонім
type Pair<T, U> = {
  first: T;
  second: U;
};

// Використання типового псевдоніма
const pair1: Pair<string, number> = { first: "hello", second: 42 };
const pair2: Pair<boolean, string[]> = { first: true, second: ["a", "b"] };
```

## Дженерик утиліти

TypeScript надає вбудовані дженерик утиліти для маніпуляцій з типами:

### `Partial<T>`

Робить всі властивості типу `T` необов'язковими:

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

// Всі властивості стають необов'язковими
type PartialPerson = Partial<Person>;

// Еквівалентно:
// type PartialPerson = {
//   name?: string;
//   age?: number;
//   address?: string;
// };

const partialPerson: PartialPerson = { name: "Іван" }; // OK
```

### `Required<T>`

Робить всі властивості типу `T` обов'язковими:

```typescript
interface PartialPerson {
  name?: string;
  age?: number;
}

// Всі властивості стають обов'язковими
type CompletePerson = Required<PartialPerson>;

// Еквівалентно:
// type CompletePerson = {
//   name: string;
//   age: number;
// };

// Помилка: Property 'age' is missing in type '{ name: string; }' but required in type 'Required<PartialPerson>'
// const person: CompletePerson = { name: "Іван" };
```

### `Readonly<T>`

Робить всі властивості типу `T` доступними тільки для читання:

```typescript
interface Person {
  name: string;
  age: number;
}

// Всі властивості стають readonly
type ReadonlyPerson = Readonly<Person>;

// Еквівалентно:
// type ReadonlyPerson = {
//   readonly name: string;
//   readonly age: number;
// };

const person: ReadonlyPerson = { name: "Іван", age: 30 };
// person.name = "Петро"; // Помилка: Cannot assign to 'name' because it is a read-only property
```

### `Record<K, T>`

Створює тип з властивостями `K` типу `T`:

```typescript
// Створення типу з властивостями 'name', 'age', 'address' типу string
type PersonInfo = Record<"name" | "age" | "address", string>;

// Еквівалентно:
// type PersonInfo = {
//   name: string;
//   age: string;
//   address: string;
// };

const person: PersonInfo = {
  name: "Іван",
  age: "30", // Зверніть увагу, що age - це рядок
  address: "Київ"
};
```

### `Pick<T, K>`

Створює тип, вибираючи властивості `K` з типу `T`:

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
  email: string;
}

// Вибір тільки властивостей 'name' та 'email'
type ContactInfo = Pick<Person, "name" | "email">;

// Еквівалентно:
// type ContactInfo = {
//   name: string;
//   email: string;
// };

const contact: ContactInfo = {
  name: "Іван",
  email: "ivan@example.com"
};
```

### `Omit<T, K>`

Створює тип, виключаючи властивості `K` з типу `T`:

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
  email: string;
}

// Виключення властивостей 'address' та 'email'
type BasicInfo = Omit<Person, "address" | "email">;

// Еквівалентно:
// type BasicInfo = {
//   name: string;
//   age: number;
// };

const basicInfo: BasicInfo = {
  name: "Іван",
  age: 30
};
```

## Практичні приклади використання дженериків

### Приклад 1: Створення API клієнта

```typescript
// Дженерик функція для виконання HTTP запитів
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as T;
}

// Типи даних
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Використання з різними типами
async function loadData() {
  try {
    const user = await fetchData<User>("https://api.example.com/users/1");
    console.log(user.name);

    const posts = await fetchData<Post[]>("https://api.example.com/posts");
    console.log(posts[0].title);
  } catch (error) {
    console.error("Помилка:", error);
  }
}
```

### Приклад 2: Створення стану компонента

```typescript
// Дженерик клас для управління станом
class State<T> {
  private state: T;
  private listeners: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: T): void {
    this.state = newState;
    this.notifyListeners();
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

// Використання з різними типами стану
interface UserState {
  name: string;
  isLoggedIn: boolean;
}

const userState = new State<UserState>({ name: "", isLoggedIn: false });

// Підписка на зміни стану
const unsubscribe = userState.subscribe(state => {
  console.log(`Користувач ${state.name} ${state.isLoggedIn ? "увійшов" : "вийшов"}`);
});

// Зміна стану
userState.setState({ name: "Іван", isLoggedIn: true });
// Виведе: "Користувач Іван увійшов"

// Відписка
unsubscribe();
```

## Висновок

Дженерики - це потужний інструмент TypeScript, який дозволяє створювати гнучкі та типобезпечні компоненти. Вони особливо корисні при роботі з колекціями даних, API та створенні повторно використовуваних компонентів.

Основні переваги дженериків:
- Типова безпека для компонентів, що працюють з різними типами даних
- Повторне використання коду без втрати інформації про типи
- Можливість створення гнучких API та бібліотек

У наступному розділі ми розглянемо модулі та простори імен в TypeScript, які допомагають організувати код у великих проектах.
