import { api } from "../lib/axios";

export async function getOsOcorrencia(id) {
  const { data } = await api.get(`/OcorrenciaOS/${id}`)
  return data
}