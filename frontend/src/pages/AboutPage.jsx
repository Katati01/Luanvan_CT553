import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";

const AboutPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <About />
      <Footer />
    </div>
  );
};



export default AboutPage;

const About = () =>{
    return(
        <h1>AGRISHOP – CHUỖI SIÊU THỊ NÔNG NGHIỆP HÀNG ĐẦU VIỆT NAM</h1>
    )
}