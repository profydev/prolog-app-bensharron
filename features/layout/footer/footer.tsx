import { version } from "../../../config";
import styles from "./footer.module.scss";

const footerLinkNames = ["Docs", "API", "Help", "Community"];

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerLinks}>
        {footerLinkNames.map((footerLinkName, index) => (
          <a href="#" key={index}>
            {footerLinkName}
          </a>
        ))}
      </div>
      <div className={styles.logoWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-small.svg" alt="logo" />
      </div>
      <div className={styles.version}>Version: {version}</div>
    </footer>
  );
}
