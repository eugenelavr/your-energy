
import { exercisesApi } from "../api";

export const handleFilterClick = (category, filterName) => {
    const filters = {
        muscles: category === 'Muscles' ? filterName : '',
        bodypart: category === 'Body parts' ? filterName : '',
        equipment: category === 'Equipment' ? filterName : '',
      };

return async()=>{
  try {
    const res = await exercisesApi.fetchFitlers({ filters });
    console.log(res);
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}
}

