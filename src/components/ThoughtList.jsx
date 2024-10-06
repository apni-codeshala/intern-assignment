import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeThought, rehydrateThoughts } from "../redux/slices/thoughtSlice";
import "./ThoughtList.css";

const ThoughtList = () => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const dispatch = useDispatch();
    const selector = useSelector((store) => store.thoughts);

    useEffect(() => {
        // Rehydrate state from localStorage when component mounts
        dispatch(rehydrateThoughts());
    }, [dispatch]);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    return (
        <>
            {/* Toggle Theme Button at the top-left corner */}
            <button className="toggle-theme-btn top-left-btn" onClick={toggleTheme}>
                {isDarkTheme ? (
                    <span role="img" aria-label="light mode">☀️</span>
                ) : (
                    <span role="img" aria-label="dark mode">🌙</span>
                )}
            </button>

            <Link to={"/"} className="top-little-left-btn" onClick={toggleTheme}>
                New Thought
            </Link>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "100px", justifyContent: "space-evenly" }}>
                {selector.map((quote) => (
                    <div key={quote.id} className={`quote-container ${isDarkTheme ? "dark" : "light"}`}>
                        <div className="quote-box">
                            <p className="quote-text">"{quote.thought}"</p>
                        </div>
                        <div className="buttons">
                            <button className="new-quote-btn" onClick={() => dispatch(removeThought(quote.id))}>
                                Delete Quote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ThoughtList;
