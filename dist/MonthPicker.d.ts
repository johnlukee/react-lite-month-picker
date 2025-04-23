import "./styles/global.css";
export interface MonthPickerProps {
    selected: {
        month?: number;
        year?: number;
    };
    onChange: (value: {
        month: number;
        year: number;
        monthName: string;
        monthShortName: string;
    }) => void;
    setIsOpen: (val: boolean) => void;
    lang?: string;
    size?: "small" | "large";
    bgColorMonthActive?: string;
    bgColorMonthHover?: string;
    borderRadiusMonth?: string;
    bgColorPicker?: string;
    textColor?: string;
}
export declare function MonthPicker(props: MonthPickerProps): import("react/jsx-runtime").JSX.Element;
