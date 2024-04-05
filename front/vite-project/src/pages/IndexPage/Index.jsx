import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";

const Index = () => {
    const [chartData, setChartData] = useState([])
    const [names, setNames] = useState([])
    const [monto, setMonto] = useState([])
    const handleSubmit= (values) => {
        const year=values.year
        const month=values.month
        const cuenta=values.cuenta
        const response=axios.get(`http://localhost:8000/all_field_values/${year}/${month}/${cuenta}`)
        setChartData(response.data)
        console.log(response);
    }
    return (
        <div style={{background: "red"}}>
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
        </div>
    );
}

export default Index;