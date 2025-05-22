# Базові завдання з TypeScript

## Завдання 1: Типізація змінних
Додайте правильні типи для змінних.
```typescript
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let hobbies: string[] = ["reading", "swimming"];
let userInfo: { id: number; email: string } = {
  id: 1,
  email: "john@example.com"
};
```


## Завдання 2: Типізація функції додавання
Додайте типи для параметрів та результату функції.

```typescript
function add(a: number, b: number): number {
  return a + b;
}
// Приклад використання:
const sum1 = add(5, 10);
const sum2 = add(3.5, 7.25);
```

## Завдання 3: Типізація масиву
Додайте типізацію для масиву чисел.

```typescript
// Додайте типи
const numbers: number[] = [1, 2, 3, 4, 5];
function sumArray(arr: number[]): number {
  return arr.reduce((sum, current) => sum + current, 0);
}

// Приклад використання:
const total = sumArray(numbers);
```

## Завдання 4: Типізація об'єкта
Створіть інтерфейс для об'єкта користувача.

```typescript
// Створіть інтерфейс User
// Додайте типізацію для об'єкта user
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}
const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  isAdmin: false
};
function getUserInfo(user: User): string {
  return `${user.name} (${user.email})`;
}

// Приклад використання:
const userInfo = getUserInfo(user);
```

## Завдання 5: Типізація функції з необов'язковим параметром
Додайте типи для функції з необов'язковим параметром.

```typescript
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}
// Приклад використання:
const greeting1 = greet("John");
const greeting2 = greet("Jane", "Good morning");
```

## Завдання 6: Типізація функції з значенням за замовчуванням
Додайте типи для функції з параметром, що має значення за замовчуванням.

```typescript
// Додайте типи
function createUser(name: string, age: number, isActive: boolean = true) {
  return { name, age, isActive };
}

// Приклад використання:
const user1 = createUser("John", 30);
const user2 = createUser("Jane", 25, false);
```

## Завдання 7: Типізація функції з union типами
Додайте типи для функції, яка може приймати різні типи даних.

```typescript
// Додайте типи
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return value.toFixed(2);
  return String(value);
}

// Приклад використання:
const formattedString = formatValue("  Hello  ");
const formattedNumber = formatValue(42.1234);
const formattedBoolean = formatValue(true);
```

## Завдання 8: Типізація масиву об'єктів
Створіть інтерфейс для об'єктів у масиві та типізуйте масив.

```typescript
// Створіть інтерфейс Product
// Додайте типізацію для масиву products

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Tablet", price: 300 }
];

function getTotalPrice(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

// Приклад використання:
const totalPrice = getTotalPrice(products);
```

## Завдання 9: Типізація функції з кількома поверненнями
Додайте типи для функції, яка може повертати різні типи даних.

```typescript
// Додайте типи
function fetchData(id) {
  if (id <= 0) {
    return { error: "Invalid ID" };
  }
  
  return { data: `Data for ID ${id}` };
}

// Приклад використання:
const result1 = fetchData(1);
const result2 = fetchData(-1);
```

## Завдання 10: Типізація класу
Додайте типи для простого класу.

```typescript
// Додайте типи
class Counter {
  count;
  
  constructor(initialCount) {
    this.count = initialCount;
  }
  
  increment() {
    this.count += 1;
    return this.count;
  }
  
  decrement() {
    this.count -= 1;
    return this.count;
  }
  
  getCount() {
    return this.count;
  }
}

// Приклад використання:
const counter = new Counter(0);
counter.increment();
counter.increment();
const currentCount = counter.getCount();
```

## Завдання 11: Типізація перелічення (enum)
Створіть і використайте перелічення для статусів завдань.

