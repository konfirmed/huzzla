import React from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lagos Hustler</title>
                <meta name="description" content="Lagos Hustler - A Clicker Simulation Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <h1 className="text-4xl font-bold">Lagos Hustler</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Lagos Hustler</p>
            </footer>
        </div>
    );
};

export default Layout;
