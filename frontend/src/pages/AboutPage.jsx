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
        <>
        <div className="">
     
        <div className={`${styles.section} 800px:w-[80%] mx-auto`}>
          <div className="w-full flex items-center flex-col">
            

            <div className="w-full flex items-center flex-col gap-2 p-4 px-8">
    
            </div>

            <div className="mx-auto flex items-center">
              
            </div>
          </div>
          
        </div>
         </div>
        
        </>
    )
}