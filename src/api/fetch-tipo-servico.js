import { api } from "../lib/axios";

export async function fetchTipoServico() {
  const { data } = await api.get('/TipoServico')

  return data
}