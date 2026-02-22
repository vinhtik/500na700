import Link from 'next/link'
import styles from '@/styles/Footer.module.scss'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image 
            src="/LogoAlt.svg"
            alt="500НА700"
            width={120}  
            height={144} 
            priority={false}
            unoptimized={true}
        />
        <h2 className={styles.h2}>
         КРЕАТИВНОЕ АГЕНСТВО 500NA700
        </h2>
      </div>
    </footer>
  )
}

export default Footer