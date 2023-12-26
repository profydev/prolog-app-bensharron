import React from "react";
import { Button, ButtonIcon } from "@features/ui";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, className)}>
      <Button
        icon={ButtonIcon.leading}
        iconUrl={iconSrc}
        className={styles.anchor}
        onClick={onClick}
      >
        {!isCollapsed && text}
      </Button>
    </li>
  );
}
