from fastapi import FastAPI, Request
import uvicorn

from config import PORT

app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.get("/api/demo-01")
async def test_endpoint(request: Request):
    print(request.headers)
    return {"message": "Hello Opentelemetry"}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
