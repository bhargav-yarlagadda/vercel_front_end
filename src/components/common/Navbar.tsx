import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='w-full   h-auto py-3  flex justify-between items-center px-4'>
        <Link href={'/'} className='flex items-center gap-3 '>
        <Image src={"/vercel.svg"} alt='Luma' width={24} height={24}  />
        <span className='font-kode-mono text-2xl font-bold'>Lume</span>
        </Link>
        <div>
            <button className='bg-white text-black rounded-lg py-1 px-2 cursor-pointer '>Log in</button>
        </div>
    </nav>
  )
}

export default Navbar
