import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import userService from '../../services/user.service';
import withAuth from "../../HOC/withAuth";
import Input from "../../components/Input";
import ButtonCart from "../../components/Button/ButtonCart";


const Index = () => {

    const [user, setUser] = useState();
 
    const [orders, setOrders] = useState();

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push('/login');
    }

    useEffect(() => {
        userService.getMe(localStorage.getItem('token'))
        .then(data=> {
            setUser(data);
        })
        .catch(err=>console.log(err))
        
        
    }, [user, setUser]);

      const deleteAccount = (e) => {
        e.preventDefault();
        if(localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            return fetch(`https://adidas-back-end.herokuapp.com/api/users/${user.id}`, {
                method: "DELETE",
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })  
            .then(() => {
                localStorage.removeItem("token");
                router.push('/login');
            })
        }
      }
    



    return (
        <div className="profil container">
            <div className="profil_title">
                <h2>Bonjour {user && user.firstname}</h2>
            </div>
            <h3>Mes informations</h3>
                <p>Pseudo : {user && user.username}</p>
                <p>Nom : {user && user.name}</p>
                <p>Prénom : {user && user.firstname}</p>
                <p>Email : {user && user.email}</p>
            <ButtonCart title="Se déconnecter" onClick={() => logout()}/>
            <form className="form" onSubmit={(e)=> deleteAccount(e)}>
                <ButtonCart title="Supprimer le compte"/>
            </form>
        </div>
    );
}

export default withAuth(Index);
