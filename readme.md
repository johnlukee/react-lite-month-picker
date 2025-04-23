# Re3ve Month Picker

![https://img.shields.io/npm/dw/react-lite-month-picker](https://img.shields.io/npm/dw/react-lite-month-picker) ![npm](https://img.shields.io/npm/v/react-lite-month-picker) ![GitHub top language](https://img.shields.io/github/languages/top/henripar/react-lite-month-picker) ![GitHub](https://img.shields.io/github/license/henripar/react-lite-month-picker)

Simple, modern and customizable month picker component for ReactJS.

![React Lite Month Picker](https://www.react-lite-month-picker.dev/header-cover.png)

## ✨ Features

✅ **React 18 Compatible**  
🧠 **Written in TypeScript**  
⚡ **Lightweight**: No runtime dependencies  
🎨 **Customizable via CSS Variables**  
🌍 **Supports 40+ languages (via Intl API)**  
♿ **Accessible (WCAG 2.1 compliant)**

## 📥 Installation

**Using npm:**

```bash
npm install react-lite-month-picker --save
```

**Using yarn:**

```bash
yarn add react-lite-month-picker
```

**Using bun:**

```bash
bun install react-lite-month-picker
```

## 💻 Usage

```jsx
import { useState } from "react";
import { MonthPicker, MonthInput } from "re3ve-month-picker";

function Example() {
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: 4,
    year: 2025,
  });

  return (
    <div>
      <MonthPicker
        selected={selectedMonthData}
        onChange={setSelectedMonthData}
      />
    </div>
  );
}

export default Example;
```

### Selected month data

Currently selected month data is an object with the following structure:

```js
{
  month: 4,
  year: 2025,
  monthName: 'April',
  monthShort: 'apr'
}
```

It will get saved on set parent component state with `onChange` event.

## Customization

You can customize the behavior and styles of the `MonthPicker` component via props.

### 🧩 Behavior Props

| Prop name       | Description                                              | Type                                               | Default     |
| --------------- | -------------------------------------------------------- | -------------------------------------------------- | ----------- |
| `value`         | The current selected range `{ from, to }`                | `{ from?: { year, month }, to?: { year, month } }` | `undefined` |
| `onChange`      | Callback fired on selection change                       | `(range: { from, to }) => void`                    | —           |
| `lang`          | Language locale used to format month names (uses `Intl`) | `string`                                           | `'en'`      |
| `disablePast`   | Disables months before the current month                 | `boolean`                                          | `false`     |
| `disableFuture` | Disables months after the current month                  | `boolean`                                          | `false`     |
| `minMonth`      | Disables all months before a specific `{ year, month }`  | `{ year: number; month: number }`                  | —           |
| `maxMonth`      | Disables all months after a specific `{ year, month }`   | `{ year: number; month: number }`                  | —           |
| `disableMonths` | Custom logic to disable specific months dynamically      | `(month: { year, month }) => boolean`              | —           |

---

### 🎨 Styling with `classNames`

You can style the component using the `classNames` prop. It accepts an object with the following optional keys:

```ts
type MonthPickerClassNames = {
  wrapper?: string;
  header?: string;
  navButton?: string;
  yearLabel?: string;
  monthGrid?: string;
  monthButton?: string;
  monthButtonActive?: string;
  monthButtonRange?: string;
};
```

## License

MIT © [henripar](https://github.com/henripar)
