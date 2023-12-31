import './globals.css'
import { Inter } from 'next/font/google'
import { TonerProvider } from "../app/providers/toner/index";
import { CartProvider } from "../app/providers/cart/index";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartProvider>
        <TonerProvider>
          <body className={inter.className}>{children}</body>
        </TonerProvider>
      </CartProvider>
    </html>
  )
}
