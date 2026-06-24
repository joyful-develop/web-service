import { beforeEach, describe, expect, it } from 'vitest';

import { useUiSettingsStore } from '@/store/useUiSettingsStore.ts';
import type { ApiRequest } from '@/types/api.types.ts';

describe('UI Settings Store', () => {
  beforeEach(() => {
    useUiSettingsStore.getState().reset();
  });

  it('초기값은 null 이어야 한다.', () => {
    const state = useUiSettingsStore.getState();
    expect(state.themeColor).toBeNull();
  });

  it('fetchMenus 호출 시 사용자 메뉴 데이터를 성공적으로 가져와 상태를 변경해야 한다.', async () => {
    const request: ApiRequest = { userId: '123456' };
    await useUiSettingsStore.getState().fetchUiSettings(request);

    expect(useUiSettingsStore.getState().themeColor).toBe('#8b00ff');
  });
});
