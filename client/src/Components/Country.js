import React, { useEffect, useState } from "react";
import { fetchData } from "./DataService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Text,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const PestleBarChart = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchData()
      .then((data) => {
        setApiData(data);

        if (Array.isArray(data)) {
          const pestleCounts = {};

          data.forEach((item) => {
            const country = item.country;
            const pestle = item.pestle;

            if (country === selectedCountry && pestle.trim() !== "") {
              if (!pestleCounts[pestle]) {
                pestleCounts[pestle] = 1;
              } else {
                pestleCounts[pestle] += 1;
              }
            }
          });

          const chartData = Object.keys(pestleCounts).map((pestle) => ({
            name: pestle,
            count: pestleCounts[pestle],
          }));

          if (chartData.length === 0) {
            setNoDataFound(true);
          } else {
            setNoDataFound(false);
          }

          setData(chartData);
        } else {
          console.error("API did not return an array:", apiData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCountry]);
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const availableCountries = [
    ...new Set(apiData.map((item) => item.country)),
  ].filter((country) => country.trim() !== "");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const totalPestles = data.reduce((total, entry) => total + entry.count, 0);

  const totalEconomicPestles = data.reduce((total, entry) => {
    if (entry.name === "Economic") {
      return total + entry.count;
    }
    return total;
  }, 0);
  const totalSocialPestles = data.reduce((total, entry) => {
    if (entry.name === "Social") {
      return total + entry.count;
    }
    return total;
  }, 0);
  const totalIndustriesPestles = data.reduce((total, entry) => {
    if (entry.name === "Industries") {
      return total + entry.count;
    }
    return total;
  }, 0);

  const totalPoliticalPestles = data.reduce((total, entry) => {
    if (entry.name === "Political") {
      return total + entry.count;
    }
    return total;
  }, 0);

  return (
    <div>
      <div className="countrychart1">
        {" "}
        <Typography variant="h6" align="center" gutterBottom>
          Country wise total pestle comparison
        </Typography>{" "}
        {loading ? (
          <Typography variant="subtitle1" align="center">
            Fetching data...🔁🔁
          </Typography>
        ) : (
          <div className="countrychart">
            <label
              htmlFor="sourceSelect"
              style={{ opacity: "0.6", fontSize: "14px" }}
            >
              Filter by Country:
            </label>
            <select
              className="form-control"
              style={{ backgroundColor: "#f9f8f9" }}
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              {availableCountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        )}
        {noDataFound ? (
          <Typography variant="subtitle1" align="center">
            No data found for the selected country.
          </Typography>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={450} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
            <Typography variant="subtitle1" align="center">
              Total Number of Pestles : {totalPestles}
            </Typography>
          </>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <div style={{ marginLeft: "" }}>
            <Typography variant="subtitle1">
              Total Economic Pestles: {totalEconomicPestles}
            </Typography>
            <Typography variant="subtitle1">
              Total Political Pestles: {totalPoliticalPestles}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              Total Industries Pestles: {totalIndustriesPestles}
            </Typography>
            <Typography variant="subtitle1">
              Total Social Pestles: {totalSocialPestles}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestleBarChart;
