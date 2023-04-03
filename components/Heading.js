import styles from '@/styles/utils.module.css';

export default function Heading({ level, children }) {
  return (
    <>
      {level === 1 && (
        <h1
          role="heading"
          className={`${styles.heading1} ${styles.primaryColor} ${styles.primaryFont}`}
        >
          {children}
        </h1>
      )}
      {level === 2 && (
        <h2 className={`${styles.heading2} ${styles.primaryColor} ${styles.primaryFont}`}>
          {children}
        </h2>
      )}
      {level === 3 && (
        <h3 className={`${styles.heading3} ${styles.primaryColor} ${styles.secondaryFont}`}>
          {children}
        </h3>
      )}
    </>
  );
}
