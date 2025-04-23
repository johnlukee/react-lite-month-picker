import "./styles/global.css";
export interface MonthInputProps {
    selected: {
        year: number;
        monthName?: string;
    };
    setShowMonthPicker: (value: boolean) => void;
    showMonthPicker: boolean;
    lang?: string;
    size?: "small" | "large";
    bgColor?: string;
    bgColorHover?: string;
    textColor?: string;
}
export declare function MonthInput({ selected, setShowMonthPicker, showMonthPicker, lang, size, bgColor, bgColorHover, textColor, }: MonthInputProps): import("react/jsx-runtime").JSX.Element;
