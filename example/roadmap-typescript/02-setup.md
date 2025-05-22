# Налаштування середовища для TypeScript

У цьому розділі ми розглянемо, як налаштувати середовище для роботи з TypeScript. Ми встановимо необхідні інструменти та створимо простий проект.

## Необхідні інструменти

Для роботи з TypeScript вам знадобляться:

1. **Node.js** - середовище виконання JavaScript
2. **npm** (Node Package Manager) - менеджер пакетів для Node.js (встановлюється разом з Node.js)
3. **TypeScript компілятор** - для перетворення TypeScript коду в JavaScript
4. **Редактор коду** - наприклад, Visual Studio Code, який має вбудовану підтримку TypeScript

## Крок 1: Встановлення Node.js та npm

1. Перейдіть на офіційний сайт [Node.js](https://nodejs.org/)
2. Завантажте та встановіть останню стабільну версію (LTS)
3. Перевірте встановлення, виконавши в терміналі:

```bash
node --version
npm --version
```

## Крок 2: Встановлення TypeScript

Встановіть TypeScript глобально за допомогою npm:

```bash
npm install -g typescript
```

Перевірте встановлення:

```bash
tsc --version
```

## Крок 3: Налаштування редактора коду

Рекомендуємо використовувати Visual Studio Code, який має вбудовану підтримку TypeScript:

1. Завантажте та встановіть [Visual Studio Code](https://code.visualstudio.com/)
2. Встановіть розширення для TypeScript (хоча VS Code вже має вбудовану підтримку)

## Крок 4: Створення першого TypeScript проекту

1. Створіть нову директорію для вашого проекту:

```bash
mkdir my-ts-project
cd my-ts-project
```

2. Ініціалізуйте npm проект:

```bash
npm init -y
```

3. Встановіть TypeScript локально для проекту:

```bash
npm install typescript --save-dev
```

4. Створіть файл конфігурації TypeScript (tsconfig.json):

```bash
npx tsc --init
```

5. Відкрийте згенерований файл `tsconfig.json` і переконайтеся, що він містить наступні налаштування (або додайте їх):

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

6. Створіть директорію `src` для вашого коду:

```bash
mkdir src
```

7. Створіть перший TypeScript файл `src/index.ts`:

```typescript
function greet(name: string): string {
  return `Привіт, ${name}!`;
}

console.log(greet("Світ"));
```

8. Додайте скрипти в `package.json`:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

9. Скомпілюйте та запустіть ваш код:

```bash
npm run build
npm start
```

## Структура проекту

Після виконання всіх кроків, ваш проект повинен мати таку структуру:

```
my-ts-project/
├── node_modules/
├── src/
│   └── index.ts
├── dist/
│   └── index.js (після компіляції)
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Налаштування для різних типів проектів

### Веб-додаток з використанням Webpack

Для веб-додатків можна використовувати Webpack для збірки:

```bash
npm install webpack webpack-cli ts-loader --save-dev
```

Створіть файл `webpack.config.js`:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### Node.js додаток з автоматичним перезавантаженням

Для розробки Node.js додатків зручно використовувати `ts-node` та `nodemon`:

```bash
npm install ts-node nodemon --save-dev
```

Додайте в `package.json`:

```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts"
}
```

## Висновок

Тепер ваше середовище налаштоване для роботи з TypeScript! Ви можете писати TypeScript код, компілювати його в JavaScript та запускати. У наступних розділах ми розглянемо основні типи даних та інші можливості TypeScript.
