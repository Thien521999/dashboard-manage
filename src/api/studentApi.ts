import { ListParams, ListResponse, Student } from "../models";
import axiosClient from "./axiosClient";

const studentApi = {
  getAll(params:ListParams):Promise<ListResponse<Student>> {
    const url = "/students";
    return axiosClient.get(url, { params}); 
  },

  getById(id:string):Promise<Student> {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data:Student):Promise<Student> {
    const url = "/categories";
    return axiosClient.post(url, data);
  },

  update(data:Student):Promise<Student> {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data); //da so dung patch
  },

  remove(id:string):Promise<any> {
    const url = `/student/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
