# AUTOGENERATED! DO NOT EDIT! File to edit: ../nbs/04_protein.ipynb.

# %% auto 0
__all__ = ['AF_display', 'pdbe_molstar']

# %% ../nbs/04_protein.ipynb 3
from fasthtml.common import *
from fasthtml.jupyter import *

from .core import *
from .static import *

import json
import pandas as pd

# %% ../nbs/04_protein.ipynb 4
def AF_display():
    "client side scripts"
    return Script(src="./imports/alphafold_display.js")

# %% ../nbs/04_protein.ipynb 5
def pdbe_molstar():
    "Headers"
    s1 = Link(rel='stylesheet', type='text/css', href='https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar-light.css')
    s2 = Script(type='text/javascript', src='https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar-plugin.js')
    s3 = Style(
        '''
          #myViewer {
            float: left;
            width: 1000px;
            height: 550px;
            position: relative;
            margin: 20px;
          }
          .msp-plugin ::-webkit-scrollbar-thumb {
            background-color: #474748 !important;
            border-radius: 10px;
          }
          .msp-right-panel { 
            display: none !important; 
          }
          #protein-form {
            margin: 20px;
          }
          
        '''
    )
    return [s1, s2, s3]