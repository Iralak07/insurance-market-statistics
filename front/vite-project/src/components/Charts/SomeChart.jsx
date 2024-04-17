import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function SomeChart(props) {
    const [names, setNames] = useState([]);
    const [monto, setMonto] = useState([]);
    const series = [
        {
            name: "Monto",
            data: monto
        },
    ];
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: names
        }
    }
    useEffect(() => {
        setNames(props.data[0]);
        setMonto(props.data[1]);
    }, [props.data]);
    
    return(
        <div>
            <Chart options={options} type="bar" series={series} width="80%" />
        </div>
    );
}

export default SomeChart;