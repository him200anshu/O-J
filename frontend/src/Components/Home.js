import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [toggleState, setToggleState] = useState(1);
  const [codeProblems, setCodeProblems] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state.email;

  const handleLogout = () => {
    navigate("/");
  };

  const handleCodeClick = (problemId) => {
    navigate("/Compiler", { state: { problemId } });
  };

  useEffect(() => {
    const fetchCodeProblems = async () => {
      try {
        const response = await axios.post("/getCodeProblems");
        setCodeProblems(response.data.problems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCodeProblems();
  }, []);

  return (
    <div className="homepage">
      <div className="user-box">
        <span className="user-email">{userEmail}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Problem 1
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Problem 2
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Problem 3
          </button>
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            Problem 4
          </button>
        </div>

        <div className="content-tabs">
          {toggleState === 1 && (
            <div className="content active-content">
              <h2>Two Sum</h2>
              <hr />
              <p>
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
                You can return the answer in any order.
              </p>
              <hr />
              <h3> Example-1</h3>
              <hr />
              <p>
                Input: nums = [2,7,11,15], target = 9
                Output: [0,1]
                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
              </p>
              <hr />
              <h3> Example-2 </h3>
              <hr />
              <p>
                Input: nums = [3,2,4], target = 6
                Output: [1,2]
              </p>
              <hr />
              <button className="code-button" onClick={() => handleCodeClick(1)}>
                Code
              </button>
            </div>
          )}

          {toggleState === 2 && (
            <div className="content active-content">
              <h2>Content 2</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente voluptatum qui adipisci.
              </p>
            </div>
          )}

          {toggleState === 3 && (
            <div className="content active-content">
              <h2>Content 3</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                sed nostrum rerum laudantium totam unde adipisci incidunt modi
                alias! Accusamus in quia odit aspernatur provident et ad vel
                distinctio recusandae totam quidem repudiandae omnis veritatis
                nostrum laboriosam architecto optio rem, dignissimos voluptatum
                beatae aperiam voluptatem atque. Beatae rerum dolores sunt.
              </p>
            </div>
          )}

          {toggleState === 4 && (
            <div className="content active-content">
              <h2>Content 4</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                sed nostrum rerum laudantium totam unde adipisci incidunt modi
                alias! Accusamus in quia odit aspernatur provident et ad vel
                distinctio recusandae totam quidem repudiandae omnis veritatis
                nostrum laboriosam architecto optio rem, dignissimos voluptatum
                beatae aperiam voluptatem atque. Beatae rerum dolores sunt.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
