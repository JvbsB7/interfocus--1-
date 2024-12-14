import { api } from "../lib/axios";

export async function getOcorrencia() {
  const { data } = await api.get('/Ocorrencia')

  return data
}