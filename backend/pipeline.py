import pandas as pd
import numpy as np
import openpyxl
from preprocessing_tools import (
        get_value_from_df, create_new_df, generate_df_list, create_dict_from_df,
        transform_keys, add_insurer_id, add_date_info, restructure_data,
        format_for_mongodb)
from config import FILE_PATH, ROWS, COLUMNS


def load_excel_sheets(file_path: str) -> dict:
        # Load spreadsheet
        main_df = pd.ExcelFile(file_path)
        # Load every sheet into a dataframe by its name
        dataframes_dic = {sheet_name: main_df.parse(sheet_name) for sheet_name in main_df.sheet_names}
        return dataframes_dic


def extract_dataframes(dataframes_dic: dict) -> list:
        # Separate the necessary elements of the dictionary into different dataframes
        balance_general = dataframes_dic['2']
        estado_resultados = dataframes_dic['3']
        ingresos_egresos = dataframes_dic['4']
        dataframes = [balance_general, estado_resultados, ingresos_egresos]
        return dataframes

dataframes_dic = load_excel_sheets(FILE_PATH)
dataframes = extract_dataframes(dataframes_dic)
df_list = generate_df_list(dataframes, ROWS, COLUMNS)
df = df_list[2]

def process_data(dataframe, year: int, month: str, rows: list = ROWS, columns: list = COLUMNS):   
        new_dict = transform_keys(create_dict_from_df(dataframe))
        new_dict = add_insurer_id(new_dict)
        new_dict = add_date_info(new_dict, year, month)
        new_dict = restructure_data(new_dict)
        new_json = format_for_mongodb(new_dict)
        return new_json


if __name__ == "__main__":
        print(process_data(df, 2024, "enero"))
    