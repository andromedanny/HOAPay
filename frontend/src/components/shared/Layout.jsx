// components/shared/Layout.jsx
import { styled } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainContent = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  minHeight: 'calc(100vh - 64px)',
  padding: '2rem',
  boxSizing: 'border-box',
  overflowX: 'hidden'
});

export default function Layout() {
  return (
    <>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
}
