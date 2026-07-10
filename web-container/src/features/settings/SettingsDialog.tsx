import { Loader2 } from 'lucide-react';

import { settingsFormSchema, VALID_THEMES, type SettingsFormValues } from '@/features/settings/settings.schema.ts';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadcn-ui/dialog.tsx';
import { Switch } from '@/shared/components/shadcn-ui/switch.tsx';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// 가상의 API 저장 함수 (React Query Mutation 연동용)
const updateSettingsApi = async (data: SettingsFormValues) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const queryClient = useQueryClient();

  // React Query v5 Mutation 정의
  const { mutate, isPending } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
      alert('설정이 저장되었습니다.');
      onClose();
    },
    onError: () => {
      alert('설정 저장에 실패했습니다.');
    },
  });

  // TanStack Form v1.3 양식 선언
  const form = useForm({
    defaultValues: {
      username: '홍길동',
      syncEnabled: false,
      theme: 'system' as 'light' | 'dark' | 'system',
      language: 'ko',
      emailNotifications: true,
      pushNotifications: false,
      marketingMails: false,
      sessionTimeout: '30',
      twoFactorAuth: false,
    },
    validators: {
      // ✅ 최신 규격: 어댑터 없이 스키마를 리턴하는 화살표 함수 형태로 할당
      onChange: () => settingsFormSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>시스템 설정</DialogTitle>
          <DialogDescription>애플리케이션 환경 및 알림 설정을 변경할 수 있습니다.</DialogDescription>
        </DialogHeader>

        {/* ✅ 최신 규격: Provider 레이어 없이 표준 <form> 태그를 바로 배치 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className='space-y-6 py-2'>
          {/* 1. 테마 설정 필드 */}
          <form.Field name='theme'>
            {(field) => (
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium'>화면 테마</label>
                <select
                  value={field.state.value}
                  onChange={(e) => {
                    const selected = e.target.value;
                    // ✅ any 제거: 안전하게 리터럴 목록에서 찾은 값만 주입
                    const foundTheme = VALID_THEMES.find((t) => t === selected);
                    if (foundTheme) {
                      field.handleChange(foundTheme);
                    }
                  }}
                  className='border-input focus-visible:ring-ring h-9 rounded-md border bg-transparent px-3 text-sm focus-visible:ring-1 focus-visible:outline-none'>
                  <option value='light'>라이트</option>
                  <option value='dark'>다크</option>
                  <option value='system'>시스템</option>
                </select>
                {field.state.meta.errors.length > 0 && (
                  <p className='text-destructive mt-0.5 text-xs'>{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* 2. 언어 설정 필드 */}
          <form.Field name='language'>
            {(field) => (
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium'>언어 (Language)</label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className='border-input focus-visible:ring-ring h-9 rounded-md border bg-transparent px-3 text-sm focus-visible:ring-1 focus-visible:outline-none'>
                  <option value='ko'>한국어 (Korean)</option>
                  <option value='en'>English (US)</option>
                </select>
                {field.state.meta.errors.length > 0 && (
                  <p className='text-destructive mt-0.5 text-xs'>{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* 3. 이메일 알림 설정 필드 (Shadcn Switch 컴포넌트 바인딩) */}
          <form.Field name='emailNotifications'>
            {(field) => (
              <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                <div className='space-y-0.5'>
                  <label className='block text-sm font-medium'>이메일 알림</label>
                  <span className='text-muted-foreground block text-xs'>주요 업데이트 사항을 메일로 수신합니다.</span>
                </div>
                <Switch checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked)} />
              </div>
            )}
          </form.Field>

          {/* 4. 푸시 알림 설정 필드 */}
          <form.Field name='pushNotifications'>
            {(field) => (
              <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                <div className='space-y-0.5'>
                  <label className='block text-sm font-medium'>브라우저 푸시 알림</label>
                  <span className='text-muted-foreground block text-xs'>실시간 알림 팝업을 수신합니다.</span>
                </div>
                <Switch checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked)} />
              </div>
            )}
          </form.Field>

          <DialogFooter className='pt-4'>
            <Button type='button' variant='outline' onClick={onClose} disabled={isPending}>
              취소
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              저장하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
