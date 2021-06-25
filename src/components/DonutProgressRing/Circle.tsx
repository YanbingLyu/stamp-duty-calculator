import React from 'react';
import { CircleStyled } from './index.style';

interface CircleProps {
  colour: string;
  percentage?: number;
  circleSize: number;
}

const Circle = ({ colour, percentage = 100, circleSize }: CircleProps) => {
  const radius = circleSize / 2;
  const circumference = 2 * Math.PI * radius;
  const strokePercentage = ((100 - percentage) * circumference) / 100;
  return (
    <CircleStyled
      r={radius}
      cx={100}
      cy={100}
      fill="transparent"
      strokeColor={strokePercentage !== circumference ? colour : ''}
      strokeWidth="4px"
      strokeDasharray={circumference}
      strokeDashoffset={percentage ? strokePercentage : 0}
    />
  );
};

export default Circle;
