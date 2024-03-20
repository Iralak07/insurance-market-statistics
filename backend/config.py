from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

# File paths
FILE_PATH = './MES.xlsx'

# Database URIs
MONGODB_URI = os.getenv("MONGODB_URI")

# Hardcoding rows and columns names
ROWS = ["Total de Activos", "Total de Pasivos", "Capital Social", "Resultado del Ejercicio", "Total Patrimonio Neto", "Primas Directas", "Primas Reaseguros Aceptados - Local", 
        "Siniestros Seguros Directos", "Resultado Técnico Bruto [7]=[3]-[6]", "Gastos De Producción", "Gastos De Cesión Reaseguros - Local", "Gastos De Cesión Reaseguros - Exterior", 
        "Gastos Técnicos De Explotación", "Constitución De Previsiones", "Resultado Técnico Neto [11]=[7]+[10]", "Resultado Total del Ejercicio", "Resultado del Ejercicio"]

COLUMNS = ['El Comercio Paraguayo S.A. De Seguros', 'La Rural S.A. De Seguros', 'La Paraguaya S.A. De Seguros', 'Seguros Generales S. A. (Segesa)', 'Rumbos S.A. De Seguros', 
           'La Consolidada S.A. De Seguros', 'El Productor S.A. De Seguros Y Reaseguros', 'Atalaya S.A De Seguros Generales', 'La Independencia De Seguros Sociedad Anonima', 
           'Patria S.A. De Seguros Y Reaseguros', 'Alianza Garantía Seguros Y Reaseguros S.A.', 'Aseguradora Paraguaya S.A', 'Fénix S.A. De Seguros Y Reaseguros', 
           'Central S.A. De Seguros', 'Seguros Chaco S.A. De Seguros Y Reaseguros', 'El Sol Del Paraguay Compañía De Seguros Y Reaseguros', 'Intercontinental De Seguros Y Reaseguros S.A.', 
           'Seguridad S.A. Compañía De Seguros', 'Aseguradora Yacyreta S.A. De Seguros Y Reaseguros', 'La Agrícola S.A. De Seguros Y Reaseguros', 'Ueno Seguros S.A.', 'Cenit De Seguros S.A.', 
           'La Meridional Paraguaya S.A. De Seguros', 'Aseguradora Del Este S.A De Seguros Y Reaseguros', 'Regional S.A. De Seguros Y Reaseguros', 'Mapfre Paraguay Compañía De Seguros S.A.', 
           'Aseguradora Tajy Propiedad Cooperativa S.A. De Seguros', 'Panal Compañía De Seguros Generales S.A.', 'Sancor Seguros Del Paraguay S.A.', 'Royal Seguros S.A. Compañía De Seguros', 
           'Nobleza Seguros S.A. Compañia De Seguros', 'Itau Seguros Paraguay S.A.', 'Familiar Seguros S.A.', 'Atlas S.A. De Seguros']