import React, { useEffect, useState } from "react";
import { fetchData } from "./DataService";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Select, MenuItem, Grid, Typography } from "@mui/material";

const TopicPieChart = () => {
  const [data, setData] = useState([]);
  const [selectedStartYear, setSelectedStartYear] = useState(2016);
  const [selectedEndYear, setSelectedEndYear] = useState(2023);
  const [selectedSector, setSelectedSector] = useState("All");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchData()
      .then((data) => {
        setApiData(data);

        if (Array.isArray(data)) {
          const topicCounts = {};

          data.forEach((item) => {
            const topic = item.topic;
            const year = item.start_year;
            const sector = item.sector;

            if (
              topic.trim() !== "" &&
              year >= selectedStartYear &&
              year <= selectedEndYear &&
              (selectedSector === "All" || sector === selectedSector)
            ) {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }
          });

          const chartData = Object.keys(topicCounts).map((topic) => ({
            name: topic,
            count: topicCounts[topic],
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
  }, [selectedStartYear, selectedEndYear, selectedSector]);

  const handleStartYearChange = (event) => {
    setSelectedStartYear(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setSelectedEndYear(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const availableStartYears = [
    ...new Set(apiData.map((item) => item.start_year)),
  ].filter((year) => year >= 1000);

  const availableEndYears = [
    ...new Set(apiData.map((item) => item.start_year)),
  ].filter((year) => year >= 1000);

  const sectors = ["All", ...new Set(apiData.map((item) => item.sector))];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const totalTopics = data.reduce((total, entry) => total + entry.count, 0);

  return (
    <div className="piechart">
      {" "}
      <Typography variant="h6" align="center" gutterBottom>
        Total topic in between year and sector
      </Typography>
      {loading ? (
        <Typography variant="subtitle1" align="center">
          Fetching data...
        </Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // justifyContent: "center",
          }}
        >
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={4}>
              <Typography gutterBottom style={{ opacity: "0.6" }}>
                Start Year
              </Typography>
              <Select
                className="form-control"
                style={{
                  backgroundColor: "#f9f8f9",
                }}
                value={selectedStartYear}
                onChange={handleStartYearChange}
              >
                {availableStartYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom style={{ opacity: "0.6" }}>
                End Year
              </Typography>
              <Select
                className="form-control"
                style={{ backgroundColor: "#f9f8f9" }}
                value={selectedEndYear}
                onChange={handleEndYearChange}
              >
                {availableEndYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom style={{ opacity: "0.6" }}>
                Sector
              </Typography>
              <Select
                className="form-control"
                style={{ backgroundColor: "#f9f8f9" }}
                value={selectedSector}
                onChange={handleSectorChange}
              >
                {sectors.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
      )}
      {noDataFound ? (
        <Typography variant="subtitle1" align="center">
          No data found for the selected filters.
        </Typography>
      ) : (
        <>
          <PieChart width={450} height={300}>
            <Pie
              data={data}
              dataKey="count"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            {/* <Legend /> */}
          </PieChart>
          <Typography variant="subtitle1" align="center">
            Total Number of Topics: {totalTopics}
          </Typography>
        </>
      )}
    </div>
  );
};

export default TopicPieChart;
