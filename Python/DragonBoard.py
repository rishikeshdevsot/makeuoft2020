import sys
from bluetooth import *

print("Searching for nearby bluetooth devices...")

nearby_devices = discover_devices(lookup_names=True)

print("Found %d devices"%len(nearby_devices))

target_addr="HomeAnalyzer"
target_name=None
for name, addr in nearby_devices:
     print ("\t%s - %s"%(addr,name))
     if(addr==target_addr):
        target_name=name
        break

if(target_name!=None):
    print("Found %s: %s"%(target_addr,target_name))

    host=target_name       # The remote host
    port=3                  # Server port
    #port=7777                  # Server port

    s=BluetoothSocket(RFCOMM)

    #s.connect((host,PORT_ANY))
    s.connect((host,port))

    while True :
       message=raw_input('Send:')
       if not message : break   # Error sening data
       s.send(message)
       data=s.recv(1024)
       print('Received',data)
    s.close()



