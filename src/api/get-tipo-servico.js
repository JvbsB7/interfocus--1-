import { api } from "../lib/axios";

export async function getTipoServico(id) {
  const { data } = await api.get(`/TipoServico/${id}`)
  return data
}