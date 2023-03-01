
export class User{// este es el formato predeterminado que va a tener cada ususario 
/**
 * 
 * @param {Like<User>} userDataLike //se desestructura este objeto, que tiene las propiedades del propotipo de usuario . Para que el constructor reciba la data como nosotros la esperamos 
 */
    constructor({id,isActive,balance,avatar,firstName,lastName,gender}){// se desestructurará UserDataLike, para que sus propiedades sean parecidas a un usuario
        this.id       = id;
        this.isActive =isActive;
        this.balance  = balance;
        this.avatar   = avatar;
        this.firstName= firstName;
        this.lastName = lastName;// como este no coincide con last_name,se utilizarán los mappers  de tal manera  que reciba un argumento que luzca  :
      /*   "id": 1,
"isActive": false,
"balance": 1397.32,
"avatar": "http://placehold.it/32x32",
"first_name": "Ryan",
"last_name": "Kent",
"gender": "male" 
y lo convierta al tipo User{}, que está en localhost-user.mapper
 */

        this.gender = gender;
    }
}