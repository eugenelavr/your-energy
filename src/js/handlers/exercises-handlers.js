import { exercisesApi } from '../api-services/exercises-api.js';

import { renderExerciseList } from '../components/exercises-list.js';
import { renderPagination } from '../components/pagination.js';
export const getFilters = async data => {
  const filtersSet = {
    bodyParts: new Set(),
    equipment: new Set(),
    muscles: new Set(),
    keywords: new Set(),
  };

  data.forEach(exercise => {
    if (exercise.bodyPart) filtersSet.bodyParts.add(exercise.bodyPart);
    if (exercise.equipment) filtersSet.equipment.add(exercise.equipment);
    if (exercise.target) filtersSet.muscles.add(exercise.target);
    if (exercise.name) filtersSet.keywords.add(exercise.name.toLowerCase());

    if (exercise.description) {
      const words = exercise.description.toLowerCase().match(/\b[a-z]{3,}\b/g);
      if (words) {
        words.forEach(word => filtersSet.keywords.add(word));
      }
    }
  });

  return {
    bodyParts: Array.from(filtersSet.bodyParts).sort(),
    equipment: Array.from(filtersSet.equipment).sort(),
    muscles: Array.from(filtersSet.muscles).sort(),
    keywords: Array.from(filtersSet.keywords).sort(),
  };
};

const PER_PAGE = 12;
let currentPage = 1;
let latestFilters = {};


export const handlePagination = (currentPage, totalPages, action) => {
  renderPagination(currentPage, totalPages, action);
};




export const handleExercisesWithPagination = async (
  filters = {},
  limit = PER_PAGE
) => {
  try {
    latestFilters = filters;
    const { bodypart, muscles, equipment, keyword } = filters;

    const response = await exercisesApi.getExercises({
      filters: { bodypart, muscles, equipment, keyword },
      limit,
      page: currentPage,
    });

    const { page, totalPages, results } = response;
    currentPage = page;

    renderExerciseList(results);
    renderPagination(currentPage, totalPages, async newPage => {
      currentPage = newPage;
      await handleExercisesWithPagination(latestFilters, limit);
    });
  } catch (error) {
    console.error('Error fetching exercises with pagination:', error);
  }
};



