import { useState } from 'react';
import axios from 'axios';
import './Compiler.css';

function Compiler() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState(''); // New state for user input
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8001/run', {
        language: 'cpp',
        code,
        input, // Pass the user input to the backend
      });

      setOutput(response.data.output);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Online Compiler</h1>
      <textarea
        rows='10'
        cols='75'
        className="textarea"
        placeholder="Enter code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />
      <textarea
        rows='5'
        cols='75'
        className="textarea"
        placeholder="Enter input (optional)..."
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update the input state
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
