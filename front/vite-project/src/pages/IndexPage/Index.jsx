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
        const response=axios.get('http://localhost:8000/all_field_values/2023/diciembre/balance_general.resultado_ejercicio')
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
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="year" placeholder="John" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="month" placeholder="Doe" />

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="cuenta" placeholder="cuenta" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Index;