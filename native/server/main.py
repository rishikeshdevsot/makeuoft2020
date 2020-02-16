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
bucket = client.get_bucket('makeuoftimagesinput')
# blob = bucket.blob('makeuoft_out1.jpgoutput-1-to-1.json')
# # blob.download_to_filename('file1')
# print(file_obj)

while(True):
    data = {
        "Status" : "https://storage.cloud.google.com/makeuoftimagesinput/makeuoft_sample1.jpg"
    }
    result = firebase.post('users/', data)
    print(result)
    time.sleep(3)

# for blob in client.list_blobs(bucket):
#     #https://cloud.google.com/storage/docs/viewing-editing-metadata#storage-view-object-metadata-python
#     print('https://storage.cloud.google.com/makeuoftimagesinput/' + blob.name)
#     # with open('1.txt', "w") as file_obj:
#     #     client.download_blob_to_file(blob, file_obj)  # API request.
#         # print(file_obj)
#         #https://storage.cloud.google.com/makeuoftimagesinput/
#     data = {
#         "Status" : "unseen"
#     }

#     result = firebase.post('users/', data)
#     print(result)
