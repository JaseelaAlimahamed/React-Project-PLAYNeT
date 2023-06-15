import React from 'react';
import backgroundImage from './images/footballpic.jpg';
import { useState, useEffect } from 'react';

function Typewriter({ text }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let timeout;
        let index = 0;

        const animateText = () => {
            setDisplayText((prevText) => prevText + text.charAt(index));
            index++;
            if (index < text.length) {
                timeout = setTimeout(animateText,60);
            }
        };
        animateText();

        return () => clearTimeout(timeout);
    }, [text]);

    return <h2 className="text-white text-5xl font-bold tracking-wider my-5">{displayText}</h2>;
}

function HomeSearchContainer() {
    return (
        <div className="relative">
            <img src={backgroundImage} className="w-full h-fit" alt="Background" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
                <Typewriter text="YOOUR NEAREST SPORTS DESTINATION" />
                <div className="mt-5 py-5 mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 md:w-80 sm:w-40 h-10 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="ml-2 bg-green-900 text-white py-2 px-4 rounded-md">
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomeSearchContainer;
