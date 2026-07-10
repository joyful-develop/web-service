// src/components/layout/SettingsSheet.tsx
import * as React from 'react';

import { Loader2, Settings, Bell, Shield } from 'lucide-react';

import { settingsFormSchema, VALID_THEMES, type SettingsFormValues } from '@/features/settings/settings.schema.ts';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/shadcn-ui/drawer.tsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/shadcn-ui/sheet.tsx';
import { Switch } from '@/shared/components/shadcn-ui/switch.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcn-ui/tabs.tsx';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// React 19 / Cascading Render 에러가 해결된 미디어 쿼리 훅
function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(() => {
    if (typeof window !== 'undefined') return window.matchMedia(query).matches;
    return false;
  });

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setValue(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return value;
}

interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsSheet({ isOpen, onClose }: SettingsSheetProps) {
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // 1. TanStack Form 정의 (타입 와이딩 적용)
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
      onChange: () => settingsFormSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  // 2. React Query Mutation 정의
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SettingsFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
      alert('설정이 저장되었습니다.');
      onClose();
    },
  });

  // 3. 폼 내부 렌더러 함수 (field 에러 완벽 해결 버전)
  const renderFormContent = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className='bg-background text-foreground flex h-full flex-col overflow-hidden text-left'>
      <Tabs
        defaultValue='general'
        className='mt-2 flex min-h-0 w-full flex-1 flex-col gap-0 overflow-hidden md:flex-row'>
        {/* [좌측 패널] 크롬의 고정 사이드바 내비게이션 메뉴 */}
        <TabsList className='border-border flex h-auto w-full shrink-0 flex-row items-stretch justify-start gap-1 rounded-none border-b bg-transparent p-2 md:w-52 md:flex-col md:border-r md:border-b-0'>
          <TabsTrigger
            value='general'
            className='text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-secondary/70 justify-start gap-3 rounded-full px-4 py-2.5 text-sm font-normal shadow-none transition-all data-[state=active]:font-medium'>
            <Settings className='h-4 w-4 shrink-0' />
            <span>나와 Google의 관계</span>
          </TabsTrigger>
          <TabsTrigger
            value='notifications'
            className='text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-secondary/70 justify-start gap-3 rounded-full px-4 py-2.5 text-sm font-normal shadow-none transition-all data-[state=active]:font-medium'>
            <Bell className='h-4 w-4 shrink-0' />
            <span>개인정보 보호 및 보안</span>
          </TabsTrigger>
          <TabsTrigger
            value='security'
            className='text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-secondary/70 justify-start gap-3 rounded-full px-4 py-2.5 text-sm font-normal shadow-none transition-all data-[state=active]:font-medium'>
            <Shield className='h-4 w-4 shrink-0' />
            <span>시스템 및 하드웨어</span>
          </TabsTrigger>
        </TabsList>

        {/* [우측 패널] 크롬 특유의 카드 및 구분선 기반 설정 본문 박스 */}
        <div className='bg-secondary/20 h-full min-h-0 w-full flex-1 space-y-6 overflow-y-auto px-6 py-4'>
          {/* 📑 TAB 1: 일반 설정 */}
          <TabsContent value='general' className='m-0 w-full space-y-4 focus-visible:outline-none'>
            <h3 className='mb-3 text-lg font-medium tracking-tight'>나와 시스템의 관계</h3>

            <div className='border-border bg-background overflow-hidden rounded-xl border shadow-sm'>
              {/* 테마 설정 필드 (✅ field 매개변수 연결 완료) */}
              <form.Field name='theme'>
                {(field) => {
                  const isTheme = (val: string): val is 'light' | 'dark' | 'system' =>
                    VALID_THEMES.some((t) => t === val);
                  return (
                    <div className='border-border hover:bg-secondary/10 flex items-center justify-between border-b p-4 transition-colors'>
                      <div className='space-y-0.5 pr-4'>
                        <label className='text-sm font-medium'>인터페이스 테마</label>
                        <p className='text-muted-foreground text-xs'>
                          애플리케이션 전반의 기본 색상 모드를 지정합니다.
                        </p>
                      </div>
                      <select
                        value={field.state.value}
                        onChange={(e) => isTheme(e.target.value) && field.handleChange(e.target.value)}
                        className='border-input bg-background focus-visible:ring-ring h-9 w-44 rounded-md border px-2 text-sm focus-visible:ring-1 focus-visible:outline-none'>
                        <option value='light'>라이트 모드</option>
                        <option value='dark'>다크 모드</option>
                        <option value='system'>시스템 설정</option>
                      </select>
                    </div>
                  );
                }}
              </form.Field>

              {/* 언어 설정 필드 (✅ field 매개변수 연결 완료) */}
              <form.Field name='language'>
                {(field) => (
                  <div className='hover:bg-secondary/10 flex items-center justify-between p-4 transition-colors'>
                    <div className='space-y-0.5 pr-4'>
                      <label className='text-sm font-medium'>표시 언어</label>
                      <p className='text-muted-foreground text-xs'>메뉴 및 알림에 적용할 표준 주 언어를 변경합니다.</p>
                    </div>
                    <select
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='border-input bg-background focus-visible:ring-ring h-9 w-44 rounded-md border px-2 text-sm focus-visible:ring-1 focus-visible:outline-none'>
                      <option value='ko'>한국어 (Korean)</option>
                      <option value='en'>English (US)</option>
                    </select>
                  </div>
                )}
              </form.Field>
            </div>
          </TabsContent>

          {/* 📑 TAB 2: 개인정보 보호 및 보안 */}
          <TabsContent value='notifications' className='m-0 w-full space-y-4 focus-visible:outline-none'>
            <h3 className='mb-3 text-lg font-medium tracking-tight'>개인정보 보호 및 보안</h3>

            <div className='border-border bg-background overflow-hidden rounded-xl border shadow-sm'>
              {/* 이메일 알림 필드 */}
              <form.Field name='emailNotifications'>
                {(field) => (
                  <div
                    className='border-border hover:bg-secondary/10 flex cursor-pointer items-center justify-between border-b p-4 transition-colors'
                    onClick={() => field.handleChange(!field.state.value)}>
                    <div className='space-y-0.5 pr-4'>
                      <label className='block text-sm font-medium'>이메일 알림 허용</label>
                      <span className='text-muted-foreground block text-xs'>
                        중요 보안 경고 및 패치 내역을 메일 주소로 실시간 전송합니다.
                      </span>
                    </div>
                    <Switch
                      checked={field.state.value}
                      onCheckedChange={(c) => field.handleChange(c)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </form.Field>

              {/* 푸시 알림 필드 */}
              <form.Field name='pushNotifications'>
                {(field) => (
                  <div
                    className='hover:bg-secondary/10 flex cursor-pointer items-center justify-between p-4 transition-colors'
                    onClick={() => field.handleChange(!field.state.value)}>
                    <div className='space-y-0.5 pr-4'>
                      <label className='block text-sm font-medium'>데스크톱 알림 팝업</label>
                      <span className='text-muted-foreground block text-xs'>
                        브라우저가 백그라운드 상태일 때도 바탕화면에 팝업 메세지를 출력합니다.
                      </span>
                    </div>
                    <Switch
                      checked={field.state.value}
                      onCheckedChange={(c) => field.handleChange(c)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </TabsContent>

          {/* 📑 TAB 3: 시스템 및 하드웨어 */}
          <TabsContent value='security' className='m-0 w-full space-y-4 focus-visible:outline-none'>
            <h3 className='mb-3 text-lg font-medium tracking-tight'>시스템</h3>

            <div className='border-border bg-background overflow-hidden rounded-xl border shadow-sm'>
              {/* 세션 타임아웃 필드 */}
              <form.Field name='sessionTimeout'>
                {(field) => (
                  <div className='hover:bg-secondary/10 flex items-center justify-between p-4 transition-colors'>
                    <div className='space-y-0.5 pr-4'>
                      <label className='text-sm font-medium'>자동 로그아웃 세션</label>
                      <p className='text-muted-foreground text-xs'>
                        지정한 시간 동안 활동이 없으면 보안을 위해 자동으로 로그아웃됩니다.
                      </p>
                    </div>
                    <select
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='border-input bg-background focus-visible:ring-ring h-9 w-44 rounded-md border px-2 text-sm focus-visible:ring-1 focus-visible:outline-none'>
                      <option value='15'>15분간 비활동</option>
                      <option value='30'>30분간 비활동</option>
                    </select>
                  </div>
                )}
              </form.Field>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* 크롬 스타일의 하단 바 */}
      <div className='border-border bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4'>
        <Button type='button' variant='ghost' onClick={onClose} disabled={isPending} className='hover:bg-secondary'>
          취소
        </Button>
        <Button
          type='submit'
          disabled={isPending}
          className='rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          적용
        </Button>
      </div>
    </form>
  );

  // 4. 모바일/PC 반응형 컴포넌트 렌더링 분기
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className='max-h-[85vh] px-4'>
          <DrawerHeader className='shrink-0 px-0 text-left'>
            <DrawerTitle>시스템 설정</DrawerTitle>
            <DrawerDescription>환경 설정 항목들을 관리하세요.</DrawerDescription>
          </DrawerHeader>
          <div className='mb-4 flex-1 overflow-hidden'>{renderFormContent()}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='flex h-full flex-col sm:max-w-[650px]'>
        <SheetHeader className='shrink-0'>
          <SheetTitle>시스템 설정</SheetTitle>
          <SheetDescription>각 탭을 이동하며 설정을 최적화하세요.</SheetDescription>
        </SheetHeader>
        <div className='mt-2 flex-1 overflow-hidden'>{renderFormContent()}</div>
      </SheetContent>
    </Sheet>
  );
}
