# Модулі та простори імен в TypeScript

Модулі та простори імен (namespaces) в TypeScript допомагають організувати код, запобігти конфліктам імен та створити логічну структуру проекту. У цьому розділі ми розглянемо обидва підходи та їх відмінності.

## Модулі в TypeScript

Модулі в TypeScript базуються на модульній системі ECMAScript (ES модулі). Кожен файл вважається окремим модулем з власною областю видимості.

### Експорт з модуля

Щоб зробити змінні, функції, класи або інтерфейси доступними за межами модуля, їх потрібно експортувати:

```typescript
// math.ts
// Експорт окремих елементів
export const PI = 3.14159;

export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}

// Приватна функція (не експортується)
function multiply(x: number, y: number): number {
  return x * y;
}

// Експорт класу
export class Calculator {
  add(x: number, y: number): number {
    return x + y;
  }
  
  subtract(x: number, y: number): number {
    return x - y;
  }
}

// Експорт інтерфейсу
export interface Shape {
  area(): number;
}
```

Також можна експортувати елементи в кінці файлу:

```typescript
// math.ts
const PI = 3.14159;

function add(x: number, y: number): number {
  return x + y;
}

function subtract(x: number, y: number): number {
  return x - y;
}

// Експорт в кінці файлу
export { PI, add, subtract };
```

Можна експортувати елементи з іншим іменем:

```typescript
// math.ts
function add(x: number, y: number): number {
  return x + y;
}

// Експорт з перейменуванням
export { add as sum };
```

### Імпорт з модуля

Щоб використовувати експортовані елементи з іншого модуля, їх потрібно імпортувати:

```typescript
// app.ts
// Імпорт окремих елементів
import { PI, add, subtract, Calculator, Shape } from './math';

console.log(PI); // 3.14159
console.log(add(5, 3)); // 8

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8

// Реалізація інтерфейсу
class Circle implements Shape {
  constructor(private radius: number) {}
  
  area(): number {
    return PI * this.radius * this.radius;
  }
}
```

Можна імпортувати елементи з іншим іменем:

```typescript
// app.ts
// Імпорт з перейменуванням
import { PI as pi, add as sum } from './math';

console.log(pi); // 3.14159
console.log(sum(5, 3)); // 8
```

Можна імпортувати всі експортовані елементи як один об'єкт:

```typescript
// app.ts
// Імпорт всіх елементів як об'єкт
import * as Math from './math';

console.log(Math.PI); // 3.14159
console.log(Math.add(5, 3)); // 8

const calc = new Math.Calculator();
console.log(calc.add(5, 3)); // 8
```

### Експорт за замовчуванням

Модуль може мати один експорт за замовчуванням:

```typescript
// calculator.ts
// Експорт за замовчуванням
export default class Calculator {
  add(x: number, y: number): number {
    return x + y;
  }
  
  subtract(x: number, y: number): number {
    return x - y;
  }
}

// Також можна експортувати інші елементи
export const PI = 3.14159;
```

Імпорт експорту за замовчуванням:

```typescript
// app.ts
// Імпорт експорту за замовчуванням
import Calculator from './calculator';
// Імпорт іменованих експортів
import { PI } from './calculator';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(PI); // 3.14159
```

### Реекспорт

Можна реекспортувати елементи з іншого модуля:

```typescript
// math-utils.ts
// Реекспорт елементів з іншого модуля
export { add, subtract } from './math';
export { default as Calculator } from './calculator';

// Реекспорт з перейменуванням
export { PI as MathPI } from './math';
```

### Динамічний імпорт

TypeScript підтримує динамічний імпорт модулів за допомогою `import()`:

```typescript
// app.ts
// Динамічний імпорт
async function loadMathModule() {
  try {
    const math = await import('./math');
    console.log(math.add(5, 3)); // 8
  } catch (error) {
    console.error("Помилка завантаження модуля:", error);
  }
}

loadMathModule();
```

## Простори імен (Namespaces)

Простори імен - це старіший спосіб організації коду в TypeScript. Вони дозволяють групувати пов'язані функціональності під одним іменем.

> **Примітка:** Модулі є рекомендованим підходом для нових проектів. Простори імен залишаються для сумісності зі старим кодом.

### Оголошення простору імен

