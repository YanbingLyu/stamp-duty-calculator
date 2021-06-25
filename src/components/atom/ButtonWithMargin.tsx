import styled from 'styled-components';
import { Button as LuiButton } from '@lendi-ui/button';
import { MarginOptions, margin } from '@lendi-ui/spacing';

export const Button = styled(LuiButton)<MarginOptions>`
  ${margin};
`;
