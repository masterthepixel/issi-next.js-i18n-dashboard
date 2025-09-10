"use client";

import Link from 'next/link';

export default function SimpleNavDebug() {
    return (
        <div
            className="fixed top-0 left-0 w-full z-[1000] bg-red-500 text-white p-4"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '60px',
                backgroundColor: 'red',
                color: 'white',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
            }}
        >
            <h1>DEBUG: Navigation</h1>
            <nav style={{ display: 'flex', gap: '15px' }}>
                <Link href="/en/home" style={{ color: 'white', textDecoration: 'underline' }}>
                    Home
                </Link>
                <Link href="/en/services" style={{ color: 'white', textDecoration: 'underline' }}>
                    Services
                </Link>
                <Link href="/en/products" style={{ color: 'white', textDecoration: 'underline' }}>
                    Products
                </Link>
                <Link href="/en/about" style={{ color: 'white', textDecoration: 'underline' }}>
                    About
                </Link>
            </nav>
        </div>
    );
}
