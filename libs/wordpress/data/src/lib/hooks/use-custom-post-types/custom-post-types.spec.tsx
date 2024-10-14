import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCustomPostTypes from './custom-post-types';

describe('useCustomPostTypes', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCustomPostTypes());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
