import styles from '@/styles/utils.module.css';

export default function Button({ label, handleClick, disabled = false }) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        ${styles.button}
        ${styles.text}
        ${styles.secondaryFont}
        ${styles.secondaryColor}
      `}>
      {label}
    </button>
  );
}
