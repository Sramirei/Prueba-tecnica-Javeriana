export const LoadingState = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Cargando programas">
    {Array.from({ length: 8 }, (_, index) => (
      <div
        key={index}
        className="min-h-[392px] animate-pulse overflow-hidden rounded-sm border border-stone-line bg-white shadow-sm dark:border-javeriana-blue-800 dark:bg-javeriana-blue-900"
      >
        <div className="h-44 bg-slate-200 dark:bg-javeriana-blue-800" />
        <div className="space-y-4 p-5">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-javeriana-blue-800" />
          <div className="h-7 w-3/4 rounded bg-slate-200 dark:bg-javeriana-blue-800" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-javeriana-blue-800" />
          <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-javeriana-blue-800" />
          <div className="h-11 w-full rounded-sm bg-slate-200 dark:bg-javeriana-blue-800" />
        </div>
      </div>
    ))}
  </div>
);
