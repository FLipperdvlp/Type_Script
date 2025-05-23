# Вступ до TypeScript

## Що таке TypeScript?

TypeScript - це мова програмування з відкритим кодом, розроблена і підтримувана Microsoft. TypeScript є **надмножиною JavaScript**, що означає, що будь-який валідний JavaScript код також є валідним TypeScript кодом. Однак TypeScript додає до JavaScript статичну типізацію та інші корисні функції.

## Чому варто вивчати TypeScript?

1. **Статична типізація** - допомагає виявляти помилки на етапі компіляції, а не під час виконання
2. **Покращена підтримка IDE** - автодоповнення, підказки типів, рефакторинг
3. **Краща документація коду** - типи служать як документація
4. **Безпечніший рефакторинг** - компілятор повідомить про помилки при зміні коду
5. **Популярність у галузі** - багато компаній використовують TypeScript для великих проектів

## Різниця між JavaScript і TypeScript

JavaScript - це динамічно типізована мова, що означає, що тип змінної може змінюватися під час виконання програми. TypeScript додає статичну типізацію, яка запобігає зміні типу змінної.

### Приклад:

```javascript
// JavaScript
let message = "Привіт";
message = 42; // Це допустимо в JavaScript - тип змінився зі string на number

// TypeScript
let message: string = "Привіт";
message = 42; // Помилка: Type 'number' is not assignable to type 'string'
```

## Як працює TypeScript?

TypeScript не може бути безпосередньо виконаний браузером або Node.js. Замість цього, код TypeScript компілюється в JavaScript за допомогою TypeScript компілятора (tsc).

Процес роботи з TypeScript:
1. Написання коду TypeScript (.ts файли)
2. Компіляція TypeScript в JavaScript (.js файли)
3. Виконання JavaScript коду в браузері або Node.js

```
TypeScript код (.ts) → TypeScript компілятор (tsc) → JavaScript код (.js) → Браузер/Node.js
```

## Переваги та недоліки TypeScript

### Переваги:
- Виявлення помилок на етапі розробки
- Краща підтримка IDE та інструментів
- Полегшує розробку та підтримку великих проектів
- Покращує читабельність коду
- Полегшує роботу в команді

### Недоліки:
- Додатковий крок компіляції
- Крива навчання для розробників, які звикли до JavaScript
- Додаткова складність для малих проектів
- Необхідність написання типів може уповільнити початкову розробку

## Висновок

TypeScript - це потужний інструмент для розробки JavaScript додатків, який особливо корисний для великих проектів та командної роботи. Він допомагає виявляти помилки на ранніх етапах розробки та покращує якість коду. У наступних розділах ми розглянемо, як налаштувати середовище для роботи з TypeScript та почнемо вивчати основні концепції мови.
