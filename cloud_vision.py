from http.client import responses
import io
from recommend import *

# Imports the Google Cloud client library
from google.cloud import vision

# [START vision_face_detection]
def detect_faces(path):
    """Detects faces in an image."""
    feeling = ""

    client = vision.ImageAnnotatorClient()

    # [START vision_python_migration_face_detection]
    # [START vision_python_migration_image_file]
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    # [END vision_python_migration_image_file]

    response = client.face_detection(image=image)
    faces = response.face_annotations

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    print('Faces:')

    
    for face in faces:
        print('anger: {}'.format(likelihood_name[face.anger_likelihood]))
        print('sorrow: {}'.format(likelihood_name[face.sorrow_likelihood]))
        print('joy: {}'.format(likelihood_name[face.joy_likelihood]))
        print('surprise: {}'.format(likelihood_name[face.surprise_likelihood]))

        if likelihood_name[face.anger_likelihood] == 'LIKELY' or likelihood_name[face.anger_likelihood] == 'VERY_LIKELY':
            feeling = "anger"
        elif likelihood_name[face.sorrow_likelihood] == 'LIKELY' or likelihood_name[face.sorrow_likelihood] == 'VERY_LIKELY':
            feeling = "sorrow"
        elif likelihood_name[face.joy_likelihood] == 'LIKELY' or likelihood_name[face.joy_likelihood] == 'VERY_LIKELY':
            feeling = "joy"
        elif likelihood_name[face.surprise_likelihood] == 'LIKELY' or likelihood_name[face.surprise_likelihood] == 'VERY_LIKELY':
            feeling = "surprise"
        else:
            feeling = "neutral"

    return feeling
    """ 
        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in face.bounding_poly.vertices])

        print('face bounds: {}'.format(','.join(vertices)))
    """
    

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    # [END vision_python_migration_face_detection]
# [END vision_face_detection]

# [START vision_label_detection]
def detect_labels(path):
    """Detects labels in the file."""
    client = vision.ImageAnnotatorClient()
    label_list = []

    # [START vision_python_migration_label_detection]
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    for label in labels:
        print(label.description)
        label_list.append(label.description)
    
    return label_list

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    # [END vision_python_migration_label_detection]
# [END vision_label_detection]

img_src = "ocean.jpg"
feeling = detect_faces(img_src)
if feeling == "neutral" :
    label = detect_labels(img_src)

song_json = "C:/Users/elysi/2022-01/졸업/melon_data/song_meta.json"
train_json = "C:/Users/elysi/2022-01/졸업/melon_data/data.json"
df = pd.read_json(song_json, typ='frame', encoding="utf-8")
df.to_csv('song.csv')
song_csv = "C:/Users/elysi/2022-01/졸업/melon_data/song.csv"

ply_title, ply_tag = main(song_csv, train_json, feeling, label)