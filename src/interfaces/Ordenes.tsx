export interface Data {
  id: string;
  numero: string;
  cliente: string;
  contacto: string;
  direccion: string;
  areas: IAreas[];
  estado: string;
  supervisor: string;
  grupo?: string[];
  eliminado: boolean;
  fecha: string;
}

export const createData = (
  id: string,
  numero: string,
  cliente: string,
  contacto: string,
  direccion: string,
  areas: IAreas[],
  estado: string,
  fecha: Date,
  supervisor: string,
  eliminado: boolean,
  grupo?: string[],
): Data => {
  return {
    id,
    numero,
    cliente,
    contacto,
    direccion,
    areas,
    estado,
    supervisor,
    grupo,
    eliminado,
    fecha: fecha.toISOString()
  };
};

export interface IAreas {
  nombre: string;
  observaciones: string;
}

export interface ApiResponse {
  response: boolean;
  message: string;
  serverMessage: string;
  data: Data[];
}
