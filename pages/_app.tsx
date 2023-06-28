import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '../client/theme-provider';
import Head from 'next/head';
import { Header } from '../client/components/header';
import { SnackbarProvider } from 'notistack';
import { SnackbarAction } from '../client/components/snackbar-action';
import { SocketProvider } from '../client/api/socket-provider';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { FP_LOAD_OPTIONS } from '../client/use-visitor-data';
import { Paper, Stack } from '@mui/material';
import Script from 'next/script';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Layout({ children }) {
  return (
    <Stack sx={{ height: '100%' }}>
      <Header />
      <Paper
        variant="outlined"
        sx={{ flexGrow: 1, borderRadius: 0, border: 'none', paddingBottom: (t) => t.spacing(4) }}
      >
        {children}
      </Paper>
    </Stack>
  );
}

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnackbarProvider
          action={(snackbarId) => <SnackbarAction snackbarId={snackbarId} />}
          maxSnack={3}
          autoHideDuration={5000}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
        >
          <SocketProvider>
            <FpjsProvider loadOptions={FP_LOAD_OPTIONS}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>Fingerprint Pro Use Cases</title>
              </Head>
              {/* This is not related to any Fingerprint examples, just our internal placeholder for deployment purposes, please ignore */}
              {/* <div id="deployment-placeholder" /> */}
              <Script
                id="gtag-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html:
                    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', 'GTM-NZF3KXN');",
                }}
              />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </FpjsProvider>
          </SocketProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
