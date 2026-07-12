import { useForm, useWatch } from 'react-hook-form';

import { ChevronRight } from 'lucide-react';

import { settingsFormSchema } from '@/features/settings/settings.schema.ts';
import { useSettingsQuery, useUpdateSettingsMutation } from '@/features/settings/useSettingsQuery.ts';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import { Card, CardContent } from '@/shared/components/shadcn-ui/card.tsx';
import { Input } from '@/shared/components/shadcn-ui/input.tsx';
import { Switch } from '@/shared/components/shadcn-ui/switch.tsx';

import { zodResolver } from '@hookform/resolvers/zod';

export default function SettingsProfile() {
  const { data: settings, isLoading } = useSettingsQuery();
  const mutation = useUpdateSettingsMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsFormSchema),
    values: settings,
  });

  const syncEnabled = useWatch({
    control,
    name: 'syncEnabled',
  });

  if (isLoading) return <div className='text-muted-foreground p-4 text-sm'>로드 중...</div>;

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className='space-y-6'>
      <div>
        <h1 className='text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100'>나와 앱의 관계</h1>
      </div>

      {/* Chrome 스타일: 테두리가 부드럽고 항목들이 가로줄 분할선(Divide)으로 나누어진 카드 */}
      <Card className='overflow-hidden border-neutral-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
        <CardContent className='divide-y divide-neutral-100 p-0 dark:divide-zinc-800'>
          {/* Row 1: 텍스트 입력 형태 */}
          <div className='flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center'>
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>프로필 이름 설정</div>
              <div className='text-muted-foreground text-xs'>동기화된 기기 전반에 표시될 닉네임입니다.</div>
            </div>
            <div className='w-full sm:w-64'>
              <Input {...register('username')} className='h-9' />
              {errors.username && <p className='text-destructive mt-1 text-xs'>{errors.username.message}</p>}
            </div>
          </div>

          {/* Row 2: 토글 스위치 형태 */}
          <div className='flex items-center justify-between p-5'>
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>클라우드 동기화 서비스</div>
              <div className='text-muted-foreground text-xs'>설정 및 커스텀 데이터를 실시간으로 백업합니다.</div>
            </div>
            <Switch checked={syncEnabled} onCheckedChange={(checked) => setValue('syncEnabled', checked)} />
          </div>

          {/* Row 3: 화살표 클릭 링크 형태 (Chrome의 전형적인 서브메뉴 진입 구조) */}
          <button
            type='button'
            className='flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-zinc-800/50'>
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>암호화 옵션 관리</div>
              <div className='text-muted-foreground text-xs'>보안 전송을 위한 추가 암호화 키를 관리합니다.</div>
            </div>
            <ChevronRight className='h-4 w-4 text-neutral-400' />
          </button>
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={mutation.isPending}
          className='h-9 bg-blue-600 px-4 text-white shadow-none hover:bg-blue-700'>
          {mutation.isPending ? '저장 중' : '변경사항 저장'}
        </Button>
      </div>
    </form>
  );
}
