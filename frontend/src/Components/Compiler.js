import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Compiler.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Compiler() {
  const location = useLocation();
  const problemId = location.state.problemId;
  const numbers1 = location.state.numbers1;
  const inputs1 = location.state.inputs1;
  const numbers2 = location.state.numbers2;
  const inputs2 = location.state.inputs2;
  const numbers3 = location.state.numbers3;
  const inputs3 = location.state.inputs3;
  const numbers4 = location.state.numbers4;
  const inputs4 = location.state.inputs4;
  const numbers5 = location.state.numbers5;
  const inputs5 = location.state.inputs5;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verdict, setVerdict] = useState('');
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchProblemData = async () => {
      // Rest of the code
    };

    fetchProblemData();
  }, [problemId]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const handleRun = async () => {
    setIsLoading(true);
    setError('');
    setVerdict('');
    setTestResults([]);

    try {
      const response = await axios.post('http://localhost:8001/run', {
        language: 'cpp',
        code,
        input: inputs1.join('\n'),
      });

      const { output: result } = response.data;
      const parsedResult = result.trim();

      if (parsedResult === numbers1.join(' ')) {
        setVerdict('Accepted');
      } else {
        setVerdict('Wrong');
      }

      setTestResults([
        {
          input: inputs1.join(' '),
          expected: numbers1.join(' '),
          actual: parsedResult,
        },
      ]);
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setVerdict('');
    setTestResults([]);

    try {
      const allInputs = [inputs1, inputs2, inputs3, inputs4, inputs5];
      const allNumbers = [numbers1, numbers2, numbers3, numbers4, numbers5];
      const allTestResults = [];

      for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i].join('\n');
        const expected = allNumbers[i].join(' ');

        const response = await axios.post('http://localhost:8001/run', {
          language: 'cpp',
          code,
          input,
        });

        const { output: result } = response.data;
        const parsedResult = result.trim();

        const testResult = {
          input: allInputs[i].join(' '),
          expected,
          actual: parsedResult,
        };

        if (parsedResult === expected) {
          testResult.verdict = 'Accepted';
        } else {
          testResult.verdict = 'Wrong';
        }

        allTestResults.push(testResult);
      }

      setTestResults(allTestResults);

      const isAllAccepted = allTestResults.every(
        (testResult) => testResult.verdict === 'Accepted'
      );

      if (isAllAccepted) {
        setVerdict('Accepted');
      } else {
        setVerdict('Wrong');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryOther = () => {
    navigate('/home'); // Navigate to the home page or the desired page
  };

  return (
    <div className="container">
      <div className="banner">
        <h1 className="title">Online-Judge</h1>
      </div>
      <header>
        <h1>Code Compiler</h1>
      </header>
      <main>
        <div className="compiler-container">
          <div className="compiler-header">
            <h3>Problem {problemId}</h3>
          </div>
          <div className="compiler-body">
            <div className="code-container">
              <textarea
                className="code-editor"
                placeholder="Enter your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="compiler-footer">
            <button
              className="run-button"
              onClick={handleRun}
              disabled={isLoading}
            >
              Run
            </button>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            {testResults.length > 0 && (
              <div className="test-results">
                <h4>Test Results:</h4>
                <ul>
                  {testResults.map((testResult, index) => (
                    <li
                      key={index}
                      className={
                        testResult.verdict === 'Accepted' ? 'accepted' : 'wrong'
                      }
                    >
                      Input: {testResult.input} | Expected: {testResult.expected} | Actual: {testResult.actual}{' '}
                      {testResult.verdict === 'Accepted' && (
                        <span className="tick">&#10003;</span>
                      )}
                    </li>
                  ))}
                </ul>
                
              </div>
            )}
              
            {verdict && (
              <div className="verdict">
                <h4 className={verdict.toLowerCase()}>{verdict}</h4>
              </div>
            )}
            {verdict === 'Accepted' && (
              <button
                className="try-other-button"
                onClick={handleTryOther}
              >
                Try Other
              </button>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Compiler;
