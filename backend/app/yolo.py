from ultralytics import YOLO
from .yolo_mapping import YOLO_TO_APP_OBJECT


model = YOLO("yolov8n.pt")
CONF_THRESHOLD = 0.64

#print(model.names)

def analyze_image(path: str) -> list[str]:
    results = model(path)
    objects = set()

    for r in results:
        for box in r.boxes:
            if float(box.conf[0]) > CONF_THRESHOLD:
                label = model.names[int(box.cls[0])]
                mapped_label = YOLO_TO_APP_OBJECT.get(label)
                if mapped_label:
                    objects.add(mapped_label)

    return list(objects)