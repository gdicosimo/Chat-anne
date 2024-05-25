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
        'pdfs': [
            {
                'name': str
            }
        ],

        'messages': [
            {
                'answer': str,
                'query': str,
                'timestamp': datetime
            }

        ]
    }
}
