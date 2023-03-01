import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state ={
    currentPage:0,
    users:[],
}

const loadNextPage=async()=>{
    
const users=await loadUsersByPage(state.currentPage+1)
if(users.lenght===0) return;// no hacer nada , en caso de que la página sea 0, es decir ,no  hayan usuarios

if(state.currentPage>users) return;
state.currentPage +=  1;

state.users=users;// users nos muestra la cantidad de ususarios que se encuentran en la base de datos


}

const loadPreviusPage=async()=>{
    if(state.currentPage===1) return;// no permitir conteo negativo , en caso de que la página sea menor 1, 

    const users=await loadUsersByPage(state.currentPage-1) ;

 state.users=users;
state.currentPage-=  1;

}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged= (updatedUser)=>{

let wasFound=false;

state.users=state.users.map(user =>{
    if(user.id=== updatedUser.id){
        wasFound=true;
        return updatedUser
    }   
    return user;
});
    if(state.users.length<10 && !wasFound){
        state.users.push(updatedUser);
    }   

}

const reloadPage= async ()=>{
    const users=await loadUsersByPage(state.currentPage);
    if(users.lenght===0){
        await loadPreviusPage();
        return;
    }
    state.users=users
}

export default{
loadNextPage,
loadPreviusPage,
onUserChanged,
reloadPage,

/**
 * 
 * @returns {User[]}
 */
getUsers:()=>[...state.users],// sive para  poder tener acceso a los usuarios. Esto manda la referencia al objeto, se utiliza el operador spread , para dar a entnederque se citarán a  cada uno de ellos .  
/**
 * 
 * @returns {Number}
 */
getCurrentPage: ()=>state.currentPage,// página  actual, es un primitivo y pasa por valor 

}