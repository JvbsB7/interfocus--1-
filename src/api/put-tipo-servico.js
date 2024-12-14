import { api } from "../lib/axios";

export async function putTipoServico(id, data) {
  await api.put(`/TipoServico/${id}`, data)
}