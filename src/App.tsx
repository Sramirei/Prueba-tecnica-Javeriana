import { LeadsProvider } from './context/LeadsContext';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <LeadsProvider>
      <HomePage />
    </LeadsProvider>
  );
}
