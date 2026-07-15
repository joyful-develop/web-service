import { Outlet } from 'react-router';

export default function TestLayout() {
  return (
    <>
      <h1 className='text-red-500'>Test Layout</h1>
      <main className='flex-1 p-8'>
        <div className='mx-auto max-w-2xl space-y-6'>
          <Outlet />
        </div>
      </main>
    </>
  );
}
