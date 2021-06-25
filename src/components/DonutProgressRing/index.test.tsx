import React from 'react';
import Theme from '@lendi-ui/theme';
import { render } from '@testing-library/react';
import DonutProgressRing from './index';

describe('Donut Progress Ring', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Theme>
        <DonutProgressRing
          activeColour=""
          circleSize={130}
          mainLabel="$90,000"
          subLabel="Deposit"
          percentage={30}
          isAntiClosewise={false}
        />
      </Theme>
    );
    expect(getByTestId('donut-progress-ring')).toBeInTheDocument();
    expect(getByTestId('donut-progress-ring-main-label')).toBeInTheDocument();
    expect(getByTestId('donut-progress-ring-sub-label')).toBeInTheDocument();
  });
});
