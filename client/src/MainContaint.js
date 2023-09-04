import React from "react";
import BarChartComponentAPI from "./Components/BarChartComponent";
import PieChart from "./Components/PieChart";
import Table from "./Components/Table";
import Country from "./Components/Country";
import Card from "./Components/Card";
import "./App.css";

const MainContent = () => {
  return (
    <div className="MainContent">
      <div>
        <Card />
        <Country />
        <PieChart />
      </div>
      <div>
        <Table />
        <BarChartComponentAPI />
      </div>
    </div>
  );
};

export default MainContent;
