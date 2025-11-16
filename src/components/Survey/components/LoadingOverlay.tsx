/**
 * Loading overlay component
 */
export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1F2429] p-6 rounded-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white font-montserrat">Submitting your survey...</p>
      </div>
    </div>
  );
} 