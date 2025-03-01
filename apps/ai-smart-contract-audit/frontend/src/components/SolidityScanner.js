import { useState } from "react";
import axios from "axios";
import "./SolidityScanner.css"; // ✅ Import CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SolidityScanner() {
  const [solidityCode, setSolidityCode] = useState("");
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setSolidityCode("");
      setError("");
    }
  };

  // Handle drag & drop file upload
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setSolidityCode("");
      setError("");
    }
  };

  // Handle text input change
  const handleCodeChange = (event) => {
    setSolidityCode(event.target.value);
    setFile(null);
    setError("");
  };

  // Reset form
  const resetForm = () => {
    setSolidityCode("");
    setFile(null);
    setAnalysisResult("");
    setError("");
  };

  // Submit Solidity code or file to backend using axios
  const handleSubmit = async () => {
    setLoading(true);
    setAnalysisResult("");
    setError("");

    const formData = new FormData();

    if (file) {
      formData.append("file", file, file.name);
    } else if (solidityCode.trim()) {
      formData.append("code", solidityCode);
    } else {
      setError("❌ Please upload a file or enter Solidity code.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5001/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });
      console.log(response.data)

      setAnalysisResult(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <h2>🔍 AI Solidity Security Scanner</h2>

      {/* Drag & Drop File Upload */}
      <div
        className="drop-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <label htmlFor="fileUpload">📂 Upload Solidity File (Drag & Drop)</label>
        <input
          id="fileUpload"
          type="file"
          accept=".sol"
          onChange={handleFileChange}
        />
      </div>

      {/* Display File Info */}
      {file && (
        <div className="file-info">
          <span>📄 {file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
          <button onClick={() => setFile(null)} className="clear-btn">
            <FontAwesomeIcon icon={faTrash} /> Remove
          </button>
        </div>
      )}

      {/* OR Paste Solidity Code */}
      <label htmlFor="solidityCode">✍️ Or Paste Solidity Code</label>
      <textarea
        id="solidityCode"
        placeholder="Paste your Solidity code here..."
        value={solidityCode}
        onChange={handleCodeChange}
      ></textarea>

      {/* Action Buttons */}
      <div className="button-group">
        <button onClick={handleSubmit} disabled={loading} className="analyze-btn">
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin /> Analyzing...
            </>
          ) : (
            "Analyze Contract"
          )}
        </button>
        <button onClick={resetForm} className="clear-btn">
          <FontAwesomeIcon icon={faTrash} /> Clear
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="error"><strong>⚠️ Error:</strong> {error}</div>}

      {/* Display Analysis Result */}
      {analysisResult && (
        <div className="result">
          <h3>🧠 AI Analysis:</h3>
          <pre className="code-block">{analysisResult}</pre>
        </div>
      )}
    </div>
  );
}
