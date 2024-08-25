import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import styles

const CircularProgressBar = ({ percentage }) => (
  <div style={{ width: 100, height: 100 }}>
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        textColor: "#4db8ff",
        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
        trailColor: "#e6e6e6",
        strokeLinecap: "round",
        pathTransitionDuration: 0.5,
        backgroundColor: "#3e98c7",
        // Text size
        textSize: "16px",
      })}
    />
  </div>
);

export default CircularProgressBar;
