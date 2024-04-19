import React, { useEffect, useState } from 'react';
import {
    Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';


const THEME = {
    HeaderRow: `
    font-size: 14px;

    background-color: #000000;
  `,
    Row: `
    font-size: 14px;

    &:nth-child(odd) {
      background-color: #808080;
    }

    &:nth-child(even) {
      background-color: #333333;
    }
  `,
};

const SomeTable = () => {
    const [tableData, setTableData] = useState([]);
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const theme = useTheme(THEME);

    useEffect(() => {
        if (year && month) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/exercise/${year}/${month}`);
                    setTableData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [year, month]);

    return (
        <div>
            <Formik
                initialValues={{ year:'', month:'' }}
                onSubmit={(values) => {
                    setYear(values.year);
                    setMonth(values.month);
                }}
            >
                <Form>
                    <label htmlFor="year">Year</label>
                    <Field id="year" name="year" placeholder="Enter year" />

                    <label htmlFor="month">Month</label>
                    <Field id="month" name="month" placeholder="Enter month" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            {year && month && (
            <Table data={{ nodes: tableData }} theme={theme}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Insurer Name</HeaderCell>
                                <HeaderCell>Total Assets</HeaderCell>
                                <HeaderCell>Total Liabilities</HeaderCell>
                                <HeaderCell>Capital Social</HeaderCell>
                                <HeaderCell>Result Exercise</HeaderCell>
                                <HeaderCell>Total Net Worth</HeaderCell>
                            </HeaderRow>
                        </Header>
                        <Body>
                            {tableList.map((item) => (
                                <Row key={item.exercise._id} item={item}>
                                    <Cell>{item.insurer_name}</Cell>
                                    <Cell>{item.exercise.balance_general.total_activos.$numberLong}</Cell>
                                    <Cell>{item.exercise.balance_general.total_pasivos.$numberLong}</Cell>
                                    <Cell>{item.exercise.balance_general.capital_social.$numberLong}</Cell>
                                    <Cell>{item.exercise.balance_general.resultado_ejercicio.$numberLong}</Cell>
                                    <Cell>{item.exercise.balance_general.total_patrimonio_neto.$numberLong}</Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
            )}
        </div>
    );
}

export default SomeTable;