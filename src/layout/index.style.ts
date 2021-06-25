import { bg } from '@lendi-ui/color';
import { my } from '@lendi-ui/spacing';
import styled from 'styled-components';
import Container from '@lendi-ui/container';
import { gte } from '@lendi-ui/breakpoint';

export const Root = styled.div`
  ${bg('shade.25')}
  overflow: hidden;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  && input {
    font-size: max(14px, 1rem);
  }
`;

export const GridWrapper = styled(Container)`
  ${my('sm')}
  ${gte('desktop')`
    ${my('xxl')}
  `}
`;
