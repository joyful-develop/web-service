import { Link } from 'react-router';

// import { LucideIcon } from '@components/icons/LucideIcon.tsx';
import { Button } from '@/shared/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn-ui/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/shadcn-ui/sidebar.tsx';

import { useMenuStore } from '@features/menu/useMenuStore.ts';
import { HeroIcon } from '@shared/icons/HeroIcon.tsx';

export function ManuButton() {
  const { menus, activeMenuId, isLoading, isMenuPanelOpen, setActiveMenuId, setIsMenuPanelOpen } = useMenuStore();

  if (isLoading) return <div>메뉴 로딩 중 ...</div>;

  return (
    <div className='flex items-center gap-2 text-sm'>
      <Popover open={isMenuPanelOpen} onOpenChange={() => setIsMenuPanelOpen(!isMenuPanelOpen)}>
        <PopoverTrigger asChild>
          <Button variant='ghost' size='icon-lg' className='data-[state=open]:bg-accent h-8 w-8'>
            {/* <LucideIcon name='menuIcon' size={36} strokeWidth={2} className='size-5' /> */}
            <HeroIcon name='bars4Icon' className='size-6' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-56 overflow-hidden rounded-lg p-0' align='end'>
          <Sidebar collapsible='none' className='bg-transparent'>
            <SidebarContent>
              {menus.map((menu) => (
                <SidebarGroup key={menu.groupId} className='border-b last:border-none'>
                  <SidebarGroupContent className='gap-0'>
                    <SidebarMenu>
                      {/* {group.map((item, index) => ( */}
                      <SidebarMenuItem key={menu.id}>
                        <SidebarMenuButton asChild onClick={() => setActiveMenuId(menu.id)}>
                          <Link
                            to={menu.path}
                            className={`${activeMenuId !== null && activeMenuId === menu.id ? 'text-red-500' : 'text-black-500'}`}>
                            {menu.icon} {menu.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      {/* ))} */}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
