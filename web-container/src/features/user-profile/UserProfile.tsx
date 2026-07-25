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
          <button className='hover:text-accent-foreground hover:bg-accent flex items-center gap-2 rounded-lg border border-transparent p-2 transition-all'>
            <Avatar className='after:text-foreground after:bg-background after:border-border h-8 w-8'>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className='after:rounder-lg'>{fallbackText}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col sm:flex'>
              <span className='text-xs font-medium tracking-tight'>
                {user.name} ({user.id})
              </span>
              <span className='text-muted-foreground text-xs font-light'>Auth. {user.role}</span>
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent align='end'>
          <PopoverHeader>
            <PopoverTitle>부여된 권한별 가능 업무 목록</PopoverTitle>
          </PopoverHeader>
          <div className='mb-3 rounded-lg border border-gray-100 bg-gray-50 p-2.5'>
            <span className='block text-[10px] font-bold tracking-wider text-gray-400 uppercase'>
              보유 접근 상세 권한
            </span>
            <div className='mt-1.5 flex flex-wrap gap-1'>
              <span className='rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700'>
                인프라 제어
              </span>
              <span className='rounded border border-purple-100 bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-700'>
                프로젝트 승인권
              </span>
            </div>
          </div>

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
