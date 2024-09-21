from fastapi import FastAPI
import uvicorn
from config import PORT

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/python-api")
def long_api():
    sum = 0
    # mock 耗時操作
    for i in range(1000000):
        sum +=1
    return {"message": "python long-service successfully"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)

