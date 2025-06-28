import axios from 'axios';
import client from './client.js';
import { toaster } from '../utils/utils.js';

export const exercisesApi = {
  async fetchFitlers({ filter, page, limit = 10 }) {
    try {
      const searchParams = new URLSearchParams();
      filter && searchParams.append('filter', filter);
      searchParams.append('page', page);
      searchParams.append('limit', limit);

      const res = await client.get(`/filters?${searchParams.toString()}`);
      return res.data;
    } catch (e) {
      console.error(e);
      return { results: [], totalPages: 0, page: 1 };
    }
  },
  async fetchExercises({
    page,
    limit = 10,
    keyword,
    muscles,
    bodypart,
    equipment,
  }) {
    try {
      const url = new URL('/exercises');
      url.searchParams.append('page', page);
      url.searchParams.append('limit', limit);
      keyword && url.searchParams.append('keyword', keyword);
      muscles && url.searchParams.append('muscles', muscles);
      bodypart && url.searchParams.append('bodypart', bodypart);
      equipment && url.searchParams.append('equipment', equipment);

      const res = await client.get(url);
      return res.data;
    } catch (e) {
      console.error(e);
  
      return { results: [], totalPages: 0, page: 1 };
    }
  },
  async getExerciseById(id) {
    try {
      const { data } = await client.get(`/exercises/${id}`);
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching exercise by ID: ${error}`);
      
      throw error;
    }
  },

  async updateRating(id, rating) {
    try {
      const { data } = await client.patch(`/exercises/${id}/rating`, rating);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async quoteOfDay() {
    try {
      const { data } = await client.get('/quote');
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

      const url = `/filters${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      toaster.showErrorToast(`Error fetching filters: ${error}`);
      throw error;
    }
  },
};
