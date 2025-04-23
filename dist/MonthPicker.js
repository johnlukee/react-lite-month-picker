import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./styles/MonthPicker.module.css";
import "./styles/global.css";
export function MonthPicker(props) {
    const [month, setMonth] = useState(props.selected.month ? props.selected.month - 1 : new Date().getMonth());
    const [year, setYear] = useState(props.selected.year ?? new Date().getFullYear());
    useEffect(() => {
        const r = document.querySelector(":root");
        if (props.bgColorMonthActive)
            r.style.setProperty("--month-active-bg-color", props.bgColorMonthActive);
        if (props.bgColorMonthHover)
            r.style.setProperty("--month-hover-bg-color", props.bgColorMonthHover);
        if (props.borderRadiusMonth)
            r.style.setProperty("--month-border-radius", props.borderRadiusMonth);
        if (props.bgColorPicker)
            r.style.setProperty("--picker-bg-color", props.bgColorPicker);
        if (props.textColor)
            r.style.setProperty("--text-color", props.textColor);
        if (props.size === "small") {
            r.style.setProperty("--picker-padding", "1rem");
            r.style.setProperty("--year-display-margin-top", "0.5rem");
            r.style.setProperty("--year-display-margin-bottom", "0.5rem");
            r.style.setProperty("--month-select-padding", "0.5rem");
        }
    }, []);
    const getMonthNames = (locale = "en", format = "short") => {
        const formatter = new Intl.DateTimeFormat(locale, {
            month: format,
            timeZone: "UTC",
        });
        return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(Date.UTC(2023, i, 1))));
    };
    const handleMonthClick = (monthIndex) => {
        setMonth(monthIndex);
        props.setIsOpen(false);
        props.onChange({
            month: monthIndex + 1,
            year,
            monthName: new Date(year, monthIndex).toLocaleString(props.lang ?? "en", {
                month: "long",
            }),
            monthShortName: new Date(year, monthIndex).toLocaleString(props.lang ?? "en", { month: "short" }),
        });
    };
    return (_jsxs("div", { className: styles.pickerContainer, children: [_jsxs("div", { className: styles.yearContainer, children: [_jsx("button", { className: styles.button, onClick: () => setYear((prev) => prev - 1) }), _jsx("span", { className: styles.bold1, children: year }), _jsx("button", { className: styles.button, onClick: () => setYear((prev) => prev + 1) })] }), _jsx("div", { className: styles.monthsContainer, children: getMonthNames(props.lang).map((monthName, index) => (_jsx("button", { className: `${styles.month} ${styles.button} ${index === month && props.selected.year === year
                        ? styles.active
                        : ""}`, onClick: () => handleMonthClick(index), children: monthName }, index))) })] }));
}
