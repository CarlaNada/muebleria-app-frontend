
import 'server-only';

export async function solicitarApi(
  ruta,
  { metodo = 'GET', token, datos } = {}
) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('Falta configurar API_URL.');
  }

  const url = `${apiUrl.replace(/\/+$/, '')}/api/${ruta.replace(/^\/+/, '')}`;

  const headers = {
    Accept: 'application/json',
  };

  if (datos !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const respuesta = await fetch(url, {
    method: metodo,
    headers,
    body: datos === undefined ? undefined : JSON.stringify(datos),
    cache: 'no-store',
  });

  const resultado = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensaje =
      typeof resultado?.detail === 'string'
        ? resultado.detail
        : `La API respondió con el estado ${respuesta.status}.`;

    const error = new Error(mensaje);
    error.status = respuesta.status;
    error.detalles = resultado;
    throw error;
  }

  return resultado;
}
