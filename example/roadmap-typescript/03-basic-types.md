# Основні типи даних в TypeScript

TypeScript надає широкий набір типів даних, які допомагають краще описувати структуру вашого коду. У цьому розділі ми розглянемо основні типи даних та як їх використовувати.

## Примітивні типи

TypeScript підтримує всі примітивні типи JavaScript, але з додатковими можливостями статичної типізації.

### Boolean (логічний тип)

Представляє логічні значення `true` або `false`.

```typescript
let isDone: boolean = false;
let isActive: boolean = true;
```

### Number (числовий тип)

Представляє числові значення. TypeScript, як і JavaScript, використовує числа з плаваючою точкою (float).

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;      // шістнадцяткове число
let binary: number = 0b1010;   // двійкове число
let octal: number = 0o744;     // вісімкове число
```

### String (рядковий тип)

Представляє текстові дані. Можна використовувати одинарні (`'`) або подвійні (`"`) лапки, а також зворотні лапки (`` ` ``) для шаблонних рядків.

```typescript
let firstName: string = "Іван";
let lastName: string = 'Петренко';

// Шаблонні рядки (template strings)
let fullName: string = `${firstName} ${lastName}`;
let greeting: string = `Привіт, ${fullName}!`;
```

### Null і Undefined

TypeScript має два спеціальні типи: `null` і `undefined`.

```typescript
let u: undefined = undefined;
let n: null = null;
```

За замовчуванням `null` і `undefined` є підтипами всіх інших типів. Однак, якщо ви включите опцію `--strictNullChecks` в `tsconfig.json`, вони будуть сумісні тільки з `any` та їх власними типами.

## Складні типи

### Array (масив)

Масиви в TypeScript можна оголосити двома способами:

```typescript
// Спосіб 1: використання квадратних дужок
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Анна", "Петро", "Марія"];

// Спосіб 2: використання дженерика Array<тип>
let fruits: Array<string> = ["яблуко", "банан", "апельсин"];
let scores: Array<number> = [85, 90, 95];
```

### Tuple (кортеж)

Кортеж - це масив з фіксованою кількістю елементів, типи яких відомі, але не обов'язково однакові.

```typescript
// Оголошення кортежу [string, number]
let person: [string, number] = ["Іван", 25];

// Доступ до елементів
console.log(person[0]); // "Іван"
console.log(person[1]); // 25

// Помилка: присвоєння неправильного типу
// person[0] = 100; // Помилка: Type 'number' is not assignable to type 'string'
```

### Enum (перелічення)

Enum дозволяє визначити набір іменованих констант.

```typescript
enum Color {
  Red,
  Green,
  Blue
}

let c: Color = Color.Green;
console.log(c); // 1 (індекс Green в переліченні)

// Можна задати власні значення
enum Status {
  Active = 1,
  Inactive = 2,
  Pending = 3
}

let status: Status = Status.Active;
console.log(status); // 1

// Можна отримати назву за значенням
console.log(Status[1]); // "Active"
```

### Any (будь-який тип)

Тип `any` дозволяє присвоїти змінній значення будь-якого типу. Це корисно при роботі з динамічними даними або при поступовій міграції з JavaScript на TypeScript.

```typescript
let notSure: any = 4;
notSure = "можливо це рядок";
notSure = false; // тепер це логічне значення

// Масив з елементами різних типів
let mixed: any[] = [1, "два", true];
```

> **Увага:** Надмірне використання `any` зменшує переваги TypeScript. Намагайтеся уникати цього типу, коли можливо.

### Void (відсутність значення)

Тип `void` зазвичай використовується як тип повернення функцій, які нічого не повертають.

```typescript
function logMessage(message: string): void {
  console.log(message);
  // Немає return, або return без значення
}
```

### Never (ніколи)

Тип `never` представляє тип значень, які ніколи не відбуваються. Наприклад, функція, яка завжди викидає виняток або ніколи не завершується.

```typescript
// Функція, що викидає виняток
function throwError(message: string): never {
  throw new Error(message);
}

// Функція з нескінченним циклом
function infiniteLoop(): never {
  while (true) {
    // щось робимо
  }
}
```

### Object (об'єкт)

Тип `object` представляє будь-яке значення, яке не є примітивним типом.

```typescript
let obj: object = { name: "Іван", age: 30 };

// Більш конкретне визначення об'єкта
let person: { name: string; age: number } = { name: "Марія", age: 25 };
```

## Типи об'єднання (Union Types)

TypeScript дозволяє створювати змінні, які можуть мати один з декількох типів, використовуючи оператор `|`.

```typescript
let id: string | number;
id = "abc123"; // OK
id = 123;      // OK
// id = true;  // Помилка: Type 'boolean' is not assignable to type 'string | number'

// Функція, яка приймає рядок або масив рядків
function printId(id: string | string[]): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.join(", "));
  }
}
```

## Типи перетину (Intersection Types)

TypeScript дозволяє створювати типи, які є комбінацією декількох типів, використовуючи оператор `&`.

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

// Тип, що поєднує властивості Person і Employee
type EmployeePerson = Person & Employee;

let employee: EmployeePerson = {
  name: "Іван",
  age: 30,
  employeeId: "E123",
  department: "IT"
};
```

## Літеральні типи (Literal Types)

Літеральні типи дозволяють вказати конкретне значення, яке змінна може мати.

```typescript
// Літеральний рядковий тип
let direction: "north" | "south" | "east" | "west";
direction = "north"; // OK
// direction = "northeast"; // Помилка: Type '"northeast"' is not assignable to type '"north" | "south" | "east" | "west"'

// Літеральний числовий тип
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3; // OK
// diceRoll = 7; // Помилка: Type '7' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6'
```

## Type Assertions (Приведення типів)

Іноді у вас може бути інформація про тип значення, яку TypeScript не має. Type assertions дозволяють вказати компілятору, що ви знаєте більше про тип.

```typescript
// Спосіб 1: використання as
let someValue: any = "це рядок";
let strLength: number = (someValue as string).length;

// Спосіб 2: використання кутових дужок (застаріла форма, не працює в JSX)
let someValue2: any = "це рядок";
let strLength2: number = (<string>someValue2).length;
```

## Type Aliases (Псевдоніми типів)

Type aliases дозволяють створювати власні імена для типів.

```typescript
type ID = string | number;

function printID(id: ID) {
  console.log(id);
}

type Point = {
  x: number;
  y: number;
};

function printPoint(point: Point) {
  console.log(`Координати: (${point.x}, ${point.y})`);
}
```

## Висновок

TypeScript надає багатий набір типів, які допомагають краще описувати структуру вашого коду. Використання правильних типів даних допомагає виявляти помилки на етапі компіляції та покращує якість коду. У наступних розділах ми розглянемо більш складні типи та концепції, такі як інтерфейси та класи.
