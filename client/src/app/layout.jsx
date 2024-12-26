"use client"
import "./globals.css"

import Header from "../components/Header"

import { Poppins } from "next/font/google"

const poppins = Poppins({
    weight: ['300','600'],
    subsets: ['latin']
})
function layout({ children }) {

    return (
        <html>
            <body className={`${poppins.className}`}>
            
                    <Header />
                    {children}
              
            </body>
        </html>
    )
}

export default layout