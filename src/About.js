// src/About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f9; /* Light background for the about page */
  color: #333; /* Darker text for readability */
  min-height: 100vh; /* Full viewport height */
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #4a4e69; /* Matching color */
`;

const AboutContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 800px;
  margin: 20px auto; /* Centering the content */
`;

function About() {
  return (
    <AboutContainer>
      <AboutTitle>About the PDF Cluster Tool</AboutTitle>
      <AboutContent>
        This tool helps you visualize clusters from uploaded PDFs, allowing for easy exploration of document topics. 
        It aims to assist users in understanding the relationships between various topics and enhancing their document 
        analysis experience.
      </AboutContent>
      <AboutContent>
        Feel free to upload a PDF, specify the number of clusters to display, and explore the results!
      </AboutContent>
    </AboutContainer>
  );
}

export default About;
