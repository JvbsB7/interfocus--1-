import { api } from "../lib/axios";

export async function getOsOcorrencia() {
  const { data } = await api.get('/OcorrenciaOS')

  return data
}