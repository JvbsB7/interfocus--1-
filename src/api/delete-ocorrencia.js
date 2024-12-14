import { api } from "../lib/axios";

export async function deleteOcorrencia(id) {
  await api.delete(`/Ocorrencia/${id}`)
}