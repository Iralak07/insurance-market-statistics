import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ChartComponent = ({ insurers, year, month, field }) => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fecthFieldValues = async () => {
            const seriesData = await Promise.all(insurers.map(async (insurer) => {
                const response = await axios.get(`/field_value/${insurer.id}/${year}/${month}/${field}`);
                return {
                    name: insurer.name,
                    data: [response.data.value]
                };
            }));
            setSeries(seriesData);
        };
        fecthFieldValues();
    }, [insurers, year, month, field]);
    
    const options = {
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: insurers.map(insurer => insurer.name)
        }
    };
    
    return <ReactApexChart options={options} series={series} type="bar" />;
};

export default ChartComponent;