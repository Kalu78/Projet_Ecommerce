import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import userService from '../../services/user.service';
import withAuth from "../../HOC/withAuth";
import ButtonCart from "../../components/Button/ButtonCart";

const Index = () => {

    const [user, setUser] = useState();

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push('/login');
    }

    useEffect(() => {
        userService.getMe(localStorage.getItem('token'))
        .then(data=> {
            console.log(data);
            setUser(data);
        })
        .catch(err=>console.log(err))
    }, []);

    return (
        <div>

            <p>Nom : {user && user.name}</p>
            <p>Prénom : {user && user.id}</p>
            <p>Email : {user && user.email}</p>
            <p><ButtonCart title="logout" onClick={() => logout()}/></p>
        </div>
    );
}

export default withAuth(Index);
