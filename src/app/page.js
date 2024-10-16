'use client';
import Main from './components/Main/Main';
import { AboutProvider } from '../context/AboutContext';

export default function Home() {
  return (
    <AboutProvider>
        <Main />
    </AboutProvider>
  );
}
