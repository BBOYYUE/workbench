import { v4 as uuidv4 } from "uuid";
import product from "../modules/project/product"
import project from "../modules/project/project"
import adviser from "../modules/project/adviser"
import module from "../modules/project/module"
import work from "../modules/project/work"
export default {
  "id": 1,
  "name": "项目管理",
  "uuid": uuidv4().substring(0, 5),
  "modules": [
    project, product, module, work
  ]
}