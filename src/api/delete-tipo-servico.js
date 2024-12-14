import { api } from "../lib/axios";

export async function deleteTipoServico(id) {
  await api.delete(`/TipoServico/${id}`)
}