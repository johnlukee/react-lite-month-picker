import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "./utils/classnames";
import "./styles/global.css";
import {
  dateToMonthObject,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "./utils/date";

export type SelectedRange = {
  from?: { year: number; month: number };
  to?: { year: number; month: number };
};

export type MonthObject = {
  year: number;
  month: number;
};

export type MonthDateRange = {
  from: Date | undefined;
  to?: Date | undefined;
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
  value: MonthDateRange;
  onChange?: (range: MonthDateRange) => void;
  lang?: string;
  classNames?: Partial<MonthPickerClassNames>;
  disableFuture?: boolean;
  disablePast?: boolean;
  minMonth?: MonthObject;
  maxMonth?: MonthObject;
  disableMonths?: (month: MonthObject) => boolean;
}

export function MonthRangePicker({
  value,
  disableFuture,
  disablePast,
  minMonth,
  maxMonth,
  lang = "en",
  classNames = {},
  onChange,
  disableMonths,
}: MonthPickerProps) {
  const [year, setYear] = useState(() =>
    value?.from ? value.from.getFullYear() : new Date().getFullYear()
  );
  const [range, setRange] = useState<SelectedRange>({
    from: dateToMonthObject(value?.from),
    to: dateToMonthObject(value?.to),
  });
  const getMonthNames = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2023, i, 1);
      let label = date.toLocaleString(lang, { month: "long" });

      label = label.charAt(0).toUpperCase() + label.slice(1, 3);

      return label;
    });
  };

  const handleSelect = (monthIndex: number) => {
    const selected: { year: number; month: number } = {
      year: year,
      month: monthIndex + 1,
    };

    if (!range.from || (range.from && range.to)) {
      const next = { from: selected, to: undefined };
      setRange(next);
      onChange?.({
        from: getFirstDayOfMonth(next?.from),
        to: getLastDayOfMonth(next?.to),
      });
    } else {
      const fromDate = new Date(range.from.year, range.from.month - 1);
      const toDate = new Date(selected.year, selected.month - 1);

      const final =
        fromDate < toDate
          ? { from: range.from, to: selected }
          : { from: selected, to: range.from };

      setRange(final);
      onChange?.({
        from: getFirstDayOfMonth(final?.from),
        to: getLastDayOfMonth(final?.to),
      });
    }
  };

  const isSelected = (i: number): boolean => {
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

  const isDisabledMonth = (monthIndex: number): boolean => {
    const selected = { year, month: monthIndex + 1 };
    const current = new Date();
    const currentMonth = new Date(current.getFullYear(), current.getMonth(), 1);
    const thisMonth = new Date(selected.year, selected.month - 1, 1);

    if (disableFuture && thisMonth > currentMonth) return true;
    if (disablePast && thisMonth < currentMonth) return true;

    if (minMonth) {
      const min = new Date(minMonth.year, minMonth.month - 1, 1);
      if (thisMonth < min) return true;
    }

    if (maxMonth) {
      const max = new Date(maxMonth.year, maxMonth.month - 1, 1);
      if (thisMonth > max) return true;
    }

    if (disableMonths && disableMonths(selected)) return true;

    return false;
  };

  const isRangeMiddle = (i: number): boolean => {
    if (!range.from || !range.to) return false;

    const current = new Date(year, i);
    const from = new Date(range.from.year, range.from.month - 1);
    const to = new Date(range.to.year, range.to.month - 1);

    return current > from && current < to;
  };

  return (
    <div className={cn("p-3 w-full max-w-sm", classNames.wrapper)}>
      <div
        className={cn(
          "flex items-center justify-between mb-1",
          classNames.header
        )}
      >
        <button
          type="button"
          className={cn("text-sm px-2", classNames.navButton)}
          onClick={() => setYear((y) => y - 1)}
        >
          <ChevronLeft className="h-4" />
        </button>
        <span className={cn("text-base font-medium", classNames.yearLabel)}>
          {year}
        </span>
        <button
          type="button"
          className={cn("text-sm px-2", classNames.navButton)}
          onClick={() => setYear((y) => y + 1)}
        >
          <ChevronRight className="h-4" />
        </button>
      </div>

      <div className={cn(classNames.monthGrid)}>
        {getMonthNames().map((name, i) => {
          const disabled = isDisabledMonth(i);
          const selected = isSelected(i);
          const middle = isRangeMiddle(i);

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              className={cn(
                classNames.monthButton,
                selected && classNames.monthButtonActive,
                middle && classNames.monthButtonRange,
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !disabled && handleSelect(i)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
