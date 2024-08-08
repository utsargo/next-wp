"use client";
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const GoBackLink = () => {
  const router = useRouter();

  return (
    <button className='p-2 bg-slate-950 rounded-lg text-slate-50 cursor-pointer' title='Go Back' onClick={() => router.back()} >
        <ChevronLeftIcon className='h-5' />
    </button>
  );
};

export default GoBackLink;
