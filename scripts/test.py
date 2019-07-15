import sys 
import socket

import requests
import urllib.request

external_ip = urllib.request.urlopen('https://ident.me').read().decode('utf8')

print(external_ip)


hostname = socket.gethostname()    
IPAddr = socket.gethostbyname(hostname)    
print("Your Computer Name is:" + hostname)    
print("Your Computer IP Address (IPV4):" + IPAddr)    

dataToSendBack = "dataToSendBack"
print(dataToSendBack)
sys.stdout.flush()

print(dataToSendBack)
sys.stdout.flush()

for i in range(5):
    print({i:i})
    sys.stdout.flush()


ip = requests.get('https://api.ipify.org').text
print('My public IP address is:', ip)
sys.stdout.flush()

# # sys.stdout.flush()
# # Takes first name and last name via command  
# # line arguments and then display them
# print("First name: " + sys.argv[1]) 
# dataToSendBack = "dastas"
# print(dataToSendBack)
# sys.stdout.flush()
