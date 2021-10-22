import React from 'react';

interface Props {
  delay: number;
}

const PostSkeleton: React.FC<Props> = ({ delay }) => {
  return (
    <div
      className={`shadow-lg animate-pulse delay-${delay} rounded-lg hover:shadow-2xl content-bg transition`}
    >
      <div className='w-full h-52 bg-gray-400 rounded-t-lg'></div>
      <div className='px-4 py-5 space-y-4'>
        <div className='flex items-center mb-4'>
          <div className='rounded-full h-10 w-10 bg-gray-400'></div>
          <div className='ml-4'>
            <div className='w-14 h-2 bg-gray-400 rounded-lg mb-2'></div>
            <div className='w-16 h-2 bg-gray-400 rounded-lg'></div>
          </div>
        </div>
        <p className='w-full h-2 bg-gray-400 rounded-lg' />
        <p className='w-full h-2 bg-gray-400 rounded-lg' />
        <div className='w-full h-6 bg-gray-400 rounded-lg'></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
