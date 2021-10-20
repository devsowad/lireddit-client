import { SearchIcon, SunIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { updateMe } from '../../graphql/update/updateMe';
import IconButton from '../IconButton';
import LoadingButton from '../LoadingButton';

interface Props {
  //
}

const Header: React.FC<Props> = () => {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    setSticky(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const changeTheme = () => {
    const elm = document.querySelector('html')!;
    elm.classList.contains('dark')
      ? elm.classList.remove('dark')
      : elm.classList.add('dark');
  };

  const { data, loading } = useMeQuery();

  const [logout, { loading: loggingOut }] = useLogoutMutation({
    update(proxy) {
      updateMe({ proxy, data: null });
    },
  });

  return (
    <div
      className={`
       ${
         sticky
           ? 'shadow-lg sticky top-0 bg-white animate-slideIn'
           : 'animate-slideOut'
       } border-b dark:border-gray-600
          `}
    >
      <div className='flex items-center justify-between w-full container mx-auto py-2 px-2'>
        <div className='flex items-center space-x-2'>
          <Link href='/' passHref>
            <a className='text-3xl mr-2 font-semibold'>LiReddit</a>
          </Link>
          <div className='hidden md:flex items-center ml-2 group px-2 bg-gray-200 dark:bg-gray-600 rounded-xl focus-within:ring-2'>
            <SearchIcon className='w-5 text-gray-400 group-focus-within:text-gray-700 dark:text-gray-400 dark:group-focus-within:text-gray-200' />
            <input
              className='bg-transparent no-transition focus:outline-none text-gray-800 dark:text-gray-300 px-3 py-2 border-0 focus:borer-0 focus:ring-0'
              type='text'
              placeholder='Search Facebook'
            />
          </div>
          <IconButton icon={SearchIcon} className='md:hidden' />
        </div>

        <div className='flex items-center'>
          {!loading && (
            <div className='flex space-x-3 items-center md:space-x-6'>
              {data?.me ? (
                <>
                  <p>{data.me.username}</p>
                  <LoadingButton
                    onClick={() => logout()}
                    loading={loggingOut}
                    variant='outline'
                  >
                    logout
                  </LoadingButton>
                </>
              ) : (
                <>
                  <Link href='/login' passHref>
                    <a>Login</a>
                  </Link>
                  <Link href='/register' passHref>
                    <a>Register</a>
                  </Link>
                </>
              )}
            </div>
          )}
          <IconButton className='ml-4' onClick={changeTheme} icon={SunIcon} />
        </div>
      </div>
    </div>
  );
};

export default Header;
