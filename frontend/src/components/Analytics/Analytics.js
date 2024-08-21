import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import "./Analytics.css";
import Grid from "@mui/material/Grid";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const API_URL = process.env.REACT_APP_API_URL;

const fetchData = async () => {
  const response = await axios.get(`${API_URL}/analytics/data`);
  return response.data;
};

const App = () => {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetchData().then((data) => setData(data));

  // }, []);

  if (!data) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="analytics-container">
        <h1>Analytics Dashboard</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <div className="chart-container">
              <h3 className="chart-title">Line Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={data.lineChartData.map((value, index) => ({
                    name: `Page ${index + 1}`,
                    value,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="chart-container">
              <h3 className="chart-title">Pie Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data.pieChartData.map((value, index) => ({
                      name: `Slice ${index + 1}`,
                      value,
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                  >
                    {data.pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="chart-container">
              <h3 className="chart-title">Doughnut Chart</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "fit-content",
                }}
              >
                <div style={{ width: 200, height: 200, position: "relative" }}>
                  <svg viewBox="0 0 36 36" width="100%" height="100%">
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#00C49F"
                      strokeWidth="4"
                      strokeDasharray={`${data.doughnutChartData}, 100`}
                      strokeLinecap="round"
                    />
                    <text
                      x="18"
                      y="20.35"
                      fill="#fff"
                      textAnchor="middle"
                      fontSize="8"
                    >{`${data.doughnutChartData}%`}</text>
                  </svg>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="chart-container">
              <h3 className="chart-title">Map Chart</h3>
              {/* Add your map chart implementation here */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="chart-container">
              <h3 className="chart-title">Bar Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={data.barChartData.map((value, index) => ({
                    name: index + 1,
                    value,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="chart-container">
              <h3 className="chart-title">Stats</h3>
              <div className="stats-container">
                {data.stats.map((stat, index) => (
                  <div
                    key={index}
                    style={{ fontSize: "1.5em", fontWeight: "bold" }}
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default App;
