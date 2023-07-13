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
  const userEmail = location.state?.email;

  const handleLogout = () => {
    navigate("/");
  };

  const handleCodeClick = (problemId,numbers1,inputs1,numbers2,inputs2,numbers3,inputs3,numbers4,inputs4,numbers5,inputs5) => {
    navigate("/Compiler", { state: { problemId,numbers1,inputs1,numbers2,inputs2,numbers3,inputs3,numbers4,inputs4,numbers5,inputs5 } });
  };

  

  return (

    
    <div className="homepage">
      <div className="banner">
        <h1 className="title">Online-Judge</h1>
      </div>
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
                Given an array of integers nums of size 5 , return indices of the two numbers such that they add up to a target value equals 9.
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
                You can return the answer in any order.
              </p>
              <hr />
              <h3> Example-1</h3>
              <hr />
              <p>
                Input: nums = [2,7,11,15,32]
                Output: [0,1]
                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
              </p>
              <hr />
              <h3> Example-2 </h3>
              <hr />
              <p>
                Input: nums = [3,2,4,1,5]
                Output: [2,4]
              </p>
              <hr />
              <button className="code-button" onClick={() => handleCodeClick(1,[0,1],[2,7,11,15,32],[2,4],[3,2,4,1,5],[1,4],[1,3,2,4,6],[0,3],[9,1,2,0,7],[0,1],[1,8,2,7,9])}>
                Code
              </button>
            </div>
          )}

          {toggleState === 2 && (
            <div className="content active-content">
               <h2>Reverse Integer</h2>
              <hr />
              <p>
              Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
              </p>
              <hr />
              <h3> Example-1</h3>
              <hr />
              <p>
                Input: nums = 123
                Output: 321
                
              </p>
              <hr />
              <h3> Example-2 </h3>
              <hr />
              <p>
                Input: nums = 457
                Output: 754
              </p>
              <hr />
              <button className="code-button" onClick={() => handleCodeClick(2,[123],[321],[457],[754],[357823],[328753],[-245],[-542],[91],[190])}>
                Code
              </button>
            </div>
          )}

          {toggleState === 3 && (
            <div className="content active-content">
               <h2> Median of Two Sorted Arrays</h2>
              <hr />
              <p>
              Given two sorted arrays nums1 and nums2 of size 3 return the median of the two sorted arrays.

              The overall run time complexity should be O(log (m+n)).
              </p>
              <hr />
              <h3> Example-1</h3>
              <hr />
              <p>
              Input: nums1 = [1,3,5], nums2 = [2,4,8]
              Output: 3.50000
              Explanation: merged array = [1,2,3,4,5,8] and median is (3 + 4) / 2 = 3.5.
              </p>
              <hr />
              <h3> Example-2 </h3>
              <hr />
              <p>
              Input: nums1 = [1,2,9], nums2 = [2,3,4]
              Output: 3
              Explanation: merged array = [1,2,3,4,9] and median is 3
              </p>
              <hr />
              <button className="code-button" onClick={() => handleCodeClick(3,[3],[1,2,9,2,3,4],[3.50000],[1,3,5,2,4,8],[4.50000],[1,3,4,5,7,8],[1],[1,1,1,1,1,1],[2],[-7,-5,-2,6,8,9])}>
                Code
              </button>
            </div>
          )}

          {toggleState === 4 && (
            <div className="content active-content">
               <h2>Find the Index of the First Occurrence in a String</h2>
              <hr />
              <p>
              Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

              take size of  haystack as 8 and needle as 3. take inputs as character array
              </p>
              <hr />
              <h3> Example-1</h3>
              <hr />
              <p>
              Input: haystack = "sadsadsa", needle = "sad"
              Output: 0
              Explanation: "sad" occurs at index 0 and 3.
              The first occurrence is at index 0, so we return 0.
              </p>
              <hr />
              <h3> Example-2 </h3>
              <hr />
              <p>
              Input: haystack = "leetcode", needle = "let"
              Output: -1
              Explanation: "let" did not occur in "leetcode", so we return -1.
              </p>
              <hr />
              <button className="code-button" onClick={() => handleCodeClick(4,[0],['s','a','d','s','a','d','s','a','s','a','d'],[-1],['l','e','e','t','c','o','d','e','l','e','t'],[4],['a','b','c','d','e','f','g','h','e','f','g'],[2],['a','b','c','c','c','c','c','c','c','c','c'],[-1],['a','a','a','a','a','a','a','a','b','b','b'])}>
                Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
