import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePage from './page';

describe('usePage', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePage());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
