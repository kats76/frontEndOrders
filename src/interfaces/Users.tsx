export interface Usuario {
    nombreUsuario: string;
    contrasena: string;
    tipo: string;
    nombre: string;
  }
  
  export const createUsuario = (
    nombreUsuario: string,
    contrasena: string,
    tipo: string,
    nombre: string
  ): Usuario => {
    return { nombreUsuario,contrasena,tipo,nombre };
  };
  