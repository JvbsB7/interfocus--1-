import { api } from "../lib/axios";

export async function postOcorrencia(data) {
  await api.post('/Ocorrencia', data)
}