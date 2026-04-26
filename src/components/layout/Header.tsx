import { Building2, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header = ({ isDarkMode, onToggleTheme }: HeaderProps) => (
  <header className="sticky top-0 z-40 border-t-4 border-javeriana-gold bg-javeriana-blue text-white shadow-lg">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <a href="#inicio" className="flex min-w-0 items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-javeriana-gold text-javeriana-blue">
          <Building2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="min-w-0 border-l border-white/20 pl-4">
          <span className="block truncate font-serif text-xl font-bold leading-6">Pontificia Universidad Javeriana</span>
          <span className="block text-xs font-bold uppercase tracking-[0.24em] text-javeriana-gold">Lead & Events Manager</span>
        </span>
      </a>

      <nav className="hidden items-center gap-6 text-sm font-bold uppercase tracking-wide md:flex" aria-label="Principal">
        <a className="transition-colors duration-200 hover:text-javeriana-gold" href="#programas">
          Programas
        </a>
        <a className="transition-colors duration-200 hover:text-javeriana-gold" href="#leads">
          Leads
        </a>
      </nav>

      <Button
        aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        className="h-11 min-h-11 w-11 shrink-0 border-white/30 bg-white/10 p-0 text-white hover:bg-white hover:text-javeriana-blue"
        onClick={onToggleTheme}
        size="sm"
        variant="ghost"
      >
        {isDarkMode ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
      </Button>
    </div>
  </header>
);
