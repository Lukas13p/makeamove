FROM python:3.11-bullseye

WORKDIR /code

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libgl1-mesa-glx \
        libglib2.0-0 \
        wget \
        curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /code/app
COPY yolov8n.pt /code/yolov8n.pt

RUN mkdir -p /code/media/uploads

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]


#CMD ["fastapi", "run", "app/main.py", "--workers=2", "--host=0.0.0.0", "--port=8000"]


