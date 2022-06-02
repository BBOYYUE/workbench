import { v4 as uuidv4 } from "uuid";
import product from "../modules/project/product"
import project from "../modules/project/project"
import user from "../modules/project/user"
import module from "../modules/project/module"
import folder from "../modules/project/folder"
import work from "../modules/project/work"
import role from "../modules/project/role"
import permission from "../modules/project/permission"

export default {
  "id": 1,
  "name": "项目管理",
  "uuid": uuidv4().substring(0, 5),
  "modules": [
    project, product, module, folder, work, user, role, permission
  ]
}