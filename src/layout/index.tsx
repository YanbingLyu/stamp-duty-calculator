import { SimpleNavbar } from '@lendi/navbar';
import Head from 'next/head';
import React from 'react';

import { FormDataContextProvider } from '../contexts/FormDataContext';
import Theme from '@lendi-ui/theme';
import { SessionProvider, Session, Brand, Type } from '@lendi/lala-react';
import { GridWrapper, Root } from './index.style';
import { getEnv } from '../utils';

const session = new Session({
  brand: Brand.Lendi,
  type: Type.Customer,
  environment: getEnv(),
});

interface LayoutProps {
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  if (typeof window === 'undefined') return null;

  return (
    <FormDataContextProvider>
      <Theme>
        <Head>
          <title>{title || 'Stamp duty calculator'} - Lendi</title>
        </Head>
        <SessionProvider session={session}>
          <Root>
            <SimpleNavbar
              homeURL="/"
              showContinueAction={false}
              showTalkToExpertCta={false}
              showBookanAppointmentCta={false}
            />
            <GridWrapper>{children}</GridWrapper>
          </Root>
        </SessionProvider>
      </Theme>
    </FormDataContextProvider>
  );
};
