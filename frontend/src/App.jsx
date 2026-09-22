import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setShortUrl("");

    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);

console.log("Sending URL:", originalUrl);

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/urls/shorten`,
  {
    originalUrl
  }
);

      setShortUrl(response.data.shortUrl);
      setOriginalUrl("");
    } catch (error) {
  console.error("Error creating short URL:", error);

  console.log("Backend response:", error.response?.data);

  setError(
    error.response?.data?.message ||
    "Something went wrong. Please try again."
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>URL Shortener</h1>

        <p className="subtitle">
          Convert long URLs into short and shareable links.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your long URL"
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p>Your shortened URL:</p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;