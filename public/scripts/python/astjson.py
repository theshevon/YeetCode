import ast
from ast2json import ast2json
import json

obj = ast2json(ast.parse(open('public/scripts/python/script.py').read()))
print(json.dumps(obj,indent=4))
