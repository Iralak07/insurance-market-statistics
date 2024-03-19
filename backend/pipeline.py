import pandas as pd
import numpy as np
import openpyxl
from preprocessing_tools import get_value_from_df, create_new_df, generate_df_list, create_dict_from_df, transform_keys


file_path = "../MES.xlsx"
# Load spreadsheet
main_df = pd.ExcelFile(file_path)
# Load a every sheet into a dataframe by its name
dataframes_dic = {sheet_name: main_df.parse(sheet_name) for sheet_name in main_df.sheet_names}

# Separate the necesary elements of the dictionary into a different dataframe
balance_general = dataframes_dic['2']
estado_resultados = dataframes_dic['3']
ingresos_egresos = dataframes_dic['4']

# Hardcoding rows and columns names
rows = ["Total de Activos", "Total de Pasivos", "Capital Social", "Resultado del Ejercicio", "Total Patrimonio Neto", "Primas Directas", "Primas Reaseguros Aceptados - Local", 
        "Siniestros Seguros Directos", "Resultado Técnico Bruto [7]=[3]-[6]", "Gastos De Producción", "Gastos De Cesión Reaseguros - Local", "Gastos De Cesión Reaseguros - Exterior", 
        "Gastos Técnicos De Explotación", "Constitución De Previsiones", "Resultado Técnico Neto [11]=[7]+[10]", "Resultado Total del Ejercicio", "Resultado del Ejercicio"]

columns = ['El Comercio Paraguayo S.A. De Seguros', 'La Rural S.A. De Seguros', 'La Paraguaya S.A. De Seguros', 'Seguros Generales S. A. (Segesa)', 'Rumbos S.A. De Seguros', 
           'La Consolidada S.A. De Seguros', 'El Productor S.A. De Seguros Y Reaseguros', 'Atalaya S.A De Seguros Generales', 'La Independencia De Seguros Sociedad Anonima', 
           'Patria S.A. De Seguros Y Reaseguros', 'Alianza Garantía Seguros Y Reaseguros S.A.', 'Aseguradora Paraguaya S.A', 'Fénix S.A. De Seguros Y Reaseguros', 
           'Central S.A. De Seguros', 'Seguros Chaco S.A. De Seguros Y Reaseguros', 'El Sol Del Paraguay Compañía De Seguros Y Reaseguros', 'Intercontinental De Seguros Y Reaseguros S.A.', 
           'Seguridad S.A. Compañía De Seguros', 'Aseguradora Yacyreta S.A. De Seguros Y Reaseguros', 'La Agrícola S.A. De Seguros Y Reaseguros', 'Ueno Seguros S.A.', 'Cenit De Seguros S.A.', 
           'La Meridional Paraguaya S.A. De Seguros', 'Aseguradora Del Este S.A De Seguros Y Reaseguros', 'Regional S.A. De Seguros Y Reaseguros', 'Mapfre Paraguay Compañía De Seguros S.A.', 
           'Aseguradora Tajy Propiedad Cooperativa S.A. De Seguros', 'Panal Compañía De Seguros Generales S.A.', 'Sancor Seguros Del Paraguay S.A.', 'Royal Seguros S.A. Compañía De Seguros', 
           'Nobleza Seguros S.A. Compañia De Seguros', 'Itau Seguros Paraguay S.A.', 'Familiar Seguros S.A.', 'Atlas S.A. De Seguros']

dataframes = [balance_general, estado_resultados, ingresos_egresos]

df_list = generate_df_list(dataframes, rows, columns)

print(create_dict_from_df(df_list[0]))

print(transform_keys(create_dict_from_df(df_list[0])))
