import styled from 'styled-components';
import Dollar from '@lendi-ui/icon/Dollar';
import Help from '@lendi-ui/icon/Help';
import { gte } from '@lendi-ui/breakpoint';

export const DollarWithMargin = styled(Dollar)`
  margin-left: 10px;
`;

export const TooltipHelp = styled(Help)`
  position: relative;
  top: 15px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  ${gte('desktop')`
    width: 150%;
  `}
`;

export const RadioWrap = styled(Wrap as any)`
  ${gte('desktop')`
    flex-direction: row;
  `}
`;
