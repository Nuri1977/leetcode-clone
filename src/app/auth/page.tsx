import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';

type Props = {};

const AuthPage = (props: Props) => {
  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative '>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
          <Image src='/hero.png' alt='hero' width={500} height={300} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
