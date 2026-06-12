export default function Abort() {
  // const data = aboutLoader();
  return (
    <>
      <h1>Abort Page</h1>
    </>
  );
}

export async function aboutLoader() {
  const response = await fetch('https://example.com');

  if (!response.ok) {
    throw new Response('데이터를 가져오지 못했습니다.', { status: response.status });
  }
  return response.json();
}
