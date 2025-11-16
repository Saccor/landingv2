import { Home } from 'lucide-react';
import { NavigationCallbacks } from '../types';
import { LAYOUT_CONSTANTS } from '../constants';

/**
 * Breadcrumb navigation component
 */
export function Breadcrumb({ onGoToHomepage, onGoToSurvey }: NavigationCallbacks) {
  return (
    <div className="w-full px-4 mb-3 lg:px-6 lg:pt-10 lg:mb-6">
      <div className={`lg:max-w-[${LAYOUT_CONSTANTS.BREADCRUMB_MAX_WIDTH}] lg:mx-auto flex items-center gap-2 text-sm text-white`}>
        <Home size={18} className="lg:w-4 lg:h-4" />
        <span className="font-semibold underline cursor-pointer" onClick={onGoToHomepage}>
          Homepage
        </span>
        <span className="text-lg">›</span>
        <span className="text-white/80 lg:text-white cursor-pointer hover:text-white" onClick={onGoToSurvey}>
          Survey
        </span>
      </div>
    </div>
  );
} 