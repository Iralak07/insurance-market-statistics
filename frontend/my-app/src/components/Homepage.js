import React, { useState } from 'react';
import DataTable from './DataTable';
import ChartComponent from './ChartComponent';
import axios from 'axios';

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

    const fetchAccountValue = (insurerId, year, month, account) => {
        fetch(`http://localhost:8000/field_value/${insurerId}/${year}/${month}/${field}`)
            .then(response => response)
            .catch(error => console.error(error))
    };

    const fetchData = () => {
        const response = axios.get(`/all_field_values/${year}/${month}/${field}`);
        console.log(response);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hola")
        console.log(year, month, field);

    };

    const handleInputChange = (event) => {
        setInsurerId(event.target.value);
    };

    const handleButtonClick = () => {
        fetchExercises(insurerId);
    };

    const handleChartButtonClick = () => {
        console.log("test")
        fetchData();
        setGenerateChart(true);
    };

    return (
        <div className="main">
            <h1 className="header">Welcome to the Homepage</h1>
            <input className="text-input" type="text" value={insurerId} onChange={handleInputChange} placeholder="Enter insurer ID" />
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input className="text-input" type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter year" />
                </label>
                <label>
                    Month:
                    <input className="text-input" type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Enter month" />
                </label>
                <label>
                    Field:
                    <input className="text-input" type="text" value={field} onChange={(e) => setField(e.target.value)} placeholder="Enter field" />
                </label>
            <button className="myButton" type="button" onClick={handleSubmit} >Generate Chart</button>
            </form>
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
