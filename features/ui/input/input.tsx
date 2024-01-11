/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

interface InputProps {
  className?: string;
  currValue?: string;
  placeholder: string;
  icon?: string;
  label?: string;
  hint?: string;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function Input({
  className,
  currValue,
  placeholder,
  icon,
  label,
  hint,
  error = false,
  errorMsg,
  disabled,
  onChange,
}: InputProps) {
  const [value, setValue] = useState<string | null>(null);

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(currValue ?? null);
  }, [currValue]);

  return (
    <div className={classNames(styles.container, className)}>
      {label && (
        <label className={styles.label} htmlFor="inputBox">
          {label}
        </label>
      )}

      <div
        tabIndex={0}
        className={classNames(
          styles.inputBoxWrapper,
          disabled && styles.disabled,
          error && styles.errorBox,
        )}
      >
        {icon && <img alt="icon" src={icon} />}
        <input
          id="inputBox"
          className={styles.inputBox}
          value={value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeInput}
        />
        {error && <img src="icons/alert-circle.svg" alt="error icon" />}
      </div>

      {hint && !error && <div className={styles.hint}>{hint}</div>}

      {error && <div className={styles.error}>{errorMsg}</div>}
    </div>
  );
}
