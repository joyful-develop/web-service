import { Card, CardContent, CardHeader } from '#components/shadcn-ui/card.tsx';
import { Skeleton } from '#components/shadcn-ui/skeleton.tsx';

export const GlobalSuspenseFallback = () => {
  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='h-4 w-1/2' />
      </CardHeader>
      <CardContent>
        <Skeleton className='aspect-video h-full w-full' />
      </CardContent>
    </Card>
  );
};
