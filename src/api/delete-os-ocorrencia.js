import { api } from "../lib/axios";

export async function deleteOsOcorrencia(id) {
  await api.delete(`/OcorrenciaOS/${id}`)
}