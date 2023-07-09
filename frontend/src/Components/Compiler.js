import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Compiler.css';
import { useLocation } from 'react-router-dom';

function Compiler() {
  const location = useLocation();
  const problemId = location.state.problemId;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ...

useEffect(() => {
  const fetchProblemData = async () => {
    try {
      const response = await axios.get(`/api/ojproblem/${problemId}`);
      const problemData = response.data;
      setData(problemData);
      setError('');
    } catch (error) {
      setError('Failed to fetch problem data');
      setData(null);
    }
  };

  fetchProblemData();
}, [problemId]);

// ...


  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8001/run', {
        language: 'cpp',
        code,
        input,
      });

      const { output: result } = response.data;
      setOutput(result);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Online Compiler</h1>
      <h1>Compiler - Problem {problemId}</h1>

      {/* Rest of the component code */}
      <textarea
        rows="10"
        cols="75"
        className="textarea"
        placeholder="Enter code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />
      <textarea
        rows="5"
        cols="75"
        className="textarea"
        placeholder="Enter input (optional)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <br />
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Running...' : 'Run'}
      </button>
      {output && (
        <div className="outputbox">
          <p>{output}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Compiler;
