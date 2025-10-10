# 📅 date-locale

> 🌍 Lightweight date conversion utilities between **Gregorian ↔ Persian (Jalali)** calendars.  
> ⚡ Zero-dependency, TypeScript-ready, and tree-shakeable.

---

## ✨ Features

- 🔄 Convert **Gregorian → Persian (Jalali)** dates
- 🔄 Convert **Persian (Jalali) → Gregorian** dates
- ⚡ Written in **TypeScript** with type definitions
- 📦 Provides **ESM** and **CJS** builds
- ✅ Zero external dependencies
- 🚀 Ready for CI/CD and npm publishing

---

## 📦 Installation

```bash
npm install date-locale
```

or using **yarn**:

```bash
yarn add date-locale
```

---

## 🚀 Usage

### Import

```ts
import { gregorianToPersianDate, persianToGregorianDate } from 'date-locale';
```

---

### 📅 Convert Gregorian → Persian

```ts
const persianDate = gregorianToPersianDate('2025-10-03');
console.log(persianDate);
// 👉 "1404-07-11"
```

---

### 📅 Convert Persian → Gregorian

```ts
const gregorianDate = persianToGregorianDate('1404-07-11');
console.log(gregorianDate);
// 👉 "2025-10-03"
```

---

## 📂 Project Structure

```
src/
  utils/
    dateUtils.ts         # Shared helper functions
  converters/
    gregorianToPersian.ts
    persianToGregorian.ts
  index.ts               # Export main API
```

---

## ⚙️ Build

```bash
npm run build
```

Generates output in:

```
dist/
  index.cjs.js     # CommonJS build
  index.esm.js     # ES Module build
  index.d.ts       # TypeScript definitions
```

---

## 🧪 Test locally

```bash
node -r ts-node/register <<EOF
import { gregorianToPersianDate } from "./src";
console.log(gregorianToPersianDate("2025-10-03"));
EOF
```

---

## 🤖 CI/CD

- ✅ **CI (GitHub Actions)** runs on every PR & push
- 🚀 **Release workflow** publishes to npm when a new Git tag (`vX.X.X`) is pushed

---

## 🤝 Contributing

1. Fork the repo 🍴
2. Create a new branch 🌱
3. Make your changes ✨
4. Submit a Pull Request 🚀

---

## 📜 License

[MIT](./LICENSE) © 2025

---

## 💡 Inspiration

This package was built to make **date conversion between Gregorian and Persian calendars simple, fast, and reliable**. Perfect for developers building apps for Iran & international projects. 🌍