```typescript
// validation.ts
namespace Validation {
  // Інтерфейс, доступний тільки всередині простору імен
  interface StringValidator {
    isValid(s: string): boolean;
  }
  
  // Експортований клас (доступний за межами простору імен)
  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(s);
    }
  }
  
  // Експортований клас
  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      const zipRegex = /^\d{5}$/;
      return zipRegex.test(s);
    }
  }
}

// Використання класів з простору імен
const emailValidator = new Validation.EmailValidator();
console.log(emailValidator.isValid("test@example.com")); // true

const zipCodeValidator = new Validation.ZipCodeValidator();
console.log(zipCodeValidator.isValid("12345")); // true
```

### Розділення простору імен на кілька файлів

Простір імен може бути розділений на кілька файлів за допомогою директиви `reference`:

```typescript
// validation-interfaces.ts
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }
}
```

```typescript
// email-validator.ts
/// <reference path="validation-interfaces.ts" />
namespace Validation {
  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(s);
    }
  }
}
```

```typescript
// zip-code-validator.ts
/// <reference path="validation-interfaces.ts" />
namespace Validation {
  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      const zipRegex = /^\d{5}$/;
      return zipRegex.test(s);
    }
  }
}
```

```typescript
// app.ts
/// <reference path="email-validator.ts" />
/// <reference path="zip-code-validator.ts" />

// Використання класів з простору імен
const emailValidator = new Validation.EmailValidator();
console.log(emailValidator.isValid("test@example.com")); // true

const zipCodeValidator = new Validation.ZipCodeValidator();
console.log(zipCodeValidator.isValid("12345")); // true
```

### Вкладені простори імен

Простори імен можуть бути вкладеними:

```typescript
// validation.ts
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }
  
  // Вкладений простір імен
  export namespace Validators {
    export class EmailValidator implements StringValidator {
      isValid(s: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(s);
      }
    }
    
    export class ZipCodeValidator implements StringValidator {
      isValid(s: string): boolean {
        const zipRegex = /^\d{5}$/;
        return zipRegex.test(s);
      }
    }
  }
}

// Використання класів з вкладеного простору імен
const emailValidator = new Validation.Validators.EmailValidator();
console.log(emailValidator.isValid("test@example.com")); // true
```

### Імпорт простору імен

Можна створити псевдонім для простору імен або його частини:

```typescript
// app.ts
// Імпорт всього простору імен
import Validators = Validation.Validators;

const emailValidator = new Validators.EmailValidator();
console.log(emailValidator.isValid("test@example.com")); // true
```

## Модулі vs Простори імен

### Переваги модулів:

1. **Стандартна модульна система**: Модулі базуються на стандартній модульній системі ECMAScript.
2. **Кращий інструментарій**: Краща підтримка в інструментах збірки (Webpack, Rollup, тощо).
3. **Ізоляція**: Кожен файл є окремим модулем з власною областю видимості.
4. **Явні залежності**: Імпорти явно вказують залежності.
5. **Підтримка Tree Shaking**: Можливість видалення невикористаного коду при збірці.

### Переваги просторів імен:

1. **Групування пов'язаного коду**: Зручно для групування пов'язаних функціональностей.
2. **Сумісність зі старим кодом**: Корисно при роботі з існуючими проектами.
3. **Не потребує збірки**: Можна використовувати без інструментів збірки.

## Рекомендації щодо використання

- Для нових проектів рекомендується використовувати **модулі**.
- Використовуйте **простори імен** тільки для сумісності зі старим кодом або для дуже специфічних випадків.

## Організація модулів у великих проектах

Для великих проектів рекомендується організовувати модулі за функціональністю:

```
src/
  ├── components/
  │   ├── button.ts
  │   ├── input.ts
  │   └── index.ts  # Реекспортує всі компоненти
  ├── utils/
  │   ├── math.ts
  │   ├── string.ts
  │   └── index.ts  # Реекспортує всі утиліти
  ├── models/
  │   ├── user.ts
  │   ├── product.ts
  │   └── index.ts  # Реекспортує всі моделі
  └── index.ts      # Головний файл, реекспортує публічне API
```

Використання barrel файлів (index.ts) для реекспорту:

```typescript
// components/index.ts
export * from './button';
export * from './input';
```

```typescript
// app.ts
// Імпорт всіх компонентів з одного місця
import { Button, Input } from './components';
```

## Висновок

Модулі та простори імен в TypeScript допомагають організувати код та запобігти конфліктам імен. Модулі є рекомендованим підходом для нових проектів, тоді як простори імен залишаються для сумісності зі старим кодом.

У наступному розділі ми розглянемо роботу з DOM в TypeScript, що є важливою частиною веб-розробки.
