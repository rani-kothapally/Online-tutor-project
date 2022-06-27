import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { subjects } from '../Utils';

import Header  from '../header';
export default function Dashboard() {
  const [searchResult, setSearchResult] = useState(subjects);
  const onSearch = (e) => {
    let result = subjects.filter((eachName) => eachName.name.includes(e.target.value));
    setSearchResult(result);
    if (e.target.value == '') {
      setSearchResult(subjects);
    }
  }
  return (
    <>
      <Header />
      <div>
        <div class='side-header-section'>
          <h3>Available Subjects</h3>
          <div class='search-box'>
            <input type='text' class='search-input' placeholder='Search Subjects...' onChange={(e) => onSearch(e)} />
          </div>
        </div>
        <div className='subjectSection'>
          {
            searchResult.map((eachName) => <Link to={`/subjectDetails?id=${eachName.id}`}><div className='subjectBlock'><div>{eachName.name}</div><div class='subject-info'>Class: {eachName.info}</div></div></Link>)
          }
        </div>
      </div>
    </>
  );
}
