import React, { useState } from 'react';

function Homepage() {
    const [insurerId, setInsurerId] = useState(null);
	const [insurersData, setInsurersData] = useState(null);
	const [exercisesData, setExercisesData] = useState(null);

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
		.catch(error => console.server(error));
	};

    const handleInputChange = (event) => {
        setInsurerId(event.target.value);
    };

    const handleButtonClick = () => {
        fetchExercises(insurerId);
    };

	return (
		<div>
			<h1>Welcome to the Homepage</h1>
			<button onClick={fetchInsurers}>Get Insurers</button>
            <input type="text" value={insurerId} onChange={handleInputChange} placeholder="Enter insurer ID" />
			<button onClick={handleButtonClick}>Get Exercises</button>
			{insurersData && (
				<div>
					<h2>Insurers Data:</h2>
					<pre>{JSON.stringify(insurersData, null, 2)}</pre>
				</div>
			)}
			{exercisesData && (
				<div>
					<h2>Exercises Data:</h2>
					<pre>{JSON.stringify(exercisesData, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}

export default Homepage;
