import React, {useState, useEffect} from 'react';
import ButtonCart from '../../components/Button/ButtonCart';
import Input from "../../components/input";
import { useRouter } from "next/router";
import userService from '../../services/user.service';
import Link from 'next/link';

const Index = () => {

    const [user, setUser] = useState();
    
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("token")) {
          router.push('/profil')
        }
      }, [user, setUser]);
  
      const submitLogin = (e) => {
        e.preventDefault();
        userService.login(user)
        .then((data) => { 
            console.log(data);
            localStorage.setItem('token', data.jwt);
            router.push('/profil')
        })
        .catch(err => console.log(err));
      }
    return (
      <div className="login_page container">
        <h1 className='register_title'>Se connecter</h1>
        <form className="form" onSubmit={(e)=> submitLogin(e)}>
          <Input
            name="identifier"
            id="identifier"
            type="email"
            classes="form__input"
            required={true}
            placeholder="Veuillez saisir votre nom de famille"
            handleChange={ (e) => setUser({...user, identifier:e.target.value})}
                />
          <Input
            name="password"
            id="password"
            type="password"
            classes="form__input"
            required={true}
            placeholder="Veuillez saisir votre nom de famille"
            handleChange={(e) => setUser({...user, password:e.target.value})}
                />
          <ButtonCart title="Connexion" classes="btn btn__color-black" type="submit"/>
        </form>
        <p>Vous n'avez pas de compte ? <Link href="/register"><span className='register_link'>S'inscire</span></Link></p>
      </div>
    );
  };
  

export default Index;
