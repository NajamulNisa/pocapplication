import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Media queries for responsiveness
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
};

// Animation for moving text (faster speed)
const moveTextRightToLeft = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

// Styled Components

// MovingText styled component
const MovingText = styled.p`
  animation: ${moveTextRightToLeft} 10s linear infinite;
  white-space: nowrap;
  color: #4a4e69;
  font-size: 1.2rem;
  margin: 0;
  position: absolute;
  right: 0;
  top: 20px;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

// Filename display with responsive font size
const FilenameDisplay = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: white;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

// Container for the entire app
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f4f9;
  color: white;
  font-family: 'Helvetica', sans-serif;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

// Sidebar styling
const Sidebar = styled.div`
  width: 300px;
  background-color: #4a4e69;
  padding: 20px;
  border-radius: 0 10px 10px 0;

  @media (max-width: ${breakpoints.laptop}) {
    width: 200px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    border-radius: 0 0 10px 10px;
  }
`;

// Upload container styling
const UploadContainer = styled.div`
  background-color: #6d6875;
  border: 3px dashed #b56576;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  margin-bottom: 30px;

  &:hover {
    border-color: #b56576;
    background-color: #7e747f;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
  }
`;

// Number input container styling
const NumberInputContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

// Input heading styling
const InputHeading = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

// Line input styling
const LineInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #c9ada7;
  background-color: #4a4e69;
  color: #ddd;
  width: 100px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #b56576;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80px;
    padding: 8px;
  }
`;

// Main content styling
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background-color: #f0e5df; /* Updated background color */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
  }
`;

// Content wrapper styling
const ContentWrapper = styled.div`
  margin-top: 30px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

// Cluster container styling
const ClusterContainer = styled.div`
  margin-top: 30px;
  text-align: center;
  border-radius: 15px;
  padding: 15px;
`;

// Cluster title styling
const ClusterTitle = styled.h1`
  font-size: 2.5rem;
  color: #4a4e69;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

// Cluster list styling
const ClusterList = styled.div`
  background-color: #4a4e69;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

// Image heading styling
const ImageHeading = styled.h1`
  font-size: 2.5rem;
  color: #4a4e69;
  text-align: center;
  margin-top: 40px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

// Cluster image container styling
const ClusterImageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background: rgba(74, 78, 105, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

// Cluster image styling
const ClusterImage = styled.div`
  position: relative;
  width: calc(50% - 20px);
  height: 400px;
  background: rgba(74, 78, 105, 0.1);
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    width: calc(100% - 20px); /* Full width for smaller screens */
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 250px;
  }
`;

// No clusters message styling (centered)
const NoClustersMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute; /* Absolute positioning */
  top: 50%; /* Vertical center */
  left: 50%; /* Horizontal center */
  transform: translate(-50%, -50%); /* Perfect centering */
  font-size: 1.5rem;
  color: #b56576;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

// Upload button styling
const UploadButton = styled.button`
  background-color: #ff77a9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4b83;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

// Define cluster images based on cluster IDs (update URLs as needed)
const clusterImages = {
  1: 'https://via.placeholder.com/400?text=Cluster+1+Image',
  2: 'https://via.placeholder.com/400?text=Cluster+2+Image',
  3: 'https://via.placeholder.com/400?text=Cluster+3+Image',
  4: 'https://via.placeholder.com/400?text=Cluster+4+Image',
};

// Initial state for clusters (empty array as we'll fetch from API)
const initialClusters = [];

function App() {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileName(file.name);
        
        // Replace this URL with your actual API endpoint
        const formData = new FormData();
        formData.append('files', file);

        try {
          const response = await axios.post('https://cluster-poc-4ba2ee28df2f.herokuapp.com/cluster-documents/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Assuming your API response contains cluster data
          const clustersData = response.data.clusters; // Adjust based on actual response structure
          setClusters(clustersData);
          setNumberOfClusters(clustersData.length);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
  });

  // State hooks for file name and clusters
  const [fileName, setFileName] = useState('');
  const [clusters, setClusters] = useState(initialClusters);
  const [numberOfClusters, setNumberOfClusters] = useState(0);

  return (
    <Container>
      <Sidebar>
        <UploadContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag & drop a PDF file here, or click to select one</p>
          <UploadButton>Upload PDF</UploadButton>
          {fileName && <FilenameDisplay>Selected file: {fileName}</FilenameDisplay>}
        </UploadContainer>
        <NumberInputContainer>
          <InputHeading>How many clusters to display?</InputHeading>
          <LineInput
            type="number"
            min="0"
            max={numberOfClusters}
            value={numberOfClusters}
            onChange={(e) => setNumberOfClusters(Number(e.target.value))}
          />
        </NumberInputContainer>
      </Sidebar>
      <MainContent>
        <MovingText>
          "POC" commonly stands for Proof of Concept, a demonstration to
          validate an idea's feasibility; Point of Care, immediate medical
          testing at the patient’s location; or Person of Color, referring to
          non-white individuals in social contexts.
        </MovingText>
        <ContentWrapper>
          {numberOfClusters === 0 ? (
            <NoClustersMessage>
              📄 OOPS, No clusters available. Please upload a PDF.
            </NoClustersMessage>
          ) : (
            <ClusterContainer>
              <ClusterTitle>Clusters</ClusterTitle>
              <ClusterList>
                {clusters.slice(0, numberOfClusters).map((cluster, index) => (
                  <div key={index}>
                    <h2>{cluster.title || `Cluster ${index + 1}`}</h2>
                    <p>{cluster.description || 'Description of the cluster.'}</p>
                    <p><strong>Topics:</strong> {cluster.topics.join(', ') || 'No topics available.'}</p>
                  </div>
                ))}
              </ClusterList>
              <ImageHeading>Images</ImageHeading>
              <ClusterImageContainer>
                {clusters.slice(0, numberOfClusters).map((cluster, index) => (
                  <ClusterImage
                    key={index}
                    style={{
                      backgroundImage: `url(${clusterImages[index + 1] || ''})`,
                    }}
                  />
                ))}
              </ClusterImageContainer>
            </ClusterContainer>
          )}
        </ContentWrapper>
      </MainContent>
    </Container>
  );
}

export default App;
