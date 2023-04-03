import Image from 'next/image';
import Text from '../Text';
import styles from './styles.module.css';

export default function Avatar({ id, name, src, handleSelect, selected = false, ...rest}) {
  return (
    <div
      onClick={() => selected ? handleSelect(null) : handleSelect(id)}
      className={`
        ${styles.container}
        ${styles.hvrBorderFade}
        ${selected && styles.selected}
      `}
      {...rest}
    >
      <Image
        src={src}
        alt={`"Foto de ${name}`}
        className={styles.image}
        width={180}
        height={240}
      />
      <div className={styles.textContainer}>
        <Text color="primary" shadow={true}>
          {name}
        </Text>
      </div>
    </div>
  );
}