```typescript
// Створіть enum TaskStatus

function getTaskStatusText(status) {
  switch (status) {
    case TaskStatus.Todo:
      return "To Do";
    case TaskStatus.InProgress:
      return "In Progress";
    case TaskStatus.Done:
      return "Done";
    default:
      return "Unknown";
  }
}

// Приклад використання:
const status = TaskStatus.InProgress;
const statusText = getTaskStatusText(status);
```

## Завдання 12: Типізація функції з типом кортежу
Додайте тип кортежу для функції, яка повертає пару значень.

```typescript
// Додайте типи
function parseCoordinates(coordinates) {
  const [x, y] = coordinates.split(",").map(Number);
  return [x, y];
}

// Приклад використання:
const coords = parseCoordinates("10,20");
const [x, y] = coords;
```

## Завдання 13: Типізація з використанням readonly
Використайте readonly для захисту даних від зміни.

```typescript
// Додайте типи з використанням readonly
function createConfig(settings) {
  return settings;
}

// Приклад використання:
const config = createConfig({
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
});

// config.timeout = 10000; // Це має викликати помилку TypeScript
```

## Завдання 14: Типізація з використанням типу Record
Використайте тип Record для об'єкта з динамічними ключами.

```typescript
// Додайте типи з використанням Record
function createDictionary() {
  const dictionary = {};
  
  return {
    add: (key, value) => {
      dictionary[key] = value;
    },
    get: (key) => dictionary[key],
    getAll: () => dictionary
  };
}

// Приклад використання:
const userRoles = createDictionary();
userRoles.add("john", "admin");
userRoles.add("jane", "editor");
const johnsRole = userRoles.get("john");
```

## Завдання 15: Типізація з використанням Partial
Використайте Partial для функції оновлення об'єкта.

```typescript
// Створіть інтерфейс User
// Використайте Partial для типізації функції updateUser

function updateUser(user, updates) {
  return { ...user, ...updates };
}

// Приклад використання:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30
};

const updatedUser = updateUser(user, { age: 31, email: "john.doe@example.com" });
```

## Завдання 16: Типізація з використанням Pick
Використайте Pick для вибору підмножини властивостей.

```typescript
// Створіть інтерфейс User
// Використайте Pick для типізації функції getUserPublicInfo

function getUserPublicInfo(user) {
  const { id, name, email } = user;
  return { id, name, email };
}

// Приклад використання:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
  role: "admin"
};

const publicInfo = getUserPublicInfo(user);
```

## Завдання 17: Типізація з використанням Omit
Використайте Omit для виключення властивостей.

```typescript
// Створіть інтерфейс User
// Використайте Omit для типізації функції getUserSafeInfo

function getUserSafeInfo(user) {
  const { password, ...safeInfo } = user;
  return safeInfo;
}

// Приклад використання:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
  role: "admin"
};

const safeInfo = getUserSafeInfo(user);
```

## Завдання 18: Типізація з використанням keyof
Використайте keyof для доступу до властивостей об'єкта за ключем.

```typescript
// Додайте типи з використанням keyof
function getProperty(obj, key) {
  return obj[key];
}

// Приклад використання:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

const userName = getProperty(user, "name");
// const invalid = getProperty(user, "age"); // Це має викликати помилку TypeScript
```

## Завдання 19: Типізація з використанням typeof
Використайте typeof для отримання типу з існуючого об'єкта.

```typescript
// Додайте типи з використанням typeof
const defaultUser = {
  id: 0,
  name: "Guest",
  isGuest: true
};

function createUser(name) {
  return {
    ...defaultUser,
    id: Date.now(),
    name,
    isGuest: false
  };
}

// Приклад використання:
const newUser = createUser("John");
```

## Завдання 20: Типізація з використанням as const
Використайте as const для створення readonly кортежу.

```typescript
// Додайте типи з використанням as const
const COLORS = ["red", "green", "blue"];

function getRandomColor() {
  const index = Math.floor(Math.random() * COLORS.length);
  return COLORS[index];
}

// Приклад використання:
const color = getRandomColor();
```
