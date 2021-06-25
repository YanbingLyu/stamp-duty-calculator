import React from 'react';
import { Heading, Body, Size } from '@lendi-ui/typography';
import { theme } from '@lendi-ui/theme';
import Circle from './Circle';
import { restrictNumberWithinRange } from '../../utils/helpers';

export interface DonutProgressRingProps {
  circleSize: number;
  percentage: number;
  activeColour: string;
  mainLabel?: string;
  mainLabelFontSize?: Size;
  subLabel?: string;
  subLabelFontSize?: Size;
  isAntiClosewise?: boolean;
}

const MAX_CIRCLE_SIZE = 190;
const MIN_CIRCLE_SIZE = 80;
const MAX_CIRCLE_PERCENTAGE = 100;
const MIN_CIRCLE_PERCENTAGE = 0;

const DonutProgressRing = ({
  circleSize,
  mainLabel,
  subLabel,
  percentage,
  isAntiClosewise = false,
  activeColour = theme.colors['secondary.500'],
  mainLabelFontSize = 'xs',
  subLabelFontSize = 'sm',
}: DonutProgressRingProps) => {
  const updatedPercentage = restrictNumberWithinRange(percentage, MAX_CIRCLE_PERCENTAGE, MIN_CIRCLE_PERCENTAGE);
  const updatedCircleSize = restrictNumberWithinRange(circleSize, MAX_CIRCLE_SIZE, MIN_CIRCLE_SIZE);
  return (
    <svg width={200} height={200} data-testid="donut-progress-ring">
      <g transform="rotate(-90 100 100)">
        <Circle colour={theme.colors['secondary.100']} circleSize={updatedCircleSize} />
        <Circle
          colour={activeColour}
          percentage={isAntiClosewise ? -updatedPercentage : updatedPercentage}
          circleSize={circleSize}
        />
      </g>
      <foreignObject x="50" y="80" width="100" height="100">
        <Heading align="center" size={mainLabelFontSize} as="h3" data-testid="donut-progress-ring-main-label">
          {mainLabel}
        </Heading>
        <Body align="center" size={subLabelFontSize} data-testid="donut-progress-ring-sub-label">
          {subLabel}
        </Body>
      </foreignObject>
    </svg>
  );
};

export default DonutProgressRing;
