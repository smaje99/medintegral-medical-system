import api from '@Api/suggestion.api';
import { Suggestion, SuggestionCreate } from '@Types/suggestion';

import { withAxiosHandler } from './commons';

export const createSuggestion: (
    suggestionObj: SuggestionCreate
) => Promise<Suggestion> = withAxiosHandler(
    async (suggestionObj) => api.create(suggestionObj)
);

export const getAllOfPinnedSuggestions: () => Promise<Suggestion[]> = withAxiosHandler(
    async () => api.getAllOfPinned()
);