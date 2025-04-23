import "./styles/global.css";
export type SelectedRange = {
    from?: {
        year: number;
        month: number;
    };
    to?: {
        year: number;
        month: number;
    };
};
export type MonthPickerClassNames = {
    wrapper?: string;
    header?: string;
    navButton?: string;
    yearLabel?: string;
    monthGrid?: string;
    monthButton?: string;
    monthButtonActive?: string;
    monthButtonRange?: string;
};
export interface MonthPickerProps {
    value?: SelectedRange;
    disableFuture?: boolean;
    onChange?: (range: SelectedRange) => void;
    lang?: string;
    classNames?: Partial<MonthPickerClassNames>;
}
export declare function MonthPicker({ value, disableFuture, onChange, lang, classNames, }: MonthPickerProps): import("react/jsx-runtime").JSX.Element;
