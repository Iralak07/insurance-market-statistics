import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ChartComponent = ({ year, month, field }) => {
    const [series, setSeries] =useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get(`/all_field_values/${year}/${month}/${field}`)
		.then(response => {
			const data = response.data;
			const insurers = data.map(item => item.insurer_name);
			const values = data.map(item => Number(item.value.$numberLong));
			setSeries([{ data: values }]);
			setCategories(insurers);
		})
		.catch(error => {
			console.error('There was an error!', error);
		});
	}, [year, month, field]);

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
