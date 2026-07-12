import { ShieldCheck, Check, X } from 'lucide-react';

import { useUsers } from '@/features/user-auth/useUserQuery.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn-ui/avatar.tsx';
import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { ScrollArea } from '@/shared/components/shadcn-ui/scroll-area.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/shadcn-ui/table.tsx';

export function UserProfile() {
  const { data: user, isLoading, error } = useUsers();

  if (isLoading) return <div className='bg-muted h-10 w-48 animate-pulse rounded-md' />;
  if (error || !user) return <div className='text-destructive text-xs'>Error</div>;

  return (
    <DropdownMenu>
      {/* 1. Header 노출 영역: 이름(사번) 또는 이메일, 권한 이름 */}
      <DropdownMenuTrigger asChild>
        <button className='hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex items-center gap-3 rounded-lg px-3 py-1.5 text-left transition-colors outline-none focus-visible:ring-2'>
          {/* <Avatar className='h-8 w-8 shrink-0'>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar> */}

          {/* Header 정보 텍스트 레이아웃 */}
          <div className='flex hidden flex-col sm:flex'>
            <div className='flex items-center gap-1.5'>
              <span className='text-sm leading-tight font-semibold'>
                {user.name} ({user.id})
              </span>
              <Badge variant='secondary' className='shrink-0 px-1.5 py-0 text-[10px] font-medium'>
                {user.role}
              </Badge>
            </div>
            <span className='text-muted-foreground mt-0.5 text-xs leading-none'>{user.email}</span>
          </div>
        </button>
      </DropdownMenuTrigger>

      {/* 2. 클릭 시 펼쳐지는 드롭다운 컨텐츠 */}
      <DropdownMenuContent className='w-[360px]' align='end' forceMount>
        <DropdownMenuLabel className='text-muted-foreground flex items-center gap-1.5 px-3 py-2 text-xs font-medium'>
          <ShieldCheck className='text-primary h-4 w-4' />
          <span>부여된 권한별 가능 업무 목록</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 3. 가능 업무 목록 표 (Table) 영역 */}
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
                {user.allowedTasks.map((task) => (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
