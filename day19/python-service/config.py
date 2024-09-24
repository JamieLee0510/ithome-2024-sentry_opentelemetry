from dotenv import load_dotenv
import os

load_dotenv()

JAEGER_URL = os.getenv("JAEGER_URL")
PORT = 3040