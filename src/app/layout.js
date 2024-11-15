import { Anton } from 'next/font/google'
import "./globals.css";
import Navigation from "./components/Navigation/Navigation";
import { AboutProvider } from '@/context/AboutContext';
import { ManagementProvider } from '@/context/ManagementContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';


const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Jourdain Fisher | Actor, Comedian, Writer",
  description: "Jourdain Fisher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={anton.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          <AboutProvider>
            <ManagementProvider>
              {children}
            </ManagementProvider>
          </AboutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
