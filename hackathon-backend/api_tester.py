import requests

url = 'http://localhost:8888/llm-query/'
headers = {'Content-Type': 'application/json'}
data = {"query": "what is the layout"}

response = requests.post(url, headers=headers, json=data)

print(response.json())