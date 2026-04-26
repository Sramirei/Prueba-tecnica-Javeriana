import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="border border-dashed border-stone-line bg-white px-6 py-14 text-center shadow-sm dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-javeriana-blue-100 text-javeriana-blue dark:bg-javeriana-blue-800 dark:text-javeriana-gold">
      {icon}
    </div>
    <h3 className="font-serif text-2xl font-bold text-javeriana-blue dark:text-white">{title}</h3>
    <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-slate-600 dark:text-blue-100">
      {description}
    </p>
    {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
  </div>
);
