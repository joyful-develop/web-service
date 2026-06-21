/* eslint-disable @typescript-eslint/no-explicit-any */
export async function safeAwait<T>(promise: Promise<T>): Promise<[T | any, any]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
