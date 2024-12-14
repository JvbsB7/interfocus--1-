import { api } from "../lib/axios";

export async function deleteOrdemServico(id) {
  await api.delete(`/OrdemServico/${id}`)
}