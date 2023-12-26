/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
}

export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
  none = "none",
}

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: ButtonIcon;
  iconUrl?: string;
}

export function Button({
  children,
  size,
  color,
  icon,
  iconUrl,
  ...props
}: ButtonProps) {
  return (() => {
    switch (icon) {
      case ButtonIcon.leading:
        return (
          <button
            {...props}
            className={classNames(
              props.className,
              styles.button,
              size && styles[size],
              color && styles[color],
            )}
          >
            {iconUrl && (
              <img className={styles.icon} src={iconUrl} alt="icon" />
            )}
            {children}
          </button>
        );
      case ButtonIcon.trailing:
        return (
          <button
            {...props}
            className={classNames(
              props.className,
              styles.button,
              size && styles[size],
              color && styles[color],
            )}
          >
            {children}
            {iconUrl && (
              <img className={styles.icon} src={iconUrl} alt="icon" />
            )}
          </button>
        );
      case ButtonIcon.only:
        return (
          <button
            {...props}
            className={classNames(
              props.className,
              styles.button,
              size && styles[size],
              color && styles[color],
            )}
          >
            {iconUrl && (
              <img className={styles.icon} src={iconUrl} alt="icon" />
            )}
          </button>
        );
      case ButtonIcon.none:
      default:
        return (
          <button
            {...props}
            className={classNames(
              props.className,
              styles.button,
              size && styles[size],
              color && styles[color],
            )}
          >
            {children}
          </button>
        );
    }
  })();
}
