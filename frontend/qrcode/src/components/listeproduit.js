import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import './stylecss.css'
function ListeProduit() {
    return(<div className='ab'><ul className="custom-list">
        <li><Link to="/licat1">Electronique</Link></li>
        <li><Link to="/licat2">maison</Link></li>
        <li><Link to="/licat3">sport</Link></li>
        <li><Link to="/licat4">alimentation</Link></li>
    </ul></div>)
};

export default ListeProduit;
