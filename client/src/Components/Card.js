import React, { useState, useEffect } from "react";
import { fetchData } from "./DataService";
import "../App.css";

const Card = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India"); // Set India as the default value
  const [likelihood, setLikelihood] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Calculate the likelihood when the selected country changes
    if (selectedCountry && apiData.length > 0) {
      const filteredData = apiData.filter(
        (item) => item.country === selectedCountry
      );
      if (filteredData.length > 0) {
        const totalLikelihood = filteredData.reduce(
          (acc, item) => acc + item.likelihood,
          0
        );
        setLikelihood(totalLikelihood);
      } else {
        // If no data is found for the selected country, set likelihood to 0
        setLikelihood(0);
      }
    } else {
      // If no country is selected or no data is available, set likelihood to null
      setLikelihood(null);
    }
  }, [selectedCountry, apiData]);

  const uniqueCountries = Array.isArray(apiData)
    ? Array.from(new Set(apiData.map((item) => item.country)))
    : [];

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const totalRegions = Array.isArray(apiData)
    ? Array.from(new Set(apiData.map((item) => item.region)))
    : [];

  const totalCountries = uniqueCountries.length;

  return (
    <div className="card-container">
      <div className="first-container">
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <label htmlFor="countrySelect">Country List:</label>
          <br></br>
          <select
            id="countrySelect"
            onChange={handleCountryChange}
            value={selectedCountry}
            className="select-likelihood"
          >
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {selectedCountry && likelihood !== null && (
          <div className="likelihood-container">
            <p>
              Likelihood for {selectedCountry}:
              <span className="likelihood">{likelihood}</span>
            </p>
          </div>
        )}
      </div>
      <div className="first-container">
        <p className="counts">
          Total Country Count:<br></br>
          <span className="total-count">{totalCountries}</span>
        </p>
      </div>
      <div className="first-container">
        <p className="counts">
          Total Region Count:<br></br>
          <span className="total-count">{totalRegions.length}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
