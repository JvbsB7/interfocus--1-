import { api } from "../lib/axios";

export async function postOrdemServico(data) {
  await api.post('/OrdemServico', data)
}