import React, { useState } from 'react';
import ChartComponent from './ChartComponent';

function ChartPage() {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [field, setField] = useState('');
	const [showChart, setShowChart] = useState(false);

	const handleButtonClick = () => {
		setShowChart(true);
	};

	return (
		<div className="chart-page">
			<h1>ChartPage</h1>
			<input type="text" placeholder="Year" onChange={(e) => setYear(e.target.value)} />
			<input type="text" placeholder="Month" onChange={(e) => setMonth(e.target.value)} />
			<input type="text" placeholder="Field" onChange={(e) => setField(e.target.value)} />
			<button onClick={handleButtonClick}>Show Chart</button>
			{showChart && <ChartComponent year={year} month={month} field={field} />}
		</div>
	);
}

export default ChartPage;

