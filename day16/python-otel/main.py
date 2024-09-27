from fastapi import FastAPI, Request
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor, OpenTelemetryMiddleware
import uvicorn

from config import JAEGER_URL, PORT

app = FastAPI()

# 設置服務名稱和追蹤數據的資源
resource = Resource(attributes={
    "service.name": "python-fastapi-01",
    "service.version": "1.0.0",
})

# 配置 TracerProvider 和 OTLPSpanExporter
trace.set_tracer_provider(TracerProvider(resource=resource))
tracer_provider = trace.get_tracer_provider()

# 使用 OTLP 導出器將追蹤數據發送到 Jaeger
otlp_exporter = OTLPSpanExporter(endpoint=JAEGER_URL)
span_processor = BatchSpanProcessor(otlp_exporter)
tracer_provider.add_span_processor(span_processor)

# 自動追蹤 FastAPI 應用
FastAPIInstrumentor.instrument_app(app)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.get("/api/demo-01")
async def test_endpoint(request: Request):
    return {"message": "Hello Opentelemetry"}

# 添加 OpenTelemetry 中間件來追蹤所有請求
app.add_middleware(OpenTelemetryMiddleware)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
