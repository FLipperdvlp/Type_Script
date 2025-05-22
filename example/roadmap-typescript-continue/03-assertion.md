# Утвердження типів у TypeScript

## Вступ

Іноді ви як програміст можете знати набагато більше про тип, який використовуєте, ніж TypeScript може визначити. Для таких випадків існує механізм утвердження типів (Type Assertion).

## Базове використання утвердження типів

Розглянемо простий приклад:

```typescript
let value: any;
value = "Hello, world!";

// Помилка: Property 'toUpperCase' does not exist on type 'any'
// value.toUpperCase();

// Використання утвердження типу з оператором as
const upperValue = (value as string).toUpperCase();

// Альтернативний синтаксис з кутовими дужками
const upperValue2 = (<string>value).toUpperCase();
```

Обидва записи абсолютно аналогічні, але синтаксис з кутовими дужками не можна використовувати в JSX (React), оскільки парсер буде їх неправильно розпізнавати.

## Практичні приклади використання

### Робота з неповними об'єктами

```typescript
interface UserData {
  name: string;
  age: number;
}

// Помилка: Property 'name' is missing in type '{}' but required in type 'UserData'
// const user: UserData = {};

// Використання утвердження типу
const user = {} as UserData;

// Тепер можна додати властивості пізніше
user.name = "Alex";
user.age = 30;
```

Цей підхід корисний, коли властивості об'єкта заповнюються поступово або отримуються через API.

### Отримання ключів об'єкта

```typescript
const person = {
  name: "Alex",
  color: "black"
};

// TypeScript визначає keys як string[]
const keys = Object.keys(person);

// З утвердженням типу можемо отримати точніший тип
const typedKeys = Object.keys(person) as (keyof typeof person)[];

// Тепер typedKeys має тип ("name" | "color")[]
typedKeys.forEach(key => {
  console.log(person[key]);
});
```

### Робота з DOM-елементами

```typescript
// Отримання елемента input
const inputElement = document.querySelector('#input-name');

// Помилка: Property 'value' does not exist on type 'Element | null'
// const inputValue = inputElement.value;

// Використання утвердження типу
const inputValue = (inputElement as HTMLInputElement).value;
```

### Робота з об'єднаними типами

```typescript
type ErrorMessage = string | string[] | Error;

// Припустимо, що дані приходять з сервера
const apiResponse = JSON.parse(jsonString) as ErrorMessage;

// Якщо ми знаємо, що завжди отримуємо масив
const errors = apiResponse as string[];
const formattedErrors = errors.map(err => err.toUpperCase());
```

## Утвердження const

Утвердження `const` обмежує тип поточним значенням:

```typescript
// Звичайне визначення об'єкта
const test = {
  name: "User",
  age: 20
};
// Тип: { name: string; age: number }

// З утвердженням const
const testConst = {
  name: "User",
  age: 20
} as const;
// Тип: { readonly name: "User"; readonly age: 20 }
```

Утвердження `const` робить:
1. Всі поля об'єкта readonly (тільки для читання)
2. Тип полів строго обмежується їхніми значеннями

### Приклад з масивом

```typescript
// Звичайний масив
const months = ["Січень", "Лютий", "Березень"];
// Тип: string[]

// З утвердженням const
const monthsConst = ["Січень", "Лютий", "Березень"] as const;
// Тип: readonly ["Січень", "Лютий", "Березень"]

// Можна додавати елементи до звичайного масиву
months.push("Квітень"); // OK

// Не можна модифікувати масив з утвердженням const
// monthsConst.push("Квітень"); // Помилка
```

### Обмеження утвердження const

Утвердження `const` повністю перетворює об'єкт або масив на незмінну структуру даних тільки коли значення оголошено на місці:

```typescript
// Оголошення масиву окремо
const skills = ["HTML", "CSS"];
const skillsConst = skills as const;

// Все ще можна модифікувати оригінальний масив
skills.push("JavaScript"); // OK

// Але якщо оголосити безпосередньо з as const
const directSkills = ["HTML", "CSS"] as const;
// directSkills.push("JavaScript"); // Помилка
```

## Важливо пам'ятати

У TypeScript термін "утвердження типу" (type assertion) використовується замість "приведення типу" (type casting), як в інших мовах програмування. Це тому, що система типів, включаючи утвердження типу і утвердження `as const`, повністю стирається в скомпільованому JavaScript.

Таким чином, під час виконання немає абсолютно ніякої різниці між програмою, яка використовує утвердження типів, і програмою, яка цього не робить. Всі ці перевірки відбуваються тільки на стадії компіляції.

## Висновок

Утвердження типів у TypeScript - потужний інструмент, який дозволяє програмісту надати компілятору додаткову інформацію про типи. Однак його слід використовувати обережно, оскільки надмірне використання може призвести до помилок під час виконання, які не виявляються на етапі компіляції.
