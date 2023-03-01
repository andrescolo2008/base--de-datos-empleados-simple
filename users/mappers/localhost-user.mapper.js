import { User } from "../models/user"
 

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */

// el objetivo de esta sección es estandarizar lainterpretación de los datos que va a amanejar el front end para que cuando los reciba   el backend no genere conflicto, es decir,  ej:  aquí se va a "traducir" los términos para que no vaya a haber conflicto, primero  se convierte  first_name , que es para blackend, a  firstName , que es como lo va a manejar  frontend.
export const localhostUserToModel=(localhostUser) =>{// aquí coloco el usuario que voy a recibir localhostUser
const {
    
    id,
    isActive,
    balance,
    avatar, 
    first_name,
    last_name,
    gender,
    
} = localhostUser// desestructuro localhostUser para obtenerlas propiedades 

return new User({
    id,
    isActive,
    balance,
    avatar, 
    firstName:first_name,
    lastName:last_name,
    gender,
})
}