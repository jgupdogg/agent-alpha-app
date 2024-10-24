// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import DropdownMenu from './components/DropdownMenu';
import Results from './components/Results';

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply or remove the 'dark' class on the root element based on isDarkMode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Function to fetch results from the API
  const fetchResults = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://10eyuk69qe.execute-api.us-east-1.amazonaws.com/prod/summaries',
        {
          search_string: query,
          top_k: 20,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API Response:', response.data); // For debugging
      setResults(response.data.summaries?.matches || []);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
      setResults([]); // Clear previous results in case of error
    } finally {
      setLoading(false);
    }
  };

  // Fetch results with an empty search string on initial load
  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-light-bg dark:bg-dark-bg">
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="flex-grow w-screen px-4 py-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4 text-primary text-center">Agent Alpha</h1>
        <h2 className="text-2xl mb-8 text-secondary text-center">
          AI-Powered Financial News Aggregator
        </h2>
        <div className="flex w-full justify-center space-x-4">
          {/* Pass the fetchResults function to SearchBar as onSearch */}
          <SearchBar
            onSearch={fetchResults}
            loading={loading}
            error={error}
          />
          <DropdownMenu />
        </div>
        {/* Render the Results component and pass the results */}
        <Results data={results} loading={loading} error={error} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
