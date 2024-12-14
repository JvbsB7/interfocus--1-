import { api } from "../lib/axios";

export async function putOsOcorrencia(id, data) {
  await api.put(`/OcorrenciaOS/${id}`, data)
}