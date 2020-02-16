import argparse

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    from google.cloud import storage
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )


# [START vision_face_detection]
def detect_faces(path):
    """Detects faces in an image."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    # [START vision_python_migration_face_detection]
    # [START vision_python_migration_image_file]
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)
    # [END vision_python_migration_image_file]

    response = client.face_detection(image=image)
    faces = response.face_annotations


    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    f = open("output.txt", "a+")
    f.write('Faces:\n')
    
    for face in faces:
        f.write('anger: {}\n'.format(likelihood_name[face.anger_likelihood]))
        f.write('joy: {}\n'.format(likelihood_name[face.joy_likelihood]))
        f.write('surprise: {}\n'.format(likelihood_name[face.surprise_likelihood]))

        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in face.bounding_poly.vertices])

        f.write('face bounds: {}'.format(','.join(vertices)))
        f.write('\n')
    f.close()
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    # [END vision_python_migration_face_detection]
# [END vision_face_detection]


# [START vision_safe_search_detection]
def detect_safe_search(path):
    """Detects unsafe features in the file."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    # [START vision_python_migration_safe_search_detection]
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.safe_search_detection(image=image)
    safe = response.safe_search_annotation

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    f = open("output.txt", "a+")
    f.write('Safe search:\n')

    f.write('adult: {}\n'.format(likelihood_name[safe.adult]))
    f.write('medical: {}\n'.format(likelihood_name[safe.medical]))
    f.write('spoofed: {}\n'.format(likelihood_name[safe.spoof]))
    f.write('violence: {}\n'.format(likelihood_name[safe.violence]))
    f.write('racy: {}\n'.format(likelihood_name[safe.racy]))
    f.close()
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    # [END vision_python_migration_safe_search_detection]
# [END vision_safe_search_detection]

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter)
    subparsers = parser.add_subparsers(dest='command')

    detect_faces_parser = subparsers.add_parser(
        'faces', help=detect_faces.__doc__)
    detect_faces_parser.add_argument('path')

    safe_search_parser = subparsers.add_parser(
        'safe-search', help=detect_safe_search.__doc__)
    safe_search_parser.add_argument('path')

    args = parser.parse_args()
    f = open("output.txt", "w")
    f.close()
    detect_faces(args.path)
    detect_safe_search(args.path)

    upload_blob("makeuoftimagesoutput", "output.txt", "facesandracy.txt")