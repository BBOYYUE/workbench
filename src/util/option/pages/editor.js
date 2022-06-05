import { v4 as uuidv4 } from "uuid";
import panorama from "../modules/editor/panorama";
import design from "../modules/editor/design";
import three from "../modules/editor/three";
export default {
    "id": 2,
    "name": "作品编辑器",
    "uuid": uuidv4().substring(0, 5),
    "modules": [
        panorama, design, three
    ]
}