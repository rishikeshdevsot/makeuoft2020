from google.cloud import pubsub_v1

# TODO project_id = "Your Google Cloud Project ID"
# TODO topic_name = "Your Pub/Sub topic name"
project_id = 'makeuoft2020-268400'
# topic_name= 'input_images'
# publisher = pubsub_v1.PublisherClient()
# project_path = publisher.project_path(project_id)
# topic_path = publisher.topic_path(project_path, topic_name)

# # topic = publisher.create_topic(topic_path)
# # print("Topic created: {}".format(topic))
# for topic in publisher.list_topics(project_path):
#     print(topic)
# subscriber = pubsub_v1.SubscriberClient()
# topic_path = subscriber.topic_path(project_id, topic_name)
# subscription_path = subscriber.subscription_path(
#     project_id, 'image_subscriber'
# )
# subscription = subscriber.create_subscription(
#     subscription_path, topic_path
# )
# print("Subscription created: {}".format(subscription))

subscription_name = 'image_subscriber'
timeout = 50.0  # "How long the subscriber should listen for
# messages in seconds"

subscriber = pubsub_v1.SubscriberClient()
# The `subscription_path` method creates a fully qualified identifier
# in the form `projects/{project_id}/subscriptions/{subscription_name}`
subscription_path = subscriber.subscription_path(
    project_id, subscription_name
)

def callback(message):
    print("Received message: {}".format(message))
    message.ack()

streaming_pull_future = subscriber.subscribe(
    subscription_path, callback=callback
)
print("Listening for messages on {}..\n".format(subscription_path))

# result() in a future will block indefinitely if `timeout` is not set,
# unless an exception is encountered first.
try:
    streaming_pull_future.result(timeout=timeout)
except:  # noqa
    streaming_pull_future.cancel()