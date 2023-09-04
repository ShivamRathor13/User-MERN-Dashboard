import React, { useEffect, useState } from "react";
import { fetchData } from "./DataService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
  ResponsiveContainer,
} from "recharts";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";

const SectorChart = () => {
  const [data, setData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedPestle, setSelectedPestle] = useState("All");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setApiData(data);

        if (Array.isArray(data)) {
          const sectorCounts = {};

          data.forEach((item) => {
            const sector = item.sector;
            const pestle = item.pestle;

            if (selectedPestle === "All" || pestle === selectedPestle) {
              sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
            }
          });

          const chartData = Object.keys(sectorCounts).map((sector) => ({
            sector,
            count: sectorCounts[sector],
          }));

          setData(chartData);
        } else {
          console.error("API did not return an array:", apiData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedPestle]);

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const handlePestleChange = (event) => {
    setSelectedPestle(event.target.value);
  };

  const filteredData =
    selectedSector === "All"
      ? data
      : data.filter((item) => item.sector === selectedSector);

  const pestleOptions = ["All", ...new Set(apiData.map((item) => item.pestle))];

  return (
    <div className="PestleVSSector">
      <Typography variant="h6" align="center" gutterBottom>
        Total Number of Pestle vs Sector
      </Typography>
      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        {/* <h6>Sector VS Pestle</h6> */}
        <FormControl style={{ marginBottom: "20px" }}>
          {/* <InputLabel id="">Sector</InputLabel> */}
          <Typography gutterBottom style={{ opacity: "0.6" }}>
            Sector
          </Typography>
          <Select
            labelId="sector-select-label"
            className="form-control"
            style={{ backgroundColor: "#f9f8f9" }}
            value={selectedSector}
            onChange={handleSectorChange}
          >
            <MenuItem value="All">All</MenuItem>
            {data.map((item) => (
              <MenuItem key={item.sector} value={item.sector}>
                {item.sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <Typography gutterBottom style={{ opacity: "0.6" }}>
            Pestle
          </Typography>
          {/* <InputLabel id="pestle-select-label">Pestle</InputLabel> */}
          <Select
            labelId="pestle-select-label"
            id="pestle-select"
            className="form-control"
            style={{ backgroundColor: "#f9f8f9" }}
            value={selectedPestle}
            onChange={handlePestleChange}
          >
            {pestleOptions.map((pestle) => (
              <MenuItem key={pestle} value={pestle}>
                {pestle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          className="BarChart"
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 35 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="sector"
            label={{
              value: "Sector --->",
              position: "insideBottom",
              offset: -24,
            }}
          />

          <YAxis>
            <Label
              value="No. ofPestle--->"
              position="insideLeft"
              angle={-90}
              offset={0}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectorChart;
