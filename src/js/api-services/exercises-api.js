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
      const { data } = await axios.get(`${API_URL}/quote`);
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching quote of the day: ${error}`);
      throw error;
    }
  },

  async getExercises({ filters = {}, page = 1, limit = 114 } = {}) {
    const { bodypart, muscles, equipment, keyword } = filters;

    try {
      const { data } = await axios.get(`${API_URL}/exercises`, {
        params: {
          bodypart: bodypart || '',
          muscles: muscles || '',
          equipment: equipment || '',
          keyword: keyword || '',
          page,
          limit,
        },
      });
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching exercises: ${error}`);
      throw error;
    }
  },
};