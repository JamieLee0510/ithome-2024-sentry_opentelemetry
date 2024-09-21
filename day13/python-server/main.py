from config import PORT, SENTRY_DSN
import sentry_sdk

sentry_sdk.init(
    dsn=SENTRY_DSN,
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)

from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/python-api")
def long_api(request: Request):
    print(request.headers)
    sum = 0
    # mock 耗時操作
    for i in range(1000000):
        sum +=1
    return {"message": "python long-service successfully"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)

