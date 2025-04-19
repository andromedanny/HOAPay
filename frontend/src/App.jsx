import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import Announcements from './pages/Announcements';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Officers from './pages/Officers';
import AdminPage from './pages/Admin';
import ManageUsers from './pages/ManageUsers'; // ✅ Import ManageUsers page

const theme = createTheme({
  palette: {
    primary: { main: '#2E7D32' },
    secondary: { main: '#00695C' }
  }
});

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/announcements"
              element={
                <ProtectedRoute>
                  <Announcements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officers"
              element={
                <ProtectedRoute>
                  <Officers />
                </ProtectedRoute>
              }
            />

            {/* ✅ Admin-only routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <ManageUsers />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
