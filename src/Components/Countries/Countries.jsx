import React, { use, useState } from 'react';
import Country from '../Country/Country';
import './Countries.css';

const Countries = ({ countriesPromises }) => {

  const [visitedCountries, setVisitedCountries] = useState([]);
  const [visitedFlag, setVisitedFlag] = useState([]);

  // handler 1 - minimal version; 
  /* const handleVisistedCoutnries = (country) => {
    console.log("Visited Country Clicked", country); 
    const newVisistedCountries = [...visitedCountries, country]; 
    setVisitedCountries(newVisistedCountries); 
  } */

  /* Extended Version */
  const handleVisistedCoutnries = (country) => {
    setVisitedCountries((visitedCountires) => {

      const countryCode = country?.cca3 || country?.name?.common;
      const isAlreadyVisited = visitedCountires.some((alreadyVisited) => (alreadyVisited?.cca3 || alreadyVisited?.name?.common) === countryCode);

      if (isAlreadyVisited) {
        return visitedCountires.filter((visited) => (visited?.cca3 || visited?.name?.common) !== countryCode);
      }

      return [...visitedCountires, country];
    });
  };

  // handler 2 - minimal version
  /* const handleVisitedFlag = (flag) => {
    const newVisitedFlag = [...visitedFlag, flag];
    setVisitedFlag(newVisitedFlag);
  }; */

  // Extended version
  const handleVisitedFlag = (flag) => {
    setVisitedFlag((visitedFlag) => {
      if (visitedFlag.includes(flag)) {
        return visitedFlag.filter((vf) => vf !== flag);
      }

      return [...visitedFlag, flag]
    });
  }


  const countriesData = use(countriesPromises);
  const countries = Array.isArray(countriesData)
    ? countriesData
    : countriesData?.countries ?? [];

  return (
    <div>
      <h1>Total Countries: {countries.length}</h1>
      <h3>Visited Country Name: {visitedCountries.length}</h3>

      <ol className='display-grid'>
        {
          visitedCountries.map((country) => (
            <li key={country?.cca3 || country?.name?.common}>{country?.name?.common}</li>
          ))
        }
      </ol>

      <ol className='display-grid'>
        {
          visitedFlag.map((flag, index) => (
            <img key={index} height='30px' src={flag} alt='visited flag' />
          ))
        }
      </ol>

      <div className='countries'>
        {
          countries.map(country => <Country
            key={country?.cca3 || country?.name?.common}
            country={country}
            handleVisistedCoutnries={handleVisistedCoutnries}
            handleVisitedFlag={handleVisitedFlag}
          ></Country>)
        }
      </div>
    </div>
  );
};

export default Countries;