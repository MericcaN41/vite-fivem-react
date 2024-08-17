import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './assets/css/style.min.css';
import DataProvider from './components/DataProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <DataProvider>
        <App />
    </DataProvider>
)
