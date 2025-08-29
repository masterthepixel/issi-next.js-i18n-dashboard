/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import './custom.scss'

export const metadata: Metadata = {
    title: 'PayloadCMS Admin',
    description: 'PayloadCMS Admin Panel'
}

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}

export default Layout
