# Функції в TypeScript

Функції є основним будівельним блоком будь-якої програми. TypeScript додає до функцій JavaScript можливість вказувати типи параметрів та значень, що повертаються, що робить код більш надійним та зрозумілим.

## Основи функцій в TypeScript

Ось простий приклад функції в TypeScript:

```typescript
// Функція з типізованими параметрами та типом повернення
function add(x: number, y: number): number {
  return x + y;
}

// Виклик функції
const result = add(5, 3); // 8
```

У цьому прикладі:
- `x: number` та `y: number` - типізовані параметри
- `: number` після дужок - тип значення, що повертається

## Необов'язкові параметри

Ви можете зробити параметри функції необов'язковими, додавши знак питання `?` після імені параметра:

```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

// Обидва виклики коректні
const name1 = buildName("Іван"); // "Іван"
const name2 = buildName("Іван", "Петренко"); // "Іван Петренко"
```

Необов'язкові параметри повинні йти після обов'язкових.

## Параметри за замовчуванням

Ви можете задати значення за замовчуванням для параметрів:

```typescript
function buildName(firstName: string, lastName = "Петренко"): string {
  return `${firstName} ${lastName}`;
}

// Обидва виклики коректні
const name1 = buildName("Іван"); // "Іван Петренко"
const name2 = buildName("Іван", "Коваленко"); // "Іван Коваленко"
```

## Залишкові параметри (Rest Parameters)

Залишкові параметри дозволяють передавати змінну кількість аргументів у функцію:

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Виклики з різною кількістю аргументів
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum()); // 0
```

## Функціональні типи

TypeScript дозволяє визначати типи функцій:

```typescript
// Визначення типу функції
type MathOperation = (x: number, y: number) => number;

// Функції, що відповідають типу MathOperation
const add: MathOperation = (x, y) => x + y;
const subtract: MathOperation = (x, y) => x - y;
const multiply: MathOperation = (x, y) => x * y;
const divide: MathOperation = (x, y) => x / y;

// Функція, що приймає іншу функцію як параметр
function calculate(operation: MathOperation, a: number, b: number): number {
  return operation(a, b);
}

console.log(calculate(add, 5, 3)); // 8
console.log(calculate(multiply, 5, 3)); // 15
```

## Перевантаження функцій (Function Overloading)

TypeScript дозволяє визначати кілька сигнатур для однієї функції, що називається перевантаженням функцій:

```typescript
// Перевантаження функцій
function convertToString(value: string): string;
function convertToString(value: number): string;
function convertToString(value: boolean): string;
function convertToString(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toString();
  } else {
    return value ? "true" : "false";
  }
}

console.log(convertToString("hello")); // "hello"
console.log(convertToString(42)); // "42"
console.log(convertToString(true)); // "true"
```

Перевантаження функцій допомагає TypeScript краще визначати, який тип повертає функція в залежності від типів аргументів.

## Стрілкові функції (Arrow Functions)

TypeScript повністю підтримує стрілкові функції з ES6:

```typescript
// Стрілкова функція з типами
const add = (x: number, y: number): number => x + y;

// Стрілкова функція з неявним поверненням
const multiply = (x: number, y: number): number => x * y;

// Стрілкова функція з блоком коду
const divide = (x: number, y: number): number => {
  if (y === 0) {
    throw new Error("Ділення на нуль");
  }
  return x / y;
};
```

## Контекст `this` у функціях

TypeScript дозволяє явно вказати тип `this` у функціях:

```typescript
interface Person {
  name: string;
  greet(this: Person): void;
}

const person: Person = {
  name: "Іван",
  greet() {
    console.log(`Привіт, мене звати ${this.name}`);
  }
};

person.greet(); // "Привіт, мене звати Іван"

// Помилка: The 'this' context of type 'void' is not assignable to method's 'this' of type 'Person'
// const greetFunc = person.greet;
// greetFunc();
```

## Дженерик функції (Generic Functions)

Дженерики дозволяють створювати функції, які працюють з різними типами даних:

```typescript
// Дженерик функція
function identity<T>(arg: T): T {
  return arg;
}

// Виклик з явним вказанням типу
const result1 = identity<string>("hello"); // тип: string
const result2 = identity<number>(42); // тип: number

// TypeScript може визначити тип автоматично
const result3 = identity("world"); // тип: string
const result4 = identity(100); // тип: number
```

Дженерики особливо корисні для функцій, які працюють з масивами або колекціями:

```typescript
// Функція, що повертає перший елемент масиву
function getFirst<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const first1 = getFirst([1, 2, 3]); // тип: number | undefined
const first2 = getFirst(["a", "b", "c"]); // тип: string | undefined
const first3 = getFirst([]); // тип: undefined
```

## Обмеження дженериків (Generic Constraints)

Ви можете обмежити типи, які можуть бути використані з дженерик функцією:

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
console.log(getLength("hello")); // 5
console.log(getLength([1, 2, 3])); // 3
console.log(getLength({ length: 10 })); // 10

// Помилка: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
// console.log(getLength(42));
```

## Функції як конструктори

TypeScript дозволяє визначати функції, які можуть бути викликані з оператором `new`:

```typescript
// Тип конструктора
interface PersonConstructor {
  new (name: string, age: number): Person;
}

interface Person {
  name: string;
  age: number;
  greet(): void;
}

// Функція, що приймає конструктор
function createPerson(ctor: PersonConstructor, name: string, age: number): Person {
  return new ctor(name, age);
}

// Клас, що відповідає інтерфейсу PersonConstructor
class Employee implements Person {
  constructor(public name: string, public age: number) {}
  
  greet(): void {
    console.log(`Привіт, мене звати ${this.name} і мені ${this.age} років`);
  }
}

const employee = createPerson(Employee, "Іван", 30);
employee.greet(); // "Привіт, мене звати Іван і мені 30 років"
```

## Асинхронні функції (Async/Await)

TypeScript повністю підтримує асинхронні функції з ES2017:

```typescript
// Асинхронна функція, що повертає Promise<string>
async function fetchData(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

// Використання асинхронної функції
async function getData() {
  try {
    const data = await fetchData("https://api.example.com/data");
    console.log(data);
  } catch (error) {
    console.error("Помилка:", error);
  }
}
```

## Висновок

Функції в TypeScript надають потужні можливості для створення надійного та типобезпечного коду. Типізація параметрів та повернених значень, дженерики, перевантаження та інші функції TypeScript допомагають виявляти помилки на етапі компіляції та покращують читабельність коду.

У наступному розділі ми розглянемо класи в TypeScript та об'єктно-орієнтоване програмування.
