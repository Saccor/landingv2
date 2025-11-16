import { SurveyState, NavigationCallbacks } from '../types';
import { SURVEY_CONFIG, LAYOUT_CONSTANTS } from '../constants';
import { Breadcrumb } from './Breadcrumb';
import { ErrorDisplay } from './ErrorDisplay';

interface IntroScreenProps extends NavigationCallbacks {
  state: SurveyState;
  onStartSurvey: () => void;
}

/**
 * Intro screen with survey description and start button
 */
export function IntroScreen({
  state,
  onGoToHomepage,
  onGoToSurvey,
  onStartSurvey,
}: IntroScreenProps) {
  return (
    <div className="flex flex-col bg-black text-white">
      <Breadcrumb onGoToHomepage={onGoToHomepage} onGoToSurvey={onGoToSurvey} />
      
      {/* Main Content - Mobile Layout with Compact Spacing */}
      <div className="px-4 pb-6 lg:hidden">
        <div className={`w-full max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_MOBILE}] mx-auto`}>
          <div className="font-montserrat">
            <h1 className="font-bold text-xl mb-2">Welcome to the Arfve Survey</h1>
            <p className="font-bold mb-1">Help us shape the future of audio – your voice matters.</p>
            <p className="mb-2">This quick {SURVEY_CONFIG.ESTIMATED_DURATION}-minute survey will directly influence our final design and features.</p>
            <p className="mb-2">At Arfve, we believe the world doesn&apos;t need more disposable earbuds. It needs sound that lasts, design that adapts, and tech that doesn&apos;t expire. Your insights will help us build something different.</p>
            <p className="mb-2">As a thank you, you&apos;ll get early access to exclusive discounts, product updates and a chance to win a pair of Legacy 1 Earbuds.</p>
            <p className="font-bold mb-2">The winner will be announced right before launch day.</p>
            <p className="mb-2">This survey is anonymous. If you&apos;d like to receive your reward, please leave your email at the end.</p>
            <div className="mb-2">
              <p className="font-bold mb-1">Thank you for being part of this movement.</p>
              <p className="italic mb-2">– The Arfve Team</p>
            </div>
            
            <ErrorDisplay error={state.error} />
            
            <div className="flex justify-center">
              <button 
                onClick={onStartSurvey}
                disabled={state.loading}
                className="bg-white text-black rounded-full px-8 py-2 font-semibold text-base shadow-sm hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? 'Loading...' : 'Start the survey'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Desktop Layout with Minimal Padding */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:py-4">
        <div className="w-full max-w-[788px] px-4">
          <div className="font-montserrat text-base leading-6 text-white text-shadow">
            <h1 className="font-bold text-xl mb-3">Welcome to the Arfve Survey</h1>
            <p className="font-bold mb-2">Help us shape the future of audio – your voice matters.</p>
            <p className="mb-3 text-[#CCCCCC]">This quick {SURVEY_CONFIG.ESTIMATED_DURATION}-minute survey will directly influence our final design and features.</p>
            <p className="mb-3 text-[#CCCCCC]">At Arfve, we believe the world doesn&apos;t need more disposable earbuds. It needs sound that lasts, design that adapts, and tech that doesn&apos;t expire. Your insights will help us build something different.</p>
            <p className="mb-3 text-[#CCCCCC]">As a thank you, you&apos;ll get early access to exclusive discounts, product updates and a chance to win a pair of Legacy 1 Earbuds.</p>
            <p className="font-bold mb-3">The winner will be announced right before launch day.</p>
            <p className="mb-3 text-[#CCCCCC]">This survey is anonymous. If you&apos;d like to receive your reward, please leave your email at the end.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Thank you for being part of this movement.</p>
              <p className="italic mb-4 text-[#CCCCCC]">– The Arfve Team</p>
            </div>
            
            <ErrorDisplay error={state.error} />
            
            <div className="flex justify-center">
              <button 
                onClick={onStartSurvey}
                disabled={state.loading}
                className="bg-white text-black rounded-full px-6 py-2 font-semibold text-base hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? 'Loading...' : 'Start the survey'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 