import React from 'react';
import { render } from '@testing-library/react';
import Theme from '@lendi-ui/theme';
import { FormDataContextProvider } from '../../contexts/FormDataContext';

export const renderWithContext = (children: JSX.Element) =>
  render(
    <FormDataContextProvider>
      <Theme>{children}</Theme>
    </FormDataContextProvider>
  );
