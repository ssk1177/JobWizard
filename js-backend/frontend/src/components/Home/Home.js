import React, { useEffect, useState } from 'react';
import './Home.css'; // Import custom CSS if needed
import $ from 'jquery'; // Import jQuery if you need to use it
import robotimg from "../../assets/images/robot.png";
import Layout from "../Layout";
import ai_powered_imag from '../../assets/images/ai-powered.jpeg';
import data_enc_imag from "../../assets/images/data_enc.jpg";
import user_pref_imag from "../../assets/images/user_pref.png";
import resume_cover_imag from "../../assets/images/resume-cover.jpeg";
import user_anal_imag from "../../assets/images/user_anal.png";

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [ai_powered_imag, data_enc_imag, user_pref_imag,
                    resume_cover_imag, user_anal_imag]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);
    
    return (
      <Layout>
        <div className="container-fluid">
          <div>
            <label
              style={{ display: "block", color: "white", textAlign: "center" }}
            >
              Automating Job Search and Applications with Intelligent Resume
              Matching
            </label>
          </div>
          <div
            style={{
              transform: "translate(-50%, 0)",
              left: "50%",
              bottom: "0px",
              position: "fixed",
            }}
          >
            <img src={robotimg} alt="Robot" />
          </div>
          {/* <div style={{ position: "absolute", top: "60%", height: "100%", width: "100vw"}}>
            {" "}
            
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`image ${
                  index === currentIndex ? "visible" : "hidden"
                }`}
                alt={`Image ${index + 1}`}
                style={getStyleForImage(index)}
              />
            ))}
          </div> */}
        </div>
      </Layout>
    );

    function getStyleForImage(index) {
      const styles = [
        { left: "5%", position: "absolute" },
        { left: "10%", position: "absolute" },
        { right: "5%", position: "absolute" },
        { right: "10%", position: "absolute" },
        { left: "4%", position: "absolute" },
      ];

      return styles[index] || {};
    }
}
export default Home;
