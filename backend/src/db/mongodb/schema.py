# Define schema for MongoDB collections
from datetime import datetime

SCHEMA = {
    'users': {
        'username': str,
        'pwd': str,
    },
    'chats': {
        'owner': str,
        'name': str,
        'created_at': datetime,
        'messages': [
            {
                'from': str,  #este no se si es necestario dado que ya está en la conversacion
                'message': str,
                'timestamp': datetime,

            }

        ]
    }
}
