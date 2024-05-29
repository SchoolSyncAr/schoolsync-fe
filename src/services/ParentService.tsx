import api from "api/axios"
import { REACT_APP_REST_SERVER_URL } from "constants/constants"
import { ParentProps } from "interfaces/Parent"
import { Parent } from "models/interfaces/Parent"

export const getAllChildrenForAParent = async (parentId: number) => {
  console.log("parent service parent id is: " + parentId)

}

class ParentService {

  getAll = async () => {
    const parents = await api.get(`${REACT_APP_REST_SERVER_URL}/api/parent/all`)
    return parents.data.map((parent: ParentProps) => Parent.fromJson(parent))
  }
}

export const parentService = new ParentService()
