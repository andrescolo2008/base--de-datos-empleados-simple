import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";
/**
 * 
 * @param {Number} page
 * @returns {Promise <User[]>}
 */


export const loadUsersByPage =async (page=1)=>{
    const url = `${ import.meta.env.VITE_BASE_URL}/users?_page=${page}`; // no se debería colocar la url de la base de datos porque puede que la persona novayaausar directamente este host espec´fiico, por lo cual es mejor utilizar una variable de entorno.

    // este  url `${ import.meta.env.VITE_BASE_URL}/users?_page${page}`, sirve para hacer la petición a ese sitio web.

    // la función loadUsers recibirá el argumento page, este ${page} indica el valor de la pagina que se buscará la información.  

    const res = await fetch(url);// res hace referencia a laconstante url, que es la que trae la base de datos del internet .
    const data =await res.json();
    
    const users= data.map (localhostUserToModel)
    console.log(users);
    return users;
}