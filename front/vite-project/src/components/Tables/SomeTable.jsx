import React from 'react';
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

const list = [
    {
        id: '1',
        name: 'VSCode',
        deadline: new Date(2020, 1, 17),
        type: 'SETUP',
        isComplete: true,
    },
    {
        id: '2',
        name: 'JavaScript',
        deadline: new Date(2020, 2, 28),
        type: 'LEARN',
        isComplete: true,
    },
    {
        id: '3',
        name: 'React',
        deadline: new Date(2020, 3, 8),
        type: 'LEARN',
        isComplete: false,
    }
];

const insurers_data = [
    {
        "_id": "660c2bb0beac9a9929e066c0",
        "year": 2023,
        "month": "noviembre",
        "insurer_id": "801",
        "balance_general": {
            "total_activos": {
                "$numberLong": "148009517553"
            },
            "total_pasivos": {
                "$numberLong": "79743059923"
            },
            "capital_social": {
                "$numberLong": "39009200000"
            },
            "resultado_ejercicio": {
                "$numberLong": "3625799360"
            },
            "total_patrimonio_neto": {
                "$numberLong": "68266457630"
            }
        },
        "estado_resultado": {
            "primas_directas": {
                "$numberLong": "31770815530"
            },
            "primas_reaseguros_aceptados_local": {
                "$numberInt": "183240259"
            },
            "siniestros_seguros_directos": {
                "$numberLong": "16556046281"
            },
            "resultado_tecnico_bruto": {
                "$numberLong": "9359893820"
            },
            "gastos_produccion": {
                "$numberLong": "3290032091"
            },
            "gastos_cesion_reaseguros_local": {
                "$numberInt": "0"
            },
            "gastos_cesion_reaseguros_exterior": {
                "$numberInt": "726929968"
            },
            "gastos_tecnicos_explotacion": {
                "$numberLong": "9481494150"
            },
            "constitucion_previsiones": {
                "$numberInt": "1556148802"
            },
            "resultado_tecnico_neto": {
                "$numberLong": "1713477892"
            },
            "resultado_total_ejercicio": {
                "$numberLong": "3625799360"
            }
        },
        "ingresos_egresos": {
            "resultado_ejercicio": {
                "$numberLong": "3625799360"
            }
        }
    },
    {
        "_id": "660c2c2fbeac9a9929e066e2",
        "year": 2023,
        "month": "octubre",
        "insurer_id": "801",
        "balance_general": {
            "total_activos": {
                "$numberLong": "147092285880"
            },
            "total_pasivos": {
                "$numberLong": "79891958155"
            },
            "capital_social": {
                "$numberLong": "39009200000"
            },
            "resultado_ejercicio": {
                "$numberLong": "2559669455"
            },
            "total_patrimonio_neto": {
                "$numberLong": "67200327725"
            }
        },
        "estado_resultado": {
            "primas_directas": {
                "$numberLong": "24891566448"
            },
            "primas_reaseguros_aceptados_local": {
                "$numberInt": "153878148"
            },
            "siniestros_seguros_directos": {
                "$numberLong": "13949663182"
            },
            "resultado_tecnico_bruto": {
                "$numberLong": "6925448260"
            },
            "gastos_produccion": {
                "$numberLong": "2536859972"
            },
            "gastos_cesion_reaseguros_local": {
                "$numberInt": "0"
            },
            "gastos_cesion_reaseguros_exterior": {
                "$numberInt": "580448636"
            },
            "gastos_tecnicos_explotacion": {
                "$numberLong": "7591448557"
            },
            "constitucion_previsiones": {
                "$numberInt": "1322578209"
            },
            "resultado_tecnico_neto": {
                "$numberLong": "854860064"
            },
            "resultado_total_ejercicio": {
                "$numberLong": "2559669455"
            }
        },
        "ingresos_egresos": {
            "resultado_ejercicio": {
                "$numberLong": "2559669455"
            }
        }
    },

]

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

    const theme = useTheme(THEME);

    const data = { nodes: insurers_data };

    return (
        <Table data={data} theme={theme}>
            {(tableList) => (
                <>
                    <Header>
                        <HeaderRow>
                            <HeaderCell>Year</HeaderCell>
                            <HeaderCell>Month</HeaderCell>
                            <HeaderCell>Insurer ID</HeaderCell>
                            <HeaderCell>Total Assets</HeaderCell>
                            <HeaderCell>Total Liabilities</HeaderCell>
                            <HeaderCell>Capital Social</HeaderCell>
                            <HeaderCell>Result Exercise</HeaderCell>
                            <HeaderCell>Total Net Worth</HeaderCell>
                        </HeaderRow>
                    </Header>
                    <Body>
                        {tableList.map((item) => (
                            <Row key={item.id} item={item}>
                                <Cell>{item.year}</Cell>
                                <Cell>{item.month}</Cell>
                                <Cell>{item.insurer_id}</Cell>
                                <Cell>{item.balance_general.total_activos.$numberLong}</Cell>
                                <Cell>{item.balance_general.total_pasivos.$numberLong}</Cell>
                                <Cell>{item.balance_general.capital_social.$numberLong}</Cell>
                                <Cell>{item.balance_general.resultado_ejercicio.$numberLong}</Cell>
                                <Cell>{item.balance_general.total_patrimonio_neto.$numberLong}</Cell>
                            </Row>
                        ))}
                    </Body>
                </>
            )}
        </Table>
    );
};


export default SomeTable;