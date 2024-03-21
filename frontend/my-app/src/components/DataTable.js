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
            // Add more columns as needed...
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