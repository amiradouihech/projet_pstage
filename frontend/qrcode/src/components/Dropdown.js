import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ onSelect, apiUrl }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(apiUrl);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchOptions();
  }, [apiUrl]);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Sélectionnez...</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.libelle}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
