import React from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckboxSize {
  small = "small",
  medium = "medium",
}

export enum CheckboxState {
  unchecked = "unchecked",
  checked = "checked",
  partlyChecked = "partlyChecked",
}

interface CheckboxProps extends React.ComponentPropsWithoutRef<"label"> {
  size?: CheckboxSize;
  label: string;
  state?: CheckboxState;
  disabled?: boolean;
}

export function Checkbox({
  size = CheckboxSize.small,
  label,
  state = CheckboxState.unchecked,
  disabled = false,
  ...props
}: CheckboxProps) {
  return (
    <label
      {...props}
      className={classNames(
        props.className,
        styles.customCheckbox,
        size && styles[size],
      )}
      htmlFor="checkmark"
    >
      <input
        type="checkbox"
        id="checkmark"
        disabled={disabled}
        ref={(input) => {
          if (input) {
            if (state === CheckboxState.checked) {
              input.checked = true;
              input.indeterminate = false;
            } else if (state === CheckboxState.partlyChecked) {
              input.checked = false;
              input.indeterminate = true;
            } else {
              input.checked = false;
              input.indeterminate = false;
            }
          }
        }}
      />
      <span className={classNames(styles.checkmark, size && styles[size])}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="checkmark" />
      </span>
      <div className={classNames(styles.label, size && styles[size])}>
        {label}
      </div>
    </label>
  );
}
