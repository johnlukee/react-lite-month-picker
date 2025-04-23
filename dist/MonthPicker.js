import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "./utils/classnames";
import "./styles/global.css";
export function MonthPicker({ value, disableFuture, onChange, lang = "en", classNames = {}, }) {
    const [year, setYear] = useState(value?.from?.year ?? new Date().getFullYear());
    const [range, setRange] = useState(value ?? {});
    const getMonthNames = () => {
        const formatter = new Intl.DateTimeFormat(lang, {
            month: "short",
            timeZone: "UTC",
        });
        return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(Date.UTC(2023, i, 1))));
    };
    const handleSelect = (monthIndex) => {
        const selected = { year, month: monthIndex + 1 };
        if (!range.from || (range.from && range.to)) {
            const next = { from: selected, to: undefined };
            setRange(next);
            onChange?.(next);
        }
        else {
            const fromDate = new Date(range.from.year, range.from.month - 1);
            const toDate = new Date(selected.year, selected.month - 1);
            const final = fromDate < toDate
                ? { from: range.from, to: selected }
                : { from: selected, to: range.from };
            setRange(final);
            onChange?.(final);
        }
    };
    const isSelected = (i) => {
        const current = new Date(year, i);
        if (range.from && !range.to) {
            return range.from.year === year && range.from.month === i + 1;
        }
        if (range.from && range.to) {
            const from = new Date(range.from.year, range.from.month - 1);
            const to = new Date(range.to.year, range.to.month - 1);
            return current >= from && current <= to;
        }
        return false;
    };
    const isFuture = (monthIndex) => {
        const today = new Date();
        const selectedMonth = new Date(year, monthIndex, 1);
        return (selectedMonth.getFullYear() > today.getFullYear() ||
            (selectedMonth.getFullYear() === today.getFullYear() &&
                selectedMonth.getMonth() > today.getMonth()));
    };
    console.log("Selected range:", range);
    return (_jsxs("div", { className: cn("p-3 w-full max-w-sm ", classNames.wrapper), children: [_jsxs("div", { className: cn("flex items-center justify-between mb-4", classNames.header), children: [_jsx("button", { type: "button", className: cn("text-sm px-2", classNames.navButton), onClick: () => setYear((y) => y - 1), children: "<" }), _jsx("span", { className: cn("text-base font-medium", classNames.yearLabel), children: year }), _jsx("button", { type: "button", className: cn("text-sm px-2", classNames.navButton), onClick: () => setYear((y) => y + 1), children: ">" })] }), _jsx("div", { className: cn("grid grid-cols-3 gap-2", classNames.monthGrid), children: getMonthNames().map((name, i) => {
                    const future = disableFuture && isFuture(i);
                    const selected = isSelected(i);
                    return (_jsx("button", { type: "button", disabled: future, className: cn("text-sm rounded px-2 py-1", classNames.monthButton, selected && classNames.monthButtonActive, future && "opacity-50 cursor-not-allowed"), onClick: () => !future && handleSelect(i), children: name }, i));
                }) })] }));
}
