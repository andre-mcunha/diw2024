import React from 'react'
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
    <h1>DEISI Shop</h1>
    <nav className={styles.nav}>
        <Link href="/">Home --</Link>
        <Link href="/tecnologias">Ratings --</Link>
        <Link href="/produtos">DEISI Shop --</Link>
    </nav>
    </header>
  )
}
