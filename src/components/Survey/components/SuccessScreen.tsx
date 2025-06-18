import { NavigationCallbacks } from '../types';
import { LAYOUT_CONSTANTS } from '../constants';
import { Breadcrumb } from './Breadcrumb';

/**
 * Success screen after survey completion
 */
export function SuccessScreen({ onGoToHomepage, onGoToSurvey }: NavigationCallbacks) {
  return (
    <div className="flex flex-col bg-black text-white pb-4">
      <Breadcrumb onGoToHomepage={onGoToHomepage} onGoToSurvey={onGoToSurvey} />
      
      {/* Success Content */}
      <div className="px-4 lg:px-6">
        <div className={`w-full max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_MOBILE}] mx-auto lg:max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_DESKTOP}] lg:mt-12 lg:pb-16`}>
          <div className="font-montserrat lg:space-y-6 text-center">
            <h1 className="font-bold text-xl mb-4 lg:mb-0 lg:text-xl lg:font-semibold">Thank You!</h1>
            <p className="font-bold mb-2 lg:mb-0 lg:font-semibold">Your survey has been submitted successfully.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">We appreciate you taking the time to help us shape the future of Arfve.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">Keep an eye on your email for exclusive updates and your chance to win Legacy 1 Earbuds!</p>
            
            <div className="flex justify-center lg:mt-8">
              <button 
                onClick={onGoToHomepage}
                className="bg-white text-black rounded-full px-8 py-2 font-semibold text-base shadow-sm hover:bg-gray-100 transition lg:px-6 lg:py-2 lg:hover:opacity-90 lg:shadow-none"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 