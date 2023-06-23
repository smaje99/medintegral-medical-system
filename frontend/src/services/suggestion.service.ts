import * as api from '@/api/suggestion.api';
import { Suggestion, SuggestionCreate } from '@/types/suggestion';

import { withAxiosHandler } from './commons';

export const createSuggestion: (suggestionObj: SuggestionCreate) => Promise<Suggestion> =
  withAxiosHandler(async (suggestionObj) => api.create(suggestionObj));

export const getAllOfPinnedSuggestions: () => Promise<Suggestion[]> = withAxiosHandler(
  async () => api.getAllOfPinned()
);
