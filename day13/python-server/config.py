from dotenv import load_dotenv
import os

load_dotenv()

PORT=3040
SENTRY_DSN= os.getenv("SENTRY_DSN")