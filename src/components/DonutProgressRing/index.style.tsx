import styled from 'styled-components';

export const CircleStyled = styled.circle<{ strokeColor: string }>`
  stroke: ${({ strokeColor }) => strokeColor};
`;
