'use client'
import { authModalState } from '@/atoms/authModalAtom';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type Props = {};

const Navbar = (props: Props) => {
  const setAuthModal = useSetRecoilState(authModalState)
  const handleSignIn = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: 'login' }))
  }

  return (
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 '>
      <Link href='/' className='flex items-center justify-center h-20'>
        <Image
          src='/logo.png'
          alt='leetclone'
          className='h-full'
          width={200}
          height={200}
        />
      </Link>
      <div className='flex items-center'>
        <button
          className='bg-brand-orange text-white px-2 py-1 sm:px-4 border-2 border-transparent rounded-md text-sm font-medium
        hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange transition duration-300 ease-in-out'
          onClick={() => handleSignIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
