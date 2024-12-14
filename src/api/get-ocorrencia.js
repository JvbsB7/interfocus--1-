import { api } from "../lib/axios";

export async function getOcorrencia(id) {
  const { data } = await api.get(`/Ocorrencia/${id}`)
  return data
}