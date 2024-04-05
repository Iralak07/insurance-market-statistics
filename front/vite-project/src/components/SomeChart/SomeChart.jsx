import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SomeChart = ({ chartData }) => {
    const [graphicData, setGraphicData] = useState(chartData)

    useEffect(() => {
        setGraphicData(chartData)
    }, [chartData])

    const chartOptions = {
        series: [{
            data: graphicData[1]
        }],
        chart: {
            type: 'bar',
            height: 400,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: graphicData[0],
        }
    }; 

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartOptions} series={graphicData[1]} type="bar" height={400} />
            </div>
            <div id="hrml-dist"></div>
        </div>
    );
}

export default SomeChart;