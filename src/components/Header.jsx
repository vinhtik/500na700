'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '@/styles/Header.module.scss'
import Image from 'next/image'
import ContactModal from './ContactModal'

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
    <header className={`${styles.header}`}>
      <div className={styles.container}>
        <Link href="/">
           <Image 
            src="/Logo.svg"
            alt="500НА700"
            width={70} 
            height={84} 
            priority={true}
            className={styles.logo}
          />
        </Link>
        <nav className={styles.nav}>
          <button className={styles.button}
          onClick={() => setIsModalOpen(true)}>
            <span>Связаться с нами</span>
            </button>
        </nav>
      </div>
    </header>
    <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    />
      </>
  )
}

export default Header