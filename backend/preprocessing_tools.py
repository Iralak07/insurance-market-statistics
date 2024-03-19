import pandas as pd

# Retrieves the value from a dataframe based on the given row value and column name.
def get_value_from_df(df, row_value, column_name):    
    try:
        row = df[df['Nombre de la Cuenta'] == row_value]
        return row[column_name].values[0]
    except (IndexError, KeyError):
        return "Error: Invalid row or column names. Please verify and try again."


# Create a new dataframe by extracting values from multiples dataframes.
def create_new_df(dfs, rows, columns):
    new_df = pd.DataFrame(rows, columns=["Nombre de la Cuenta"])
    
    for column in columns:
        new_df[column] = None

    for df in dfs:
        for i, row in enumerate(rows):
            for column in columns:
                # Get the value at the intersection of the row and column
                value = get_value_from_df(df, row, column)
                
                # If the value is not an error mmessage, assign it to the new dataframe
                if not isinstance(value, str):
                    new_df.at[i, column] = value

    return new_df

# Create a list containing a dataframe for every column
def generate_df_list(dfs, rows, columns):
    dfs_list = []

    for column in columns:
        new_df = pd.DataFrame(rows, columns=["Nombre de la Cuenta"])
        new_df[column] = None

        for df in dfs:
            for i, row in enumerate(rows):
                value = get_value_from_df(df, row, column)

                if not isinstance(value, str):
                    new_df.at[i, column] = value
       
        dfs_list.append(new_df)

    return dfs_list
    

def create_dict_from_df(df):
    new_dict = {}
    second_key = list(df.columns)[1]
    new_dict["Insurer"] = second_key

    for _, row in df.iterrows():
        new_dict[row['Nombre de la Cuenta']] = row[second_key]

    return new_dict


def transform_keys(input_dict):
    # Define a mapping from the old keys to the new keys
    key_mapping = {
        "Total de Activos": "total_activos",
        "Total de Pasivos": "total_pasivos",
        "Capital Social": "capital_social",
        "Resultado del Ejercicio": "resultado_ejercicio",
        "Total Patrimonio Neto": "total_patrimonio_neto",
        "Primas Directas": "primas_directas",
        "Primas Reaseguros Aceptados - Local": "primas_reaseguros_aceptados_local",
        "Siniestros Seguros Directos": "siniestros_seguros_directos",
        "Resultado Técnico Bruto [7]=[3]-[6]": "resultado_tecnico_bruto",
        "Gastos De Producción": "gastos_produccion",
        "Gastos De Cesión Reaseguros - Local": "gastos_cesion_reaseguros_local",
        "Gastos De Cesión Reaseguros - Exterior": "gastos_cesion_reaseguros_exterior",
        "Gastos Técnicos De Explotación": "gastos_tecnicos_explotacion",
        "Constitución De Previsiones": "constitucion_previsiones",
        "Resultado Técnico Neto [11]=[7]+[10]": "resultado_tecnico_neto",
        "Resultado Total del Ejercicio": "resultado_total_ejercicio",
        "Resultado del Ejercicio": "resultado_ejercicio"
    }

    # Create a new dictionary with the transformed keys
    output_dict = {key_mapping[key]: value for key, value in input_dict.items() if key in key_mapping}

    return output_dict
