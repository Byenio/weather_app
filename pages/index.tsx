import Image from 'next/image'
import { Inter } from 'next/font/google'
import handler from './api/hello'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [name, setName] = useState('');

  const apiCall = async () => {
    try {
      const res = await fetch('/api/hello')
      const data = await res.json()
      setName(data.name);
    } catch (err) {
      console.log(err)
    }
  }

  apiCall()

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {name}
    </main>
  )
}
