import React, { useState, useRef, useEffect } from 'react';
import './App.css';


const App = () => {
  const [questions] = useState([
    { id: 1, video: 'https://share.synthesia.io/videos/57d388df-898c-4ca1-b047-516e86940f8c.mp4', choices: ['Bank Account Information', 'Loans'] },
    { id: 2, video: 'bank_account_info_video', choices: ['Open Bank Account', 'Fees', 'Type of Accounts', 'Close Bank Account'] },
    { id: 3, video: 'loans_video', choices: ['Offers', 'Documents Needed'] },
    { id: 4, video: 'documents_needed_video', choices: ['Mortgage Loan', 'Consumer Credit'] },
    { id: 5, video: 'test', choice: ['test', 'test']}
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure that videoRef.current is set before trying to access it
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentQuestionIndex]);

  const handleStartClick = () => {
    setCurrentQuestionIndex(1); 
  };

  const handleChoiceClick = (choice) => {
      // Special case for the first set of choices
      switch (choice) {
        case 'Bank Account Information':
          setCurrentQuestionIndex(2);
          break;
        case 'Loans':
          setCurrentQuestionIndex(3);
          break;
        case 'Documents Needed':
          setCurrentQuestionIndex(4);
          break;
        default:
          break;
      }
  };

  return (
    <div className="app">
      {currentQuestionIndex === 0 && (
        <div className="start-screen">
        <p className="welcome-text">Welcome to Al Barid Bank Interactive Guide</p>
        <div className="sponsors-container">
          <p className="sponsors-title">Sponsored by:</p>
          <div className="sponsors-logos">
            <img
              src="https://iconape.com/wp-content/files/ft/208885/svg/al-barid-bank.svg"
              alt="Al Barid Bank Logo"
              className="sponsor-logo"
            />
            <img
              src="https://static.wixstatic.com/media/57eace_fe90ede6ce264d39af27dc4878e75730~mv2.png/v1/fit/w_2500,h_1330,al_c/57eace_fe90ede6ce264d39af27dc4878e75730~mv2.png"
              alt="Annarabic Logo"
              className="sponsor-logo"
            />
          </div>
        </div>
        <button onClick={handleStartClick} className="start-button">
          Start
        </button>
      </div>
      )}

      {currentQuestionIndex > 0 && (
        <>
          <video ref={'videoRef'} controls autoPlay muted loop className="full-screen-video">
          <source src={questions[currentQuestionIndex - 1].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay">
            <div className="question-container">
              <h2>{`Get Started`}</h2>
              <div className="choices">
                {questions[currentQuestionIndex - 1].choices.map((choice, index) => (
                  <button key={index} onClick={() => handleChoiceClick(choice)}>
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
