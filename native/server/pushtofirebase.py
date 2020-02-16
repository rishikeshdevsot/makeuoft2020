from firebase import firebase
import requests
from google.cloud import storage
from google.cloud import pubsub_v1
import time


firebase = firebase.FirebaseApplication("https://makeuoft2020-268400.firebaseio.com/", None)


##################POST
# print("now going to send push notification")
# # defining the api-endpoint  
# API_ENDPOINT = "https://exp.host/--/api/v2/push/send"
  
# # data to be sent to api 
# data = {
#   "to": "ExponentPushToken[uh3CDsJFxY_vTcV_n0wUHM]",
#   "title":"hello",
#   "body": "world"
# } 
  
# # sending post request and saving response as response object 
# r = requests.post(url = API_ENDPOINT, data = data) 

# #################GET
client = storage.Client()
bucket = client.get_bucket('makeuoftimagesoutput')

while(True):
    with open('1.txt', "r+") as file_obj:
        blob = bucket.blob('facesandracy.txt')
        client.download_blob_to_file(blob, file_obj)  # API request.
        data = {
            "hello" : (file_obj).readlines()
        }
        result = firebase.post('users/01', (file_obj).readlines())
    time.sleep(3)
