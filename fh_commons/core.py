"""Fill in a module description here"""

# AUTOGENERATED! DO NOT EDIT! File to edit: ../nbs/00_core.ipynb.

# %% auto 0
__all__ = ['bootstrap_hdrs', 'datatable_hdrs', 'cond_pico_hdrs', 'copy_js', 'autocomplete_js', 'download_js', 's', 'start_ngrok',
           'htmx', 'p']

# %% ../nbs/00_core.ipynb 3
from fasthtml.common import *
from fasthtml.jupyter import *
from IPython.display import HTML

from pyngrok import ngrok

# for magic
from IPython import get_ipython
from IPython.core.magic import register_cell_magic
import ast

# %% ../nbs/00_core.ipynb 6
def bootstrap_hdrs(include_icon=True):
    css = Link(href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', rel='stylesheet')
    js = Script(src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js')
    icon = Link(href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css', rel='stylesheet')
    return [css,js,icon] if include_icon else [css,js]

# %% ../nbs/00_core.ipynb 8
def datatable_hdrs():
    dt_s1 = Script(src='https://code.jquery.com/jquery-3.7.1.js')
    dt_s2 = Script(src='https://cdn.datatables.net/2.1.5/js/dataTables.js')
    dt_s3=Script(src='https://cdn.datatables.net/2.1.5/js/dataTables.bootstrap5.js')
    dt_c1 = Link(rel='stylesheet',href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css')
    dt_c2 = Link(rel='stylesheet',href='https://cdn.datatables.net/2.1.5/css/dataTables.bootstrap5.css')
    return [dt_s1,dt_s2,dt_s3,dt_c1,dt_c2]

# %% ../nbs/00_core.ipynb 10
def cond_pico_hdrs():
    conditional_pico = Link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.conditional.min.css')
    return [conditional_pico]

# %% ../nbs/00_core.ipynb 12
def copy_js():
    script_copy_button=Script(src="./imports/copy_button.js")
    return [script_copy_button]

# %% ../nbs/00_core.ipynb 14
def autocomplete_js():
    jquery = Script(src='https://code.jquery.com/jquery-3.6.0.min.js')
    script_autocomplete = Script(src='./imports/autocomplete.js')
    return [jquery,script_autocomplete]

# %% ../nbs/00_core.ipynb 16
def download_js():
    download_script = Script(src='./imports/download_csv_svg.js')
    return [download_script]

# %% ../nbs/00_core.ipynb 19
@register_cell_magic
def s(line, cell):
    # Parse the line argument to check for a 'debug' flag
    debug = 'debug' in line.lower()
    
    # Parse the cell content into an AST
    tree = ast.parse(cell)
    
    # Collect all expressions
    expressions = [node.value for node in tree.body if isinstance(node, ast.Expr)]
    
    # If there are expressions, wrap them all in a single show() call
    if expressions:
        show_call = ast.Expr(
            ast.Call(
                func=ast.Name(id='show', ctx=ast.Load()),
                args=expressions,
                keywords=[]
            )
        )
        # Replace the original expressions with the single show() call
        tree.body = [node for node in tree.body if not isinstance(node, ast.Expr)] + [show_call]
    
    # Convert the modified AST back to source code
    modified_code = ast.unparse(tree)
    
    # If debug is True, print the modified code
    if debug:
        print("Modified code:")
        print(modified_code)
    
    # Execute the modified code
    get_ipython().run_cell(modified_code)

# %% ../nbs/00_core.ipynb 24
def start_ngrok(token,port=8000):
    
    # Get token from ngrok.com --> login --> Your Authtoken
    ngrok.set_auth_token(token)
    
    # Start a tunnel on port
    ngrok_tunnel = ngrok.connect(port)
    
    # Return the public URL
    return ngrok_tunnel.public_url

# %% ../nbs/00_core.ipynb 28
def htmx(url,path='',height='auto'):
    "An iframe which displays the HTMX application in a notebook."
    return HTML(f'<iframe src="{url}{str(path)}" style="width: 100%; height: {height}; border: none;" ' + """onload="{
        let frame = this;
        window.addEventListener('message', function(e) {
            if (e.data.height) frame.style.height = (e.data.height+1) + 'px';
        }, false);
    }" allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; display-capture; encrypted-media; fullscreen; gamepad; geolocation; gyroscope; hid; identity-credentials-get; idle-detection; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; screen-wake-lock; serial; usb; web-share; xr-spatial-tracking"></iframe> """)

# %% ../nbs/00_core.ipynb 35
@register_cell_magic
def p(line, cell):
    # Parse the line argument to check for a 'debug' flag
    debug = 'debug' in line.lower()
    
    # Parse the cell content into an AST
    tree = ast.parse(cell)
    
    # Collect all expressions
    expressions = [node.value for node in tree.body if isinstance(node, ast.Expr)]
    
    # If there are expressions, wrap them all in a single show() call
    if expressions:
        show_call = ast.Expr(
            ast.Call(
                func=ast.Name(id='push', ctx=ast.Load()),
                args=expressions,
                keywords=[]
            )
        )
        # Replace the original expressions with the single show() call
        tree.body = [node for node in tree.body if not isinstance(node, ast.Expr)] + [show_call]
    
    # Convert the modified AST back to source code
    modified_code = ast.unparse(tree)
    
    # If debug is True, print the modified code
    if debug:
        print("Modified code:")
        print(modified_code)
    
    # Execute the modified code
    get_ipython().run_cell(modified_code)