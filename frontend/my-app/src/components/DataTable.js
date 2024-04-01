import React from 'react';
import { useTable } from 'react-table';

function DataTable({ data }) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Year',
                accessor: 'year',
            },
            {
                Header: 'Month',
                accessor: 'month',
            },
            {
                Header: 'Insurer ID',
                accessor: 'insurer_id',
            },
            {
                Header: 'Total Assets',
                accessor: 'balance_general.total_activos.$numberLong',
            },
            {
                Header: 'Total Liabilities',
                accessor: 'balance_general.total_pasivos.$numberLong',
            },
            {
                Header: 'Capital Social',
                accessor: 'balance_general.capital_social.$numberLong',
            },
            {
                Header: 'Result Exercise',
                accessor: 'balance_general.resultado_ejercicio.$numberLong',
            },
            {
                Header: 'Total Net Worth',
                accessor: 'balance_general.total_patrimonio_neto.$numberLong',
            },
            {
                Header: 'Direct Premiums',
                accessor: 'estado_resultado.primas_directas.$numberLong',
            },
            {
                Header: 'Local Reinsurance Premiums',
                accessor: 'estado_resultado.primas_reaseguros_aceptados_local.$numberInt',
            },
            {
                Header: 'Direct Insurance Claims',
                accessor: 'estado_resultado.siniestros_seguros_directos.$numberLong',
            },
            {
                Header: 'Gross Technical Result',
                accessor: 'estado_resultado.resultado_tecnico_bruto.$numberLong',
            },
            {
                Header: 'Production Costs',
                accessor: 'estado_resultado.gastos_produccion.$numberLong',
            },
            {
                Header: 'Local Reinsurance Costs',
                accessor: 'estado_resultado.gastos_cesion_reaseguros_local.$numberInt',
            },
            {
                Header: 'Foreign Reinsurance Costs',
                accessor: 'estado_resultado.gastos_cesion_reaseguros_exterior.$numberInt',
            },
            {
                Header: 'Technical Exploitation Costs',
                accessor: 'estado_resultado.gastos_tecnicos_explotacion.$numberLong',
            },
            {
                Header: 'Provisions Constitution',
                accessor: 'estado_resultado.constitucion_previsiones.$numberInt',
            },
            {
                Header: 'Net Technical Result',
                accessor: 'estado_resultado.resultado_tecnico_neto.$numberLong',
            },
            {
                Header: 'Total Exercise Result',
                accessor: 'estado_resultado.resultado_total_ejercicio.$numberLong',
            },
            {
                Header: 'Exercise Result',
                accessor: 'ingresos_egresos.resultado_ejercicio.$numberLong',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: '100%', margin: '20px 0' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default DataTable;