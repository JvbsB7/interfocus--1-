import { api } from "../lib/axios";

export async function postTipoServico(data) {
  await api.post('/TipoServico', data)
}