import { Loader2 } from 'lucide-react';

interface GlobalLoadingFallbackProps {
  message?: string;
}

export const GlobalLoadingFallback = ({
  message = '데이터를 안전하게 동기화하는 중입니다...',
}: GlobalLoadingFallbackProps) => {
  return (
    <div className='animate-in fade-in flex flex-col items-center justify-center gap-3 py-32 text-slate-500 duration-300'>
      <Loader2 className='text-primary h-8 w-8 animate-spin' />
      <p className='text-sm font-medium tracking-tight'>{message}</p>
    </div>
  );
};
