import { api } from "../lib/axios";

export async function putOrdemServico(id, data) {
  await api.put(`/OrdemServico/${id}`, data)
}