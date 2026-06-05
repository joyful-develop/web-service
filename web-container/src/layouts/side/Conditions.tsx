import * as React from 'react';

import { PlusIcon } from 'lucide-react';

import { Calendars } from '#components/shadcn/calendars.tsx';
import { DatePicker } from '#components/shadcn/date-picker.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '#components/shadcn-ui/sidebar.tsx';

import { UserProfile } from '@layouts/header/UserProfile.tsx';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    employeeId: '123456',
    authority: 'Manager',
    avatar: '/avatars/shadcn.jpg',
  },
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Family'],
    },
    {
      name: 'Favorites',
      items: ['Holidays', 'Birthdays'],
    },
    {
      name: 'Other',
      items: ['Travel', 'Reminders', 'Deadlines'],
    },
  ],
};

export function Conditions({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='none'
      className='top-[calc(var(--header-height)+var(--menuBar-height)+2px)] h-[calc(100svh-var(--header-height)-var(--menuBar-height)-var(--footer-height)-3px)]! border-l lg:flex'
      {...props}>
      <SidebarHeader className='border-sidebar-border h-16 border-b'>
        <UserProfile user={data.user} />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <DatePicker />
        <SidebarSeparator className='mx-0' />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <PlusIcon />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
