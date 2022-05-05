import { v4 as uuidv4 } from "uuid";
export default {
  "id": 2,
  "name": "作品管理",
  "uuid": uuidv4().substring(0, 5),
  "modules": [
    {
      "name": "全景作品",
      "id": 7,
      "icon": 'document',
      "model": "work",
      "uuid": uuidv4().substring(0, 5),
      "panel": {},
      "list": {},
      "button-group": {}
    },
    {
      "name": "平面作品",
      "id": 8,
      "icon": 'document',
      "model": "work",
      "uuid": uuidv4().substring(0, 5),
      "panel": {},
      "list": {},
      "button-group": {}
    },
    {
      "name": "模型作品",
      "id": 9,
      "icon": 'document',
      "model": "work",
      "uuid": uuidv4().substring(0, 5),
      "panel": {},
      "list": {},
      "button-group": {}
    },
    {
      "name": "序列帧作品",
      "id": 10,
      "icon": 'document',
      "model": "work",
      "uuid": uuidv4().substring(0, 5),
      "panel": {},
      "list": {},
      "button-group": {}
    }
  ]
}