#!/usr/bin/python3

import xml.etree.ElementTree as ET
import json
import urllib.request

currency_url = 'https://www.currency-iso.org/dam/downloads/lists/list_one.xml'

def build_currency(res_path):
  with urllib.request.urlopen(currency_url) as response, open(res_path, 'w') as res_file:
    xml = response.read()
    root = ET.fromstring(xml)
    res_json = json.dump(list(set([entry.text for entry in root.iter('Ccy')])), res_file, indent=2)

if __name__ == '__main__':
  import sys
  args = sys.argv
  path = args[1] if len(args) > 1 else 'res.json'
  build_currency(path)
