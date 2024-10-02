import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { keyframes } from 'styled-components';

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

// MovingText styled component
const MovingText = styled.p`
  animation: ${moveTextRightToLeft} 10s linear infinite; /* Increased speed */
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
const initialClusters = []; // Removed dummy data

function App() {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const uploadedFile = acceptedFiles[0];

      // Validate file type
      if (uploadedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (uploadedFile.size > maxSize) {
        setError('File size exceeds 5MB.');
        return;
      }

      setFilename(uploadedFile.name);
      setSelectedCount(0); // Reset cluster count
      setClusters([]); // Clear previous clusters
      setError(null); // Clear previous errors
      setLoading(true); // Set loading state

      // Prepare form data
      const formData = new FormData();
      formData.append('file', uploadedFile); // Ensure 'file' matches API's expected key

      try {
        const response = await fetch('https://cluster-poc-4ba2ee28df2f.herokuapp.com//cluster-documents/', {
          method: 'POST',
          body: formData,
        });

        // Attempt to parse JSON, handle non-JSON responses
        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
          // If response is not ok, throw an error with the message from the server
          const errorMessage = responseData && responseData.message
            ? responseData.message
            : 'Unprocessable Entity';
          throw new Error(errorMessage);
        }

        // Assuming the API returns an array of clusters
        if (!Array.isArray(responseData)) {
          throw new Error('Unexpected response format');
        }

        setClusters(responseData);
        setSelectedCount(responseData.length); // Automatically display all clusters
      } catch (err) {
        console.error('Error details:', err);
        setError(`Failed to fetch clusters: ${err.message}`);
      } finally {
        setLoading(false);
      }
    },
  });

  const [clusters, setClusters] = useState(initialClusters);
  const [selectedCount, setSelectedCount] = useState(0);
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLineInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      setSelectedCount(0);
    } else {
      setSelectedCount(value);
    }
  };

  return (
    <Container>
      <Sidebar>
        <h1>PDF Cluster Tool</h1>

        <UploadContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag & drop a PDF file here, or click to select one</p>
          <UploadButton>Browse Files</UploadButton>
        </UploadContainer>

        {filename && <FilenameDisplay>Selected file: {filename}</FilenameDisplay>}

        <NumberInputContainer>
          <InputHeading>How many clusters to display?</InputHeading>
          <LineInput
            type="number"
            value={selectedCount}
            min="0+"
            onChange={handleLineInputChange}
          />
        </NumberInputContainer>

        {loading && <FilenameDisplay>Loading clusters...</FilenameDisplay>}
        {error && <FilenameDisplay style={{ color: 'red' }}>{error}</FilenameDisplay>}
      </Sidebar>

      <MainContent>
        <MovingText>
          "POC" commonly stands for Proof of Concept, a demonstration to
          validate an idea's feasibility; Point of Care, immediate medical
          testing at the patient’s location; or Person of Color, referring to
          non-white individuals in social contexts.
        </MovingText>

        <ContentWrapper>
          <ClusterContainer>
            {selectedCount > 0 ? (
              <>
                <ClusterTitle>Clusters</ClusterTitle>
                {clusters.slice(0, selectedCount).map((cluster) => (
                  <ClusterList key={cluster.id}>
                    <strong>{cluster.name}</strong>
                    <p>{cluster.description}</p>
                  </ClusterList>
                ))}
              </>
            ) : (
              <NoClustersMessage>
                🙁 OOPS! No clusters available. Please upload a PDF.
              </NoClustersMessage>
            )}
          </ClusterContainer>

          {selectedCount > 0 && (
            <>
              <ImageHeading>Images</ImageHeading>
              <ClusterImageContainer>
                {clusters.slice(0, selectedCount).map((cluster) => (
                  <ClusterImage
                    key={cluster.id}
                    style={{ backgroundImage: `url(${clusterImages[cluster.id]})` }}
                  />
                ))}
              </ClusterImageContainer>
            </>
          )}
        </ContentWrapper>
      </MainContent>
    </Container>
  );
}

export default App;
