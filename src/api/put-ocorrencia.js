import { api } from "../lib/axios";

export async function putOcorrencia(id, data) {
  await api.put(`/Ocorrencia/${id}`, data)
}