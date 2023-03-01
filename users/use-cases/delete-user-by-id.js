
 /**
     * @param{String|Number} user 
     */
    
export const deleteUserById= async (id)=>{
    const url = `${ import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res= await fetch(url,{
        method:'DELETE',
    });

const deletedUser=await res.json();
console.log({deletedUser});
return true;
}
