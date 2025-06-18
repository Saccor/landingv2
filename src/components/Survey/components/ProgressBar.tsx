import { SURVEY_CONFIG } from '../constants';

interface ProgressBarProps {
  progressPercentage: number;
}

/**
 * Progress bar component for questions screen
 */
export function ProgressBar({ progressPercentage }: ProgressBarProps) {
  return (
    <div className="w-full px-4 lg:px-6 mb-6 mt-6">
      <div className="w-[305px] lg:max-w-[768px] lg:w-full mx-auto flex items-center gap-4">
        {/* Percentage Text */}
        <div className="w-[40px] h-[20px] flex items-center justify-start">
          <span className="font-montserrat font-medium text-sm text-white">
            {progressPercentage}%
          </span>
        </div>

        {/* Progress Line */}
        <div className="flex-1 h-[2px] bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-white transition-all duration-${SURVEY_CONFIG.PROGRESS_ANIMATION_DURATION} ease-out`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
} 