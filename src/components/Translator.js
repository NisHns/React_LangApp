import React, { useState } from "react";
import { options } from "./languageData";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import './Translator.css';

const Translator = () => {
    const [targetLang, setTargetLang] = useState("mr");
    const [resultText, setResultText] = useState("");
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [sourceLang, setSourceLang] = useState("en");

    const handleTranslate =
        async () => {
            setLoading(true);
            const url = "https://text-translator2.p.rapidapi.com/translate";
            const apiKey = "b87acf167dmshe61573f5ff92cc9p1219c8jsn0d95b571164e";
            const headers = {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
                "content-type": "application/x-www-form-urlencoded",
            };
            const data = {
                source_language: sourceLang,
                target_language: targetLang,
                text: textInput,
            };

            try {
                let response = await axios.post(url, data, { headers });
                const result = response.data;
                if (result.status === "success") {
                    let translatedText = result.data.translatedText;
                    setResultText(translatedText);
                } else {
                    alert("Error!!!");
                }
            } catch (error) {
                console.log(error);
                alert("Error occurred", error);
            } finally {
                setLoading(false);
            }
        };

    const handleSourceLangChange = (e) => {
        setSourceLang(e.target.value);
    };

    const handleTargetLangChange = (e) => {
        setTargetLang(e.target.value);
    };

    const handleTextChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleCopyTranslatedText = () => {
        navigator.clipboard.writeText(resultText);
        alert("Text Copied!");
    };

    return (
        <div className="container">
            <div className="translator-container">
                <h1 className="translator-header">Translator App</h1>
                <div className="select-language">
                    <select
                        id="source"
                        name="source"
                        onChange={handleSourceLangChange}
                        value={sourceLang}
                        className="custom-select"
                    >
                        {Object.entries(options).map(
                            ([languageName, languageCode]) => (
                                <option key={languageCode} value={languageCode}>
                                    {languageName}
                                </option>
                            )
                        )}
                    </select>
                </div>
                <textarea
                    id="text"
                    className="textarea-input"
                    value={textInput}
                    placeholder="Enter Text Here..."
                    onChange={handleTextChange}
                ></textarea>
                <div className="select-language">
                    <select
                        id="target"
                        name="target"
                        onChange={handleTargetLangChange}
                        value={targetLang}
                        className="custom-select"
                    >
                        {Object.entries(options).map(
                            ([languageName, languageCode]) => (
                                <option key={languageCode} value={languageCode}>
                                    {languageName}
                                </option>
                            )
                        )}
                    </select>
                    <button
                        className="translate-button"
                        onClick={handleTranslate}
                        disabled={loading}
                    >
                        {loading ? "Translating..." : "Translate"}
                    </button>
                </div>
                <div className="result-container">
                    <p className="translated-text">{resultText}</p>
                    <FaCopy
                        className="copy-icon"
                        onClick={handleCopyTranslatedText}
                    />
                </div>
            </div>
        </div>
    );
};

export default Translator;
