import ErrorBoundary from '@/shared/components/ErrorBoundary.tsx';

export default function NotFound() {
  return (
    <ErrorBoundary
      message={`Router Error (404, Not Found)`}
      description={`요청하신 페이지를 찾을 수 없습니다.\n운영자에게 문의하시길 바랍니다.`}
      isEnableRetry={true}
      isEnableGoToHome={true}
    />
  );
}
