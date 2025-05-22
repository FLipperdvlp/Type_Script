# Інтерфейси в TypeScript

Інтерфейси - це один з найпотужніших інструментів TypeScript. Вони дозволяють визначати структуру об'єктів та забезпечують контракт, якому повинні відповідати об'єкти.

## Основи інтерфейсів

Інтерфейс визначає, які властивості та методи повинен мати об'єкт.

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

// Об'єкт, що відповідає інтерфейсу Person
const user: Person = {
  firstName: "Іван",
  lastName: "Петренко",
  age: 30
};

// Помилка: відсутня обов'язкова властивість 'age'
// const invalidUser: Person = {
//   firstName: "Марія",
//   lastName: "Коваленко"
// };
```

## Необов'язкові властивості

Ви можете зробити деякі властивості інтерфейсу необов'язковими, додавши знак питання `?` після імені властивості.

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
  email?: string; // Необов'язкова властивість
  phone?: string; // Необов'язкова властивість
}

// Обидва об'єкти відповідають інтерфейсу Person
const user1: Person = {
  firstName: "Іван",
  lastName: "Петренко",
  age: 30
};

const user2: Person = {
  firstName: "Марія",
  lastName: "Коваленко",
  age: 25,
  email: "maria@example.com",
  phone: "+380991234567"
};
```

## Властивості тільки для читання

Ви можете зробити властивості інтерфейсу доступними тільки для читання, використовуючи ключове слово `readonly`.

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Помилка: Cannot assign to 'x' because it is a read-only property
```

## Індексні сигнатури

Індексні сигнатури дозволяють описувати об'єкти з динамічними ключами.

```typescript
interface Dictionary {
  [key: string]: string;
}

const colors: Dictionary = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
};

// Можна додавати нові властивості
colors.yellow = "#ffff00";

// Всі значення повинні бути рядками
// colors.black = 123; // Помилка: Type 'number' is not assignable to type 'string'
```

Можна комбінувати індексні сигнатури з конкретними властивостями:

```typescript
interface EmployeeInfo {
  name: string;
  position: string;
  [key: string]: string; // Всі інші властивості повинні бути рядками
}

const employee: EmployeeInfo = {
  name: "Іван",
  position: "Розробник",
  department: "IT",
  location: "Київ"
};
```

## Опис функцій через інтерфейси

Інтерфейси можуть описувати не тільки об'єкти, але й функції.

```typescript
interface MathFunc {
  (x: number, y: number): number;
}

const add: MathFunc = (x, y) => x + y;
const subtract: MathFunc = (x, y) => x - y;

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
```

## Розширення інтерфейсів

Інтерфейси можуть розширювати інші інтерфейси, успадковуючи їх властивості та методи.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const employee: Employee = {
  name: "Іван",
  age: 30,
  employeeId: "E123",
  department: "IT"
};
```

Інтерфейс може розширювати кілька інтерфейсів:

```typescript
interface Address {
  street: string;
  city: string;
  country: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface PersonWithDetails extends Person, Address, ContactInfo {
  occupation: string;
}

const personDetails: PersonWithDetails = {
  name: "Марія",
  age: 28,
  street: "Вулиця Шевченка",
  city: "Київ",
  country: "Україна",
  email: "maria@example.com",
  phone: "+380991234567",
  occupation: "Дизайнер"
};
```

## Інтерфейси для класів

Інтерфейси можуть визначати контракт, якому повинні відповідати класи. Для цього використовується ключове слово `implements`.

```typescript
interface Vehicle {
  brand: string;
  year: number;
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  brand: string;
  year: number;
  
  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }
  
  start(): void {
    console.log(`${this.brand} запущено`);
  }
  
  stop(): void {
    console.log(`${this.brand} зупинено`);
  }
  
  // Клас може мати додаткові методи та властивості
  honk(): void {
    console.log("Бііп!");
  }
}

const myCar = new Car("Toyota", 2020);
myCar.start(); // "Toyota запущено"
myCar.honk();  // "Бііп!"
myCar.stop();  // "Toyota зупинено"
```

## Відкриті інтерфейси (Declaration Merging)

В TypeScript інтерфейси з однаковим іменем автоматично об'єднуються. Це називається "declaration merging" (об'єднання оголошень).

```typescript
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// Результуючий інтерфейс Person має обидві властивості
const person: Person = {
  name: "Іван",
  age: 30
};
```

Це особливо корисно при роботі з бібліотеками, коли ви хочете розширити існуючі інтерфейси.

## Інтерфейси vs Типи (Type Aliases)

TypeScript має два способи визначення типів: інтерфейси та типи (type aliases). Вони дуже схожі, але мають деякі відмінності:

```typescript
// Інтерфейс
interface PersonInterface {
  name: string;
  age: number;
}

// Тип
type PersonType = {
  name: string;
  age: number;
};
```

Основні відмінності:

1. **Розширення**:
   - Інтерфейси можна розширювати за допомогою `extends`
   - Типи можна розширювати за допомогою перетинів `&`

2. **Об'єднання оголошень**:
   - Інтерфейси з однаковим іменем автоматично об'єднуються
   - Типи з однаковим іменем викликають помилку

3. **Примітивні типи**:
   - Типи можуть представляти примітивні значення, об'єднання, кортежі та інші складні типи
   - Інтерфейси можуть представляти тільки форму об'єкта

```typescript
// Можливо тільки з типами
type ID = string | number;
type Point = [number, number];
type Status = "active" | "inactive" | "pending";
```

## Рекомендації щодо використання

- Використовуйте **інтерфейси** для визначення контрактів класів та об'єктів, особливо коли ви очікуєте, що інтерфейс може бути розширений.
- Використовуйте **типи** для створення псевдонімів для примітивних типів, об'єднань, кортежів та інших складних типів.

## Висновок

Інтерфейси - це потужний інструмент TypeScript для визначення структури об'єктів та контрактів класів. Вони допомагають виявляти помилки на етапі компіляції та покращують читабельність коду. У наступних розділах ми розглянемо функції та класи в TypeScript.
