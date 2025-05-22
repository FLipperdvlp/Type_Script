# Дженерики в TypeScript

## Вступ

Дженерики (Generics) в TypeScript - це параметризовані типи, які дозволяють оголошувати параметри типу, що є тимчасовою заміною конкретних монолітних типів. Визначення цих типів виконується в момент використання.

## Проблема монолітних типів

Прості типи в TypeScript працюють за принципом констант або монолітів. Наприклад, якщо у нас є кілька інтерфейсів, як-от `User` і `Message`, ми використовуємо їх тільки для користувачів і повідомлень відповідно.

```typescript
interface User {
  name: string;
  age: number;
}

interface Message {
  id: number;
  text: string;
}
```

У сучасних frontend-додатках ми завантажуємо дані через API, тому нам потрібні додаткові властивості для відстеження стану:

```typescript
interface UserState {
  loading: boolean;
  error: Error | null;
  data: User;
}

interface MessageState {
  loading: boolean;
  error: Error | null;
  data: Message;
}
```

Ці інтерфейси відрізняються лише типом поля `data`. Створення подібних монолітних типів ускладнює код.

## Синтаксис дженериків

Дженерики оголошуються за допомогою пари кутових дужок, у яких через кому записуються типи-параметри:

```typescript
interface State<T> {
  loading: boolean;
  error: Error | null;
  data: T;
}

// Використання
type UserState = State<User>;
type MessageState = State<Message>;
```

Дженерики можна використовувати в:
- Інтерфейсах
- Типах
- Класах
- Функціях

## Приклади використання дженериків

### Функція ідентичності

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const s = "hello";
const n = 42;

const r1 = identity(s); // r1 має тип string
const r2 = identity(n); // r2 має тип number

const user = { name: "John", age: 30 };
const r3 = identity(user); // r3 має тип { name: string, age: number }
```

### Створення універсальних типів стану

```typescript
interface State<T> {
  loading: boolean;
  error: Error | null;
  data: T;
}

type UserState = State<User>;
type MessageState = State<Message>;

const messageStateData: MessageState = {
  loading: false,
  error: null,
  data: { id: 1, text: "Hello" }
};
```

### Функція для отримання випадкового елемента масиву

```typescript
function getRandomElement<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

const numbers = [1, 2, 3, 4, 5];
const randomNumber = getRandomElement(numbers); // тип: number

const strings = ["a", "b", "c"];
const randomString = getRandomElement(strings); // тип: string

const mixed = [1, "a", 2, "b"];
const randomItem = getRandomElement(mixed); // тип: number | string
```

### Функція об'єднання об'єктів

```typescript
function merge<U, V>(obj1: U, obj2: V): U & V {
  return { ...obj1, ...obj2 };
}

const obj1 = { a: 1, b: 2 };
const obj2 = { c: "hello" };

const merged = merge(obj1, obj2); // тип: { a: number, b: number, c: string }
```

## Вбудовані дженерики в TypeScript

TypeScript має багато вбудованих дженериків:

### Promise

```typescript
async function fetchRequest<T>(): Promise<T> {
  // Реалізація
  return {} as T;
}

const result: Promise<number> = fetchRequest<number>();
```

### Array

```typescript
type Games = string[];
// або
type Games = Array<string>;
```

### Record

```typescript
type Dictionary = Record<string, number>;
// Еквівалентно: { [key: string]: number }
```

## Обмеження дженериків

Дженерики можуть бути обмежені іншими типами за допомогою ключового слова `extends`:

```typescript
function getLength<T extends { length: number }>(collection: T): number {
  return collection.length;
}

getLength("string"); // Працює, рядки мають властивість length
getLength([1, 2, 3]); // Працює, масиви мають властивість length
// getLength(123); // Помилка, числа не мають властивість length
```

### Приклад з класом колекції даних

```typescript
interface WithId {
  id: string;
}

class DataCollection<T extends WithId> {
  constructor(public data: T[]) {}

  search(id: string): T | undefined {
    return this.data.find(item => item.id === id);
  }
}

interface User extends WithId {
  name: string;
  age: number;
}

interface Message extends WithId {
  text: string;
}

const users = new DataCollection<User>([
  { id: "1", name: "Max", age: 30 }
]);

const messages = new DataCollection<Message>([
  { id: "1", text: "Hello" }
]);

const user = users.search("1"); // тип: User | undefined
const message = messages.search("1"); // тип: Message | undefined
```

## Доступ до властивостей об'єкта через дженерики

### Отримання значення за ключем

```typescript
function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const obj = { name: "Max", age: 30 };
const name = getValue(obj, "name"); // тип: string
const age = getValue(obj, "age"); // тип: number
// getValue(obj, "height"); // Помилка, такого ключа немає в об'єкті
```

### Пошук ключа за значенням

```typescript
function findKey<T extends object, V extends T[keyof T]>(
  obj: T,
  value: V
): keyof T | null {
  const keys = Object.keys(obj) as Array<keyof T>;
  for (const key of keys) {
    if (obj[key] === value) {
      return key;
    }
  }
  return null;
}

const obj = { name: "Max", age: 30 };
const nameKey = findKey(obj, "Max"); // тип: "name" | "age" | null
```

### Безпечне оновлення поля об'єкта

```typescript
function patchField<T extends object, K extends keyof T, V extends T[K]>(
  obj: T,
  field: K,
  value: V
): void {
  obj[field] = value;
}

const obj = { name: "Max", age: 30 };
patchField(obj, "age", 31); // Працює
// patchField(obj, "age", "31"); // Помилка, не можна присвоїти string полю типу number
```

## Значення за замовчуванням для дженериків

TypeScript дозволяє вказувати для параметрів типу значення за замовчуванням:

```typescript
function format<T = string>(value: T): T {
  // Реалізація
  return value;
}

const result1 = format("hello"); // тип: string
const result2 = format(123); // тип: number
const result3 = format(); // тип: string (за замовчуванням)
```

## Приклад використання дженериків для React-компонентів

```typescript
type FunctionalComponent<P = {}> = {
  (props: P & { children?: any }): any;
};

interface UserProps {
  name: string;
  age: number;
}

const UserComponent: FunctionalComponent<UserProps> = (props) => {
  const { name, age, children } = props;
  // Реалізація компонента
  return null;
};

// Використання з властивостями
UserComponent({ name: "John", age: 30 });

// Використання без властивостей, тільки з children
const EmptyComponent: FunctionalComponent = (props) => {
  const { children } = props;
  // Реалізація компонента
  return null;
};
```

## Висновок

Дженерики в TypeScript дозволяють створювати гнучкі та типобезпечні конструкції, які адаптуються до різних типів даних. Вони допомагають уникнути дублювання коду та забезпечують типову безпеку при роботі з різними структурами даних.
