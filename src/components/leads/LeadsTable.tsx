import { Trash2, UserPlus } from 'lucide-react';
import { useLeadsContext } from '../../context/LeadsContext';
import { formatDate } from '../../helpers/formatText';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';

export const LeadsTable = () => {
  const { leads, removeLead, totalLeads } = useLeadsContext();

  return (
    <section id="leads" className="mt-16 scroll-mt-28">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-4xl font-bold text-javeriana-blue dark:text-white">Leads registrados</h2>
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-blue-100">
          {totalLeads} registro{totalLeads === 1 ? '' : 's'}
        </p>
      </div>

      {leads.length === 0 ? (
        <EmptyState
          icon={<UserPlus className="h-7 w-7" aria-hidden="true" />}
          title="Aún no hay prospectos"
          description="Cuando registres un interesado desde una card de programa, aparecerá aquí."
        />
      ) : (
        <div className="overflow-hidden rounded-sm border border-stone-line bg-white shadow-sm dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-line dark:divide-javeriana-blue-800">
              <caption className="sr-only">Tabla de leads registrados</caption>
              <thead className="bg-slate-50 dark:bg-javeriana-blue-950">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-blue-100" scope="col">
                    Nombre
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-blue-100" scope="col">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-blue-100" scope="col">
                    Programa
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-blue-100" scope="col">
                    Fecha
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-blue-100" scope="col">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-line dark:divide-javeriana-blue-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-javeriana-blue-100/55 dark:hover:bg-javeriana-blue-800/45">
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-ink dark:text-white">{lead.name}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-blue-100">{lead.email}</td>
                    <td className="min-w-64 px-5 py-4 text-sm text-slate-600 dark:text-blue-100">{lead.programName}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-blue-100">{formatDate(lead.registrationDate)}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <Button
                        aria-label={`Eliminar lead de ${lead.name}`}
                        className="h-11 min-h-11 w-11 p-0"
                        onClick={() => removeLead(lead.id)}
                        size="sm"
                        variant="danger"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
