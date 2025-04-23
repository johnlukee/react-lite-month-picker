import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import styles from "./styles/MonthInput.module.css";
import "./styles/global.css";
export function MonthInput({ selected, setShowMonthPicker, showMonthPicker, lang = "en-US", size = "large", bgColor, bgColorHover, textColor, }) {
    useEffect(() => {
        const r = document.querySelector(":root");
        if (bgColor)
            r.style.setProperty("--input-bg-color", bgColor);
        if (bgColorHover)
            r.style.setProperty("--input-hover-bg-color", bgColorHover);
        if (textColor)
            r.style.setProperty("--input-text-color", textColor);
        if (size === "small") {
            r.style.setProperty("--month-input-font-size", "16px");
            r.style.setProperty("--month-input-width", "200px");
            r.style.setProperty("--month-input-padding", "0.5rem");
        }
    }, [bgColor, bgColorHover, textColor, size]);
    return (_jsxs("button", { className: styles.monthInputField, onClick: () => setShowMonthPicker(!showMonthPicker), children: [selected.monthName ?? new Date().toLocaleString(lang, { month: "long" }), " ", selected.year, _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size === "small" ? 16 : 24, height: size === "small" ? 16 : 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-calendar", children: [_jsx("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }), _jsx("line", { x1: "16", x2: "16", y1: "2", y2: "6" }), _jsx("line", { x1: "8", x2: "8", y1: "2", y2: "6" }), _jsx("line", { x1: "3", x2: "21", y1: "10", y2: "10" })] })] }));
}
