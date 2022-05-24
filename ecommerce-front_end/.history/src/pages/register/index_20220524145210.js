import React, {useState} from 'react';
import ButtonCart from '../../components/Button/ButtonCart';
import Input from "../../components/Input";
import { useRouter } from "next/router";
import userService from '../../services/user.service';
import Link from 'next/link';

const Index = () => {

    const [user, setUser] = useState({});
    const router = useRouter();
    const [error, setError] = useState();

    const submitRegister = (e) => {
        e.preventDefault();
        userService.register(user)
        .then(
          (data) => {
            if (data.error){
              setError(true);
            }
            else{
              localStorage.setItem("token", data.jwt);
              router.push('/profil');
            }
          }
        )
        .catch(err => {
          console.log(err);
          setShowModal(true);      
        });
      }

    return (
  
        <div className='register_page container'>
            <h1 className='register_title'>Inscription</h1>
            {error ? (
              <p className='login_error'>Le pseudo est déjà pris, veuillez en choisir un autre.</p>
            ) : (
              ''
            )}
            <div className='register_form'>
                <form className="form" onSubmit={(e)=> submitRegister(e)}>
                    <p>Ton nom</p>
                    <Input
                        name="username"
                        id="username"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Pseudo"
                        handleChange={(e) => setUser({...user, username:e.target.value})}
                    />
                    <Input
                        name="firstName"
                        id="firstName"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Prénom"
                        handleChange={(e) => setUser({...user, firstname:e.target.value})}
                    />
                    <Input
                        name="lastName"
                        id="lastName"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Nom"
                        handleChange={(e) => setUser({...user, name:e.target.value})}
                            />
                    <p>Détails de connexion</p>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        classes="form__input"
                        required={true}
                        placeholder="E-mail"
                        handleChange={ (e) => setUser({...user, email:e.target.value})}
                    />
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        classes="form__input"
                        required={true}
                        placeholder="Mot de passe"
                        handleChange={(e) => setUser({...user, password:e.target.value})}
                    />
                    <ButtonCart title="S'inscrire"/>
                </form>
                <p>Vous avez deja un compte ? <Link href="/login"><span className='login_link'>Se connecter</span></Link></p>
  
            </div>



      </div>
    );
}

export default Index;
