import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";
/**
 * 
 * @param {String|Number} id
 * @returns {Promise <User>}
 */


export const getUserById =async (id)=>{// está será la función que cargará el ususario cuando se seleccione
    const url = `${ import.meta.env.VITE_BASE_URL}/users/${id}`; //cargará al usuario de acuerdo al id  

    const res = await fetch(url);// res hace referencia a laconstante url, que es la que trae la base de datos del internet .
    const data =await res.json();
    const user=  localhostUserToModel(data)
    

    return user;
}