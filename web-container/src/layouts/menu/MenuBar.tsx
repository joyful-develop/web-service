import { NavigationMenuDemo } from '@layouts/menu/NavigationMenu.tsx';

export function MenuBar() {
  return (
    <header className='bg-background sticky top-(--header-height) z-50 flex w-full items-center border-b'>
      <div className='flex h-(--menuBar-height) w-full items-center gap-2 px-4'>
        <NavigationMenuDemo />
      </div>
    </header>
  );
}
