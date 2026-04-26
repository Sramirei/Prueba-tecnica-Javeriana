import { ArrowDown, Landmark } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroBanner = () => (
  <section id="inicio" className="relative overflow-hidden bg-javeriana-blue text-white">
    <img
      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600"
      alt="Estudiantes en un campus universitario"
      className="absolute inset-0 h-full w-full object-cover opacity-20"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-javeriana-blue via-javeriana-blue/90 to-javeriana-blue/55" />
    <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-javeriana-gold bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-javeriana-gold">
          <Landmark className="h-4 w-4" aria-hidden="true" />
          Admisiones y eventos académicos
        </p>
        <h1 className="font-serif text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
          Javeriana Lead & Events Manager
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
          Consulta la oferta académica simulada desde JSONPlaceholder, filtra programas y registra prospectos con una experiencia sobria, accesible y persistente.
        </p>
        <div className="mt-8">
          <a href="#programas">
            <Button size="lg">
              Explorar programas
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </div>

      <aside className="self-end border-l-4 border-javeriana-gold bg-white/95 p-6 text-javeriana-blue shadow-xl dark:bg-javeriana-blue-900 dark:text-white">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-javeriana-gold">Resumen</p>
        <dl className="mt-5 grid grid-cols-3 gap-4 text-center">
          <div>
            <dt className="font-serif text-4xl font-bold">12</dt>
            <dd className="text-xs font-bold uppercase tracking-wide">Programas</dd>
          </div>
          <div>
            <dt className="font-serif text-4xl font-bold">3</dt>
            <dd className="text-xs font-bold uppercase tracking-wide">Categorías</dd>
          </div>
          <div>
            <dt className="font-serif text-4xl font-bold">SPA</dt>
            <dd className="text-xs font-bold uppercase tracking-wide">Sin recargas</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
);
