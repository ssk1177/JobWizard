import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "./ScanResumeResult.css";
import Layout from "../Layout";
import "react-pdf/dist/esm/Page/TextLayer.css";

import CircularProgressBar from "./CircularProgressBar";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ScanResumeResult = () => {
  const location = useLocation();
  const { data } = location.state;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [matchScore, setMatchScore] = useState(data.score);
  const [resumeFileData, setResumeFileData] = useState(data.resumeFileData);
  const [resumeText, setResumeText] = useState(""); // Set this based on your backend data or other processing
  const [jobDescriptionText, setJobDescriptionText] = useState(
    data.jobDescriptionText
  );
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [highlightedResumeText, setHighlightedResumeText] = useState("");
  const [highlightedJobText, setHighlightedJobText] = useState("");

  const pdfWrapperRef = useRef(null);
  const divRef = useRef(null);
  const jobDescriptionRef = useRef(null);

  useEffect(() => {
    // Initialize with data from backend
    const { matched_resume_texts, matched_job_texts } = data;

    // Function to highlight text
    const highlightText = (text, matches) => {
      if (!text || !matches || matches.length === 0) return text;

      let highlighted = text;
      matches.forEach((match) => {
        const regex = new RegExp(`(${match})`, "gi");
        highlighted = highlighted.replace(
          regex,
          '<span class="highlight">$1</span>'
        );
      });
      return highlighted;
    };

    // Assuming resumeText and jobDescriptionText are fetched from backend
    // and they are already in plain text format (not PDF)
    setHighlightedResumeText(
      highlightText(resumeText, data.matched_resume_texts)
    );
    setHighlightedJobText(
      highlightText(jobDescriptionText, data.matched_job_texts)
    );
  }, [data, resumeText, jobDescriptionText]);

  const onRenderSuccess = () => {
    jobDescriptionRef.current.style.height = `${divRef.current.clientHeight}px`;
  };

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

  const scoreText =
    matchScore < 40
      ? "Low Score"
      : matchScore < 60
      ? "Good Score"
      : "High Score";

  const resumeUrl = `data:application/pdf;base64,${resumeFileData}`;

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
                  fontWeight: "900",
                  fontFamily: "serif",
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
                  fontWeight: "900",
                  fontFamily: "serif",
                }}
              >
                Job Description
              </h5>
              <div
                className="job-description-text border p-3"
                style={{
                  textAlign: "left",
                }}
                ref={jobDescriptionRef}
                dangerouslySetInnerHTML={{ __html: highlightedJobText }}
              />
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
