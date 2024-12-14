import { api } from "../lib/axios";

export async function getOrdemServico(id) {
  const { data } = await api.get(`/OrdemServico/${id}`)
  return data
}