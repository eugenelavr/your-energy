import { FILTER_CONFIG } from "../const/filterConfig";
const state = {  
  muscles: '',
  bodyPart: '',
  equipment: '',
};


const populateSelect = (id, items) => {
  const select = document.getElementById(id);
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
};

const setupFilters = onChange => {
  populateSelect('bodyPartSelect', FILTER_CONFIG.bodyParts);
  populateSelect('equipmentSelect', FILTER_CONFIG.equipment);
  populateSelect('musclesSelect', FILTER_CONFIG.muscles);

  ['bodyPartSelect', 'equipmentSelect', 'musclesSelect'].forEach(id => {
    const key = id.replace('Select', '');
    document.getElementById(id).addEventListener('change', e => {
      state[key] = e.target.value;
      onChange?.(state); 
    });
  });
};