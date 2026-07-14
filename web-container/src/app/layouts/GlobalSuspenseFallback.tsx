import { Card, CardContent, CardHeader } from '@/shared/components/shadcn-ui/card.tsx';
import { Skeleton } from '@/shared/components/shadcn-ui/skeleton.tsx';

export const GlobalSuspenseFallback = () => {
  return (
    <Card className='flex h-full w-full flex-col'>
      <CardHeader>
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='h-4 w-2/3' />
      </CardHeader>
      <CardContent>
        <Skeleton className='aspect-video w-full flex-1' />
      </CardContent>
    </Card>
  );
};
