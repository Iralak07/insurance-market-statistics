import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import SomeChart from '../../components/SomeChart/SomeChart';

const Index = () => {
    const [chartData, setChartData] = useState([]);
    const [names, setNames] = useState([]);
    const [monto, setMonto] = useState([]);
    const handleSubmit = async (values) => {
        const year=values.year;
        const month=values.month;
        const cuenta=values.cuenta;
        const response= await axios.get(`http://localhost:8000/all_field_values/${year}/${month}/${cuenta}`);
        setChartData(response.data);
        setNames(response.data[0]);
        setMonto(response.data[1]);
        console.log(response.data[0], response.data[1]);
        console.log(response.data);
    }
    return (
        <div style={{ width: "100vw", height: "100vh", background: "gray" }}>
            <Formik
                initialValues={{ year: '', month: '', cuenta: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="year">Year</label>
                    <Field id="yearField" name="year" placeholder="year" />

                    <label htmlFor="month">Month</label>
                    <Field id="monthField" name="month" placeholder="month" />

                    <label htmlFor="cuenta">Cuenta</label>
                    <Field id="cuentaField" name="cuenta" placeholder="cuenta" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <SomeChart data={chartData} />
        </div>      
    );
}

export default Index;