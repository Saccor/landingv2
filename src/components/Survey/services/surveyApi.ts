import { Question, AnswerValue } from '../types';
import { API_ENDPOINTS } from '../constants';

class SurveyApiService {
  /**
   * Fetch questions from API
   */
  async fetchQuestions(): Promise<Question[]> {
    try {
      const response = await fetch(API_ENDPOINTS.QUESTIONS);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch questions: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error: Unable to connect to the server');
    }
  }

  /**
   * Submit survey answers to API
   */
  async submitSurvey(answers: Record<string, AnswerValue>): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.SUBMIT_SURVEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit survey: ${errorData.details || errorData.error || 'Unknown error'}`);
      }

      await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error: Unable to submit survey');
    }
  }
}

export const surveyApi = new SurveyApiService(); 