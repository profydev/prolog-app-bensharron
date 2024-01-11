/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

type SelectOption = {
  id: number;
  value: string;
};

interface SelectProps {
  className?: string;
  options: SelectOption[];
  currValue?: string | null;
  placeholder: string;
  icon?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string | null) => void;
}

export function Select({
  className,
  options,
  currValue,
  placeholder,
  icon,
  label,
  hint,
  error,
  disabled,
  onChange,
}: SelectProps) {
  const [value, setValue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function onClickDropdown() {
    if (!disabled) {
      setOpen(!open);
    }
  }

  const onClickOption = (newValue: string) => {
    if (value !== newValue) {
      setValue(newValue);
      onChange(newValue);
    } else {
      // Deselect option
      setValue(null);
      onChange(null);
    }

    setOpen(false);
  };

  useEffect(() => {
    setValue(currValue ?? null);
  }, [currValue]);

  return (
    <div
      className={classNames(styles.container, className)}
      onBlur={() => setOpen(false)}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div
        tabIndex={0}
        className={classNames(
          styles.dropdown,
          disabled && styles.disabled,
          error && styles.errorBox,
        )}
        onClick={onClickDropdown}
      >
        {icon && <img alt="icon" src={icon} />}
        <div
          className={classNames(
            styles.selectText,
            value && styles.selectedText,
          )}
        >
          {value ?? placeholder}
        </div>
        <img
          alt="dropdown arrow"
          className={classNames(styles.arrow, open && styles.open)}
        />
      </div>
      <div className={classNames(styles.options, open || styles.hidden)}>
        {options.map((option) => (
          <div
            key={option.id}
            className={classNames(
              styles.option,
              value === option.value && styles.selected,
            )}
            onMouseDown={() => onClickOption(option.value)}
          >
            <div className={styles.item}>{option.value}</div>
            {value === option.value && (
              <img alt="checkmark" src={"/icons/select-check.svg"} />
            )}
          </div>
        ))}
      </div>

      {hint && !error && !open && <div className={styles.hint}>{hint}</div>}

      {error && !open && <div className={styles.error}>{error}</div>}
    </div>
  );
}
