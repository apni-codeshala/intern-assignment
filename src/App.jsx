import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addThought } from "./redux/slices/thoughtSlice";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [quote, setQuote] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((store) => store.thoughts);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Oops! Something went wrong.");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const generateRandomId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const saveThought = () => {
    const id = generateRandomId(10);
    console.log(id, quote)
    dispatch(addThought({ id, quote }));
  };

  return (
    <div className={`quote-container ${isDarkTheme ? "dark" : "light"}`}>
      {/* Toggle Theme Button at the top-left corner */}
      <button className="toggle-theme-btn top-left-btn" onClick={toggleTheme}>
        {isDarkTheme ? (
          <span role="img" aria-label="light mode">☀️</span>
        ) : (
          <span role="img" aria-label="dark mode">🌙</span>
        )}
      </button>

      <Link to={"/saved-thoughts"} className="top-little-left-btn" onClick={toggleTheme}>
        Save thoughts
      </Link>

      <div className="quote-box">
        <p className="quote-text">"{quote}"</p>
      </div>
      <div className="buttons">
        <button className="new-quote-btn" onClick={fetchQuote}>
          New Quote
        </button>
        <button className="new-quote-btn" onClick={saveThought}>
          Save Thought
        </button>
      </div>
    </div>
  );
}

export default App;
