import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ChartComponent = () => {
    const [series, setSeries] =useState([]);
	const [categories, setCategories] = useState([]);

	

	const options = {
		chart: {
			type: 'bar',
			height: 350
		},
		plotOptions: {
			bar: {
				horizontal: false,
			},
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			categories: categories,
		},
	};

	return (
		<div id="chart">
			<ReactApexChart options={options} series={series} type="bar" height={350} />
		</div>
	);			
};

export default ChartComponent;
