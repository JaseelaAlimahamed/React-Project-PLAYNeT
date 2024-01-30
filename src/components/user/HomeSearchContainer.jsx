import React from 'react';
import backgroundImage from './images/footballpic.jpg';
import { useState, useEffect,} from 'react';
import {useNavigate} from 'react-router-dom'

function Typewriter({ text }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let timeout;
        let index = 0;

        const animateText = () => {
            setDisplayText((prevText) => prevText + text.charAt(index));
            index++;
            if (index < text.length) {
                timeout = setTimeout(animateText, 60);
            }
        };
        animateText();

        return () => clearTimeout(timeout);
    }, [text]);

    return <h2 className="text-white text-5xl font-bold tracking-wider my-5">{displayText}</h2>;
}

function HomeSearchContainer() {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };
    const handleGoClick = () => {
        if (selectedDistrict) {
            const url = `/venue/district/${selectedDistrict}`;
            navigate(url);
        }
    };
    
    
    return (
        <div className="relative">
            <img src={backgroundImage} className="w-full h-fit" alt="Background" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
                <Typewriter text="YOOUR NEAREST SPORTS DESTINATION" />
                <div className="mt-5 py-5 mx-4">
                    <select
                        className="w-64 md:w-80 sm:w-40 h-10 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={handleDistrictChange}
                    >
                        <option value="">Select a district</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kasaragod">Kasaragod</option>
                    </select>
                    <button
                        className="ml-2 bg-green-900 text-white py-2 px-4 rounded-md"
                        onClick={handleGoClick}
                    >Go
                    </button>

                </div>
            </div>
        </div>
    );
}

export default HomeSearchContainer;
