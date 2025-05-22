# TypeScript Utility Types

## Вступ

Основи utility types у TypeScript допомагають дотримуватися принципу "Don't Repeat Yourself" і використовувати існуючий код максимально, не створюючи зайвих типів у ваших додатках.

## Readonly\<T>

Робить поля об'єкта доступними лише для читання.

### Приклад:

```typescript
type Task = {
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date;
};

// Функція, яка змінює завдання
function completeTask(task: Task) {
  task.isCompleted = true;
  task.completedDate = new Date();
}

// Використання Readonly для захисту від змін
type ReadonlyTask = Readonly<Task>;

const task: ReadonlyTask = {
  id: 1,
  text: "Test",
  isCompleted: false,
  completedDate: undefined,
};

// Тепер TypeScript не дозволить мутувати завдання напряму
// task.isCompleted = true; // Помилка: поле доступне лише для читання
```

## Partial\<T>

Робить усі поля об'єкта опціональними.

### Приклад:

```typescript
type PartialTask = Partial<Task>;

// Функція для оновлення завдання
function updateTask(task: Task, patch: Partial<Task>): Task {
  return { ...task, ...patch };
}

const task: Task = {
  id: 1,
  text: "Test",
  isCompleted: false,
  completedDate: undefined,
};

// Використання
updateTask(task, { isCompleted: true }); // Працює
// updateTask(task, { lol: 123 }); // Помилка: такого поля немає в Task
```

## Required\<T>

Робить усі поля об'єкта обов'язковими.

### Приклад:

```typescript
type RequiredTask = Required<Task>;

// Функція, що повертає лише виконані завдання
function getCompletedTasks(tasks: Task[]): Required<Task>[] {
  return tasks.filter(
    (task) => task.isCompleted && task.completedDate
  ) as Required<Task>[];
}

const tasks: Task[] = [
  {
    id: 1,
    text: "Test",
    isCompleted: false,
    completedDate: undefined,
  },
  {
    id: 2,
    text: "Test",
    isCompleted: true,
    completedDate: new Date(),
  },

  {
    id: 3,
    text: "Test",
    isCompleted: true,
    completedDate: new Date(),
  },
];

const completedTasks = getCompletedTasks(tasks);

console.log(completedTasks);

// Усі завдання, що повертаються з цієї функції, матимуть заповнені поля isCompleted і completedDate
```

## Pick\<T, K>

Призначений для фільтрації ключів об'єкта.

### Приклад:

```typescript
type UserSchemaType = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: number;
};

// Вибираємо лише публічні властивості користувача
type PublicUserFields = Pick<
  UserSchemaType,
  "username" | "email" | "bio" | "image"
>;
```

## Omit\<T, K>

Працює протилежно до Pick - виключає вказані поля.

### Приклад:

```typescript
// Виключаємо приватні поля
type PublicUserFields = Omit<UserSchemaType, "hash" | "salt">;
// Результат: усі поля крім hash і salt
```

## Record\<K, T>

Призначений для динамічного конструювання об'єктів.

### Приклад:

```typescript
// Простий приклад
type ABC = Record<"a" | "b" | "c", string>;
// Результат: { a: string, b: string, c: string }

// Складніший приклад
type ThemeParams = {
  background: string;
  fontSize: number;
  color: string;
};

type Themes = "light" | "dark";

type AppThemes = Record<Themes, ThemeParams>;

// Використання
const themes: AppThemes = {
  light: { background: "white", fontSize: 16, color: "black" },
  dark: { background: "black", fontSize: 16, color: "white" },
};
```

## Exclude\<T, U>

Виключає з першого типу ознаки, притаманні другому.

### Приклад:

```typescript
// Отримуємо лише публічні поля
type PublicFields = Exclude<keyof UserSchemaType, "hash" | "salt">;
// Результат: 'username' | 'email' | 'bio' | 'image' | 'id'
```

## Extract\<T, U>

Обчислює спільні для двох типів ознаки.

### Приклад:

```typescript
// Простий приклад
type Intersection = Extract<"id" | "name", "name">;
// Результат: 'name'

// Приклад з типами
type Common = Extract<keyof Task, keyof UserSchemaType>;
// Результат: 'id' (спільне поле у Task і UserSchemaType)
```

## NonNullable\<T>

Видаляє null і undefined з типу, що передається.

### Приклад:

```typescript
type T = NonNullable<string | null | undefined>;
// Результат: string

// Практичний приклад
function getCompletedDate(task: Task): NonNullable<Task["completedDate"]> {
  if (!task.completedDate) {
    return new Date();
  }
  return task.completedDate;
}
```

## ReturnType\<T>

Дозволяє отримати тип значення, що повертається функцією.

### Приклад:

```typescript
function getInt(n: string): number {
  return parseInt(n);
}

type R = ReturnType<typeof getInt>;
// Результат: number

// Складніший приклад
function createTask() {
  return { id: 1, text: "Test" };
}

type CreatedTask = ReturnType<typeof createTask>;
// Результат: { id: number, text: string }
```

## Parameters\<T>

Дозволяє отримати типи параметрів функції.

### Приклад:

```typescript
type InputParams = Parameters<typeof getInt>;
// Результат: [n: string]

// Для конструкторів класів
class Person {
  constructor(name: string, age: number) {}
}

type PersonConstructorParams = ConstructorParameters<typeof Person>;
// Результат: [name: string, age: number]
```

## Awaited\<T>

Дозволяє рекурсивно розгортати Promise.

### Приклад:

```typescript
async function fetch(): Promise<string> {
  return "data";
}

type FetchResult = ReturnType<typeof fetch>;
// Результат: Promise<string>

type UnwrappedResult = Awaited<ReturnType<typeof fetch>>;
// Результат: string
```

## Маніпуляції з рядками

TypeScript надає типи для маніпуляції рядками.

### Приклад:

```typescript
type Name = "john";

type UpperName = Uppercase<Name>;
// Результат: 'JOHN'

type LowerName = Lowercase<Name>;
// Результат: 'john'

type CapitalizedName = Capitalize<Name>;
// Результат: 'John'

type UncapitalizedName = Uncapitalize<Name>;
// Результат: 'john'
```

## Створення власних утиліт

Можна створювати власні утиліти на основі існуючих.

### Приклад:

```typescript
const user = {
  name: "John",
  age: 40,
};

type User = typeof user;

// Створюємо тип для геттерів
type GettersOf<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Функція для створення геттерів
function createGetters<T>(obj: T): GettersOf<T> & T {
  // Реалізація
  return {} as any;
}

// Використання
const userWithGetters = createGetters(user);
// Результат: об'єкт з методами getName(), getAge() та вихідними полями
```

## Висновок

Utility types у TypeScript дозволяють ефективно маніпулювати існуючими типами, дотримуючись принципу DRY і створюючи більш гнучкий та типобезпечний код.
