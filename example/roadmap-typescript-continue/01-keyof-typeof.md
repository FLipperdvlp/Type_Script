# Оператори keyof і typeof у TypeScript

## Літеральні типи

У TypeScript літеральні типи - це більш конкретні типи рядків, чисел або логічних значень.

### Приклад літерального типу:

```typescript
type Role = "Admin";
const currentRole: Role = "Admin";
// Будь-яке інше значення викликає помилку
// const invalidRole: Role = "Admin123"; // Помилка: Type "Admin123" is not assignable to type "Admin"
```

### Об'єднання літеральних типів:

```typescript
type Roles = "Admin" | "Moderator" | "User";
const currentRole: Roles = "Admin"; // або "Moderator", або "User"
```

## Оператор keyof

Оператор `keyof` використовується для отримання ключів будь-якого типу.

### Приклад з інтерфейсом:

```typescript
interface User {
  name: string;
  age: number;
}

type UserKeys = keyof User; // "name" | "age"
const prop: UserKeys = "name"; // або "age"
```

### Робота з класами:

```typescript
class Person {
  name: string = "";
  age: number = 0;
  private secret: string = "secret";
  static version: string = "1.0";
}

type PersonField = keyof Person; // "name" | "age"
// Оператор keyof виводить тільки публічні не статичні ключі
```

## Оператор typeof

Оператор `typeof` у TypeScript відрізняється від `typeof` у JavaScript. У TypeScript він використовується для отримання типу змінної.

### Приклад використання:

```typescript
const message = {
  id: 1,
  text: "Hello"
};

// У JavaScript: typeof message поверне "object"
// У TypeScript:
type MessageType = typeof message; // { id: number; text: string }

const userMessage: MessageType = {
  id: 2,
  text: "Hi there"
};
```

## Комбінування keyof і typeof

Оператори `keyof` і `typeof` можна використовувати разом для створення гнучких типів.

### Приклад з enum:

```typescript
enum Colors {
  White = "white",
  Black = "black"
}

type AvailableColors = keyof typeof Colors; // "White" | "Black"
const color: AvailableColors = "White"; // або "Black"
```

## Практичний приклад

Створення функції валідації, яка динамічно адаптується до структури об'єкта:

```typescript
const formData = {
  firstName: "John",
  lastName: "Doe",
  id: 123,
  age: 30
};

// Тип для результату валідації, який автоматично відображає всі поля вхідного об'єкта
type ValidationResult<T> = {
  [K in keyof T]: boolean;
};

function validate<T>(data: T): ValidationResult<T> {
  // Реалізація валідації
  const result = {} as ValidationResult<T>;
  
  // Заповнюємо результат для кожного поля
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // Тут може бути логіка валідації для кожного поля
      result[key as keyof T] = true; // Припустимо, що всі поля валідні
    }
  }
  
  return result;
}

const validationResult = validate(formData);
// Результат: { firstName: boolean, lastName: boolean, id: boolean, age: boolean }
```

## Висновок

Оператори `keyof` і `typeof` у TypeScript дозволяють створювати гнучкі та типобезпечні конструкції, які адаптуються до структури даних. Це особливо корисно при розробці загальних функцій та утиліт, які повинні працювати з різними типами даних, зберігаючи при цьому типову безпеку.
