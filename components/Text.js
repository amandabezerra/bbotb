import styles from '@/styles/utils.module.css';

export default function Text({ size, color, shadow = false, children }) {
  return (
    <p className={`
      ${size === 'large' ? styles.lgText : styles.text}
      ${(color === 'primary' && styles.primaryColor) ||  (color === 'secondary' && styles.secondaryColor)}
      ${shadow && styles.textShadow}
      ${styles.secondaryFont}
    `}>
      {children}
    </p>
  );
}
