import { api } from "../lib/axios";

export async function getOrdemServico() {
  const { data } = await api.get('/OrdemServico')

  return data
}