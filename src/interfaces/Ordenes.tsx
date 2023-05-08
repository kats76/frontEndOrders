export interface Data {
  id: number;
  orden: string;
  cliente: string;
  contacto: string;
  direccion: string;
  areas: IAreas[];
  estado: string;
  supervisor: string;
  grupo?: string [];
}

export const createData = (
  id: number,
  orden: string,
  cliente: string,
  contacto: string,
  direccion: string,
  areas: IAreas[],
  estado: string,
  supervisor:string,
  grupo?:string[]
): Data => {
  return { id, orden, cliente, contacto, direccion, areas, estado,supervisor,grupo};
};

export interface IAreas{
  Nombre:string,
  Observaciones:string,
}
