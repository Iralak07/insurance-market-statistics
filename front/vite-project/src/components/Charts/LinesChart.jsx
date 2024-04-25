import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Formik, Field, Form } from 'formik';
import axios from "axios";

function LineChart() {
    const [data, setData] = useState([]);
    const [cuenta, setCuenta] = useState('');

    const series = [
        {
            name: "Total Activos",
            data: data.map(item => item[cuenta] ? parseInt(item[cuenta]['$numberLong']) : 0).reverse()
        },
    ];
    const options = {
        chart: {
            id: "basic-line"
        },
        xaxis: {
            categories: data.map(item => `${item.year} ${item.month}`).reverse()
        }
    }

    const handleSubmit = async (values) => {
        const insurer_id = values.insurer_id;
        setCuenta(values.cuenta);
        const response = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta}`);
        setData(response.data.results);
    }

    return(
        <div style={{ width: "100vw", height: "100vh", background: "white" }}>
            <Formik
                initialValues={{ insurer_id: '', cuenta: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="insurer_id">Insurer ID</label>
                    <Field id="insurer_idField" name="insurer_id" placeholder="Insurer ID" />

                    <label htmlFor="cuenta">Cuenta</label>
                    <Field id="cuentaField" name="cuenta" placeholder="Cuenta" />

                    <button type="submit">Fetch Data</button>
                </Form>
            </Formik>
            <Chart options={options} series={series} type="line" width="80%" />
        </div>
    );
}

export default LineChart;