import requests

# Making a GET request
# r = requests.get('http://127.0.0.1:8000')

# Making a HEAD request
r = requests.head("http://localhost:8000/api/comment/64e8b48d5e0da56989e67c5f")

# check status code for response received
print(r.status_code, r.reason)

# print headers of request
print(r.headers)

# checking if request contains any content
print(r.content)
