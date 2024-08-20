import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "./ScanResumeResult.css"; 
import Layout from "../Layout";
import "react-pdf/dist/esm/Page/TextLayer.css";

import CircularProgressBar from "./CircularProgressBar";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ScanResumeResult = ({ route, navigation }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [matchScore, setMatchScore] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeFilename, setResumeFilename] = useState("");
  const [resumeFileData, setResumeFileData] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const pdfWrapperRef = useRef(null);
  

  const divRef = useRef(null);
  const jobDescriptionRef = useRef(null);

  const location = useLocation();
  const { data } = location.state;

  const temp_data_id = data.temp_data_id;

  const resumeUrl = `data:application/pdf;base64,${resumeFileData}`;

  const onRenderSuccess = () => {
    jobDescriptionRef.current.style.height = `${divRef.current.clientHeight}px`;

  };


  useEffect(() => {
    fetch("/results/"+temp_data_id)
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 200) {
            setMatchScore(data.match_score);
            setResumeFilename(data.resume_filename);
            setResumeFileData(data.resume_data);
            setResumeText(data.resume_text);
            setJobDescriptionText(data.job_description_text);
        } else {
            console.log("Failure in getting result, msg", data.msg);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  const handleGenerateCoverLetter = () => {
    // Mockup logic to generate a cover letter
    setCoverLetter("Generated Cover Letter Content");
    setShowCoverLetter(true);
  };

  const handleDownloadCoverLetter = () => {
    // Mockup logic to download the cover letter
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cover-letter.txt";
    link.click();
  };

  var scoreText;

  if (matchScore < 40) {
    scoreText = "Low Score"
  } else if (matchScore < 60)
    scoreText = "Good Score";
  else 
    scoreText = "High Score";


    return (
      <Layout>
        <div
          className="container mt-3"
          style={{
            border: "1px solid white",
            backgroundColor: "aliceblue",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <div className="match-score mr-3">
                    Match Score:{" "}
                    <div style={{ textAlign: "center", padding: "20px" }}>
                      <CircularProgressBar percentage={matchScore} />
                    </div>
                  </div>
                  <div>
                    <span className="text-muted">{scoreText}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <h5
                  style={{
                    "font-weight": "900",
                    "font-family": "serif",
                  }}
                >
                  Resume
                </h5>
                <div id="pdf-viewer" ref={divRef}>
                  <div ref={pdfWrapperRef}>
                    <Document
                      file={resumeUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page
                        pageNumber={pageNumber}
                        renderAnnotationLayer={false}
                        onRenderSuccess={onRenderSuccess}
                      />
                    </Document>
                  </div>
                  <div className="navigation-buttons mt-2">
                    <button
                      onClick={handlePrevPage}
                      className="btn btn-secondary btn-sm"
                    >
                      Previous
                    </button>
                    <span id="page-num" className="mx-2">
                      Page {pageNumber}
                    </span>
                    <button
                      onClick={handleNextPage}
                      className="btn btn-secondary btn-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h5
                  id="jobdesc"
                  style={{
                    "font-weight": "900",
                    "font-family": "serif",
                  }}
                >
                  Job Description
                </h5>
                <div
                  className="job-description-text border p-3"
                  style={{
                    "text-align": "left",
                  }}
                  ref={jobDescriptionRef}
                >
                  {jobDescriptionText}
                </div>
              </div>
            </div>
            <div className="row mt-3" id="genCover">
              <div className="col-md-12 text-right">
                <button
                  onClick={handleGenerateCoverLetter}
                  className="btn btn-primary"
                >
                  Generate Cover Letter
                </button>
              </div>
            </div>
            {showCoverLetter && (
              <div className="row mt-3" id="cover-letter-container">
                <div className="col-md-12">
                  <h5>Cover Letter</h5>
                  <div id="cover-letter" className="border p-3">
                    {coverLetter}
                  </div>
                  <button
                    onClick={handleDownloadCoverLetter}
                    className="btn btn-secondary mt-3"
                  >
                    Download Cover Letter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
};

export default ScanResumeResult;

