import { Check, X } from 'lucide-react';

import type { TaskPermission } from '@/features/user-auth/user.ts';
import { useUser } from '@/features/user-auth/useUserQuery.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn-ui/avatar.tsx';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/shared/components/shadcn-ui/popover.tsx';
import { ScrollArea } from '@/shared/components/shadcn-ui/scroll-area.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/shadcn-ui/table.tsx';

export function UserProfile() {
  const { data: user, isLoading, error } = useUser();
  const fallbackText = user?.name ? user.name[0].toUpperCase() : 'CN';

  if (isLoading) return <div className='bg-muted h-10 w-48 animate-pulse rounded-md' />;
  if (error || !user) return <div className='text-destructive text-xs'>Error</div>;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className='hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex items-center gap-3 rounded-lg px-3 py-1.5 text-left transition-colors outline-none focus-visible:ring-2'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className='rounded-lg'>{fallbackText}</AvatarFallback>
            </Avatar>
            <div className='flex hidden flex-col sm:flex'>
              <div className='flex items-center gap-1.5'>
                <span className='text-center text-sm leading-tight font-semibold'>
                  {user.name} ({user.id})
                </span>
              </div>
              <span className='mt-0.5 text-center text-xs leading-none'>({user.role})</span>
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent align='end'>
          <PopoverHeader>
            <PopoverTitle>부여된 권한별 가능 업무 목록</PopoverTitle>
            {/* <PopoverDescription>부여된 권한별 가능 업무 목록</PopoverDescription> */}
          </PopoverHeader>
          <div className='p-2'>
            <ScrollArea className='bg-background/50 h-48 w-full rounded-md border'>
              <Table>
                <TableHeader className='bg-muted/50 sticky top-0 z-10'>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead className='h-8 text-xs font-semibold'>메뉴/업무</TableHead>
                    <TableHead className='h-8 w-14 text-center text-xs font-semibold'>조회</TableHead>
                    <TableHead className='h-8 w-14 text-center text-xs font-semibold'>저장</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.allowedTasks.map((task: TaskPermission) => (
                    <TableRow key={task.menuName} className='hover:bg-muted/30'>
                      <TableCell className='py-2 text-xs font-medium'>{task.menuName}</TableCell>
                      <TableCell className='py-2 text-center'>
                        {task.canRead ? (
                          <Check className='mx-auto h-3.5 w-3.5 stroke-[3] text-emerald-500' />
                        ) : (
                          <X className='text-muted/40 mx-auto h-3.5 w-3.5' />
                        )}
                      </TableCell>
                      <TableCell className='py-2 text-center'>
                        {task.canWrite ? (
                          <Check className='mx-auto h-3.5 w-3.5 stroke-[3] text-emerald-500' />
                        ) : (
                          <X className='text-muted/40 mx-auto h-3.5 w-3.5' />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
