import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css"; // Custom styles if needed

const Layout = ({ children }) => {
  // const [scrollY, setScrollY] = useState(0);

  // const handleScroll = () => {
  //   setScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const backgroundStyle = {
  //   height: `${100 + scrollY * 0.5}%`, // Adjust the factor as needed
  // };

  //className="background" style={backgroundStyle}>
  // className="content">
  return (
    <div class="bg-image vh-100">
      <div>
        <Navbar className="container-fluid" />
        <Footer />
        <div className="container-fluid">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
