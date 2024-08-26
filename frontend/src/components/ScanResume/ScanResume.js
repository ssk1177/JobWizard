// ScanResumeModal.js
import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useNavigate } from "react-router-dom";
import "./ScanResume.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ScanResume = ({ show, handleClose }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [matchingMethod, setMatchingMethod] = useState("tfidf");
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(1);
  const pdfContainerRef = useRef(null);
  const [resumeFileData, setResumeFileData] = useState(null);
  const jobDescriptionRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("jwt");

  const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Extract base64 part
      setPdfUrl(URL.createObjectURL(file));
      setResumeFileData(base64String); // Store base64 string
    };

    reader.readAsDataURL(file);
  } else {
    setPdfUrl(null);
  }
};

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onRenderSuccess = () => {
    var jdHeight =
      pdfContainerRef.current.clientHeight +
      document.querySelector("#resumeBrowse").getBoundingClientRect().height + 20; //margin=20

    jobDescriptionRef.current.style.height = `${jdHeight}px`;
  };

  useEffect(() => {
    if (pdfContainerRef.current) {
      setPageWidth(pdfContainerRef.current.clientWidth);
    }
  }, [pdfContainerRef.current]);

  const scanResumeSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("scanResumeForm");
    const formData = new FormData(form);

    fetch(`${API_URL}/scan_resume`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Attempt to parse error response as JSON
          return response.text().then((text) => {
            try {
              const jsonError = JSON.parse(text);
              console.error("Error response in JSON:", jsonError);
              throw new Error(jsonError.message || "Unknown error");
            } catch {
              console.error("Non-JSON error response received:", text);
              throw new Error(text);
            }
          });
        }
        return response.json();
      })
      .then((respdata) => {
        console.log("Response data:", respdata);
        navigate("/ScanResumeResult", {
          state: {
            resumeFileData: resumeFileData, // Pass base64 data
            matched_job_texts: respdata.matched_job_texts,
            matched_resume_texts: respdata.matched_resume_texts,
            score: respdata.score,
            jobDescriptionText: jobDescription,
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className="scanResumeModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Scan Resume</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          id="scanResumeForm"
          method="post"
          encType="multipart/form-data"
          onSubmit={scanResumeSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="resume">Upload Resume</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="resumeBrowse"
                  name="resumeBrowse"
                  accept=".pdf"
                  required
                  onChange={handleFileChange}
                />
                {pdfUrl && (
                  <div
                    id="resumePreview"
                    className="pdf-preview"
                    ref={pdfContainerRef}
                  >
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={handleDocumentLoadSuccess}
                    >
                      <Page
                        pageNumber={1}
                        width={pageWidth}
                        renderAnnotationLayer={false}
                        onRenderSuccess={onRenderSuccess}
                      />
                    </Document>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="job_description" id="jobDesc">
                  Job Description
                </label>
                <textarea
                  className="form-control"
                  id="job_description"
                  name="job_description"
                  rows="10"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  ref={jobDescriptionRef}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group" id="method">
            <label htmlFor="matching_method">Select Matching Method</label>
            <select
              className="form-control"
              id="matching_method"
              name="matching_method"
              required
              value={matchingMethod}
              onChange={(e) => setMatchingMethod(e.target.value)}
            >
              <option value="tfidf">TF-IDF Cosine Similarity</option>
              <option value="bert">BERT</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={scanResumeSubmit}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScanResume;
