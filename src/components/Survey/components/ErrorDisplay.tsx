interface ErrorDisplayProps {
  error: string;
}

/**
 * Error display component
 */
export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="w-full px-4 lg:px-6 mb-4">
      <div className="max-w-[329px] mx-auto p-4 bg-red-900/20 border border-red-500 rounded text-red-300 text-sm">
        {error}
      </div>
    </div>
  );
} 