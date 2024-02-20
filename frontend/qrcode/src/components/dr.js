import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Dropdown(){
  const [Tab, setTab] = useState([]);

  useEffect(() => {
    const fetchAllTab = async () => {
      try {
        const res = await axios.get('http://localhost:3000/liste_cathegori');
        console.log('Data from API:', res.data);
        setTab(res.data);
      } catch (err) {
        console.error('Error fetching data from API:', err);
      }
    };

    fetchAllTab();
  }, []);
const dropdown = ({ options, onChange }) => (
  <select onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option.title}>
        {option}
      </option>
    ))}
  </select>
);}

export default Dropdown;