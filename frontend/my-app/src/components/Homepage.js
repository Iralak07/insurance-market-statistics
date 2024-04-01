import React, { useState } from 'react';
import DataTable from './DataTable';
import TestChart from './TestChart';
import ChartComponent from './ChartComponent';

function Homepage() {
    const [insurerId, setInsurerId] = useState(null);
	const [insurersData, setInsurersData] = useState(null);
	const [exercisesData, setExercisesData] = useState(null);
	const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [field, setField] = useState('');
    const [generateChart, setGenerateChart] = useState(false);

	const fetchInsurers = () => {
		fetch('http://localhost:8000/insurer')
		.then(response => response.json())
		.then(data => setInsurersData(data))
		.catch(error => console.error(error))
	};

	const fetchExercises = (insurerId) => {
		fetch(`http://localhost:8000/exercise/${insurerId}`)
		.then(response => response.json())
		.then(data => setExercisesData(data))
		.catch(error => console.error(error));
	};

    const handleInputChange = (event) => {
        setInsurerId(event.target.value);
    };

    const handleButtonClick = () => {
        fetchExercises(insurerId);
    };

	const handleChartButtonClick = () => {
        setGenerateChart(true);
    };

	return (
        <div className="main">
            <h1 className="header">Welcome to the Homepage</h1>
            <button className="myButton" onClick={fetchInsurers}>Get Insurers</button>
            <input className="text-input" type="text" value={insurerId} onChange={handleInputChange} placeholder="Enter insurer ID" />
            <button className="myButton" onClick={handleButtonClick}>Get Exercises</button>
            <input className="text-input" type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="Enter year" />
            <input className="text-input" type="text" value={month} onChange={e => setMonth(e.target.value)} placeholder="Enter month" />
            <input className="text-input" type="text" value={field} onChange={e => setField(e.target.value)} placeholder="Enter field" />
            <button className="myButton" onClick={handleChartButtonClick}>Generate Chart</button>
            {insurersData && generateChart && (
                <div>
                    <h2>Insurers Data:</h2>
                    <pre>{JSON.stringify(insurersData, null, 2)}</pre>
                    <ChartComponent insurers={insurersData} year={year} month={month} field={field} /> {/* Use the ChartComponent */}
                </div>
            )}
            {exercisesData && (
                <div>
                    <h2>Exercises Data:</h2>
                    <pre>{JSON.stringify(exercisesData, null, 2)}</pre>
                    <DataTable className="data-table" data={exercisesData} />
                </div>
            )}
        </div>
    );
}

export default Homepage;
