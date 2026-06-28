import { Button } from '@/shared/components/shadcn-ui/button.tsx';

export function Footer() {
  return (
    <footer className='bg-background sticky bottom-0 z-50 flex w-full items-center border-t'>
      <div className='flex h-(--footer-height) w-full items-center gap-2 px-4'>
        <div className='flex w-full flex-row justify-start gap-2 px-4'>
          <Button variant='ghost' size='lg' className='text-sm'>
            문의 하기기
          </Button>
          <Button variant='ghost' size='lg' className='text-sm'>
            운영 담당자자
          </Button>
        </div>
        <div className='flex w-full flex-row justify-center gap-2 px-4'></div>
        <div className='flex w-full flex-row justify-end gap-2 px-4'>
          <Button variant='ghost' size='lg' className='text-sm'>
            개선 요청
          </Button>
          <Button variant='ghost' size='lg' className='text-sm'>
            Release Node
          </Button>
        </div>
      </div>
    </footer>
  );
}
