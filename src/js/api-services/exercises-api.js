import axios from 'axios';
import { API_URL } from '../const/api-url.js';
import { toaster } from '../utils/utils.js';

export const exercisesApi = {
  async getExerciseById(id) {
    try {
      const { data } = await axios.get(`${API_URL}/exercises/${id}`);
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching exercise by ID: ${error}`);
      throw error;
    }
  },

  async updateRating(id, rating) {
    try {
      const { data } = await axios.patch(
        `${API_URL}/exercises/${id}/rating`,
        rating
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  async quoteOfDay() {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/quote`);
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching quote of the day: ${error}`);
      throw error;
    }
  },

  async getFilters(params = {}) {
    try {
      const { filter, page = 1, limit = 12 } = params;
      const queryParams = new URLSearchParams();

      if (filter) queryParams.append('filter', filter);
      if (page) queryParams.append('page', page);
      if (limit) queryParams.append('limit', limit);

      const url = `${API_URL}/filters${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching filters: ${error}`);
      throw error;
    }
  },
};
