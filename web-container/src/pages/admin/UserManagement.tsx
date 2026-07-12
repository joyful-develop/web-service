import { useAuthStore } from '@/features/user-auth/authStore.ts';
import type { Role } from '@/features/user-auth/user.ts';
import { useUpdateUserRole, useUsers } from '@/features/user-auth/useUserQuery.ts';
import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/shadcn-ui/table.tsx';

export default function UserManagement() {
  const { data: users, isLoading, error } = useUsers();
  const mutation = useUpdateUserRole();
  const hasWritePermission = useAuthStore((state) => state.hasPermission('write:users'));

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const handleRoleChange = (userId: string, newRole: Role) => {
    mutation.mutate({ userId, role: newRole });
  };

  return (
    <div className='space-y-4 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>사용자 권한 관리</h1>
      </div>

      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할(Role)</TableHead>
              <TableHead>보유 권한</TableHead>
              <TableHead className='text-right'>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    disabled={!hasWritePermission || mutation.isPending}
                    onValueChange={(value) => handleRoleChange(user.id, value as Role)}>
                    <SelectTrigger className='w-[120px]'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='USER'>USER</SelectItem>
                      <SelectItem value='MANAGER'>MANAGER</SelectItem>
                      <SelectItem value='ADMIN'>ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className='flex flex-wrap gap-1'>
                    {user.permissions.map((perm) => (
                      <Badge key={perm} variant='secondary'>
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='destructive'
                    size='sm'
                    disabled={!useAuthStore.getState().hasPermission('delete:users')}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
