import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AxiosProvider } from './context/AxiosContext';
import AuthProvider from './context/AuthContext';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
