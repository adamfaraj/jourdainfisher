'use client';
import Main from './components/Main/Main';
import { AboutProvider } from '../context/AboutContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

export default function Home() {
  return (
    <AboutProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </AboutProvider>
  );
}
