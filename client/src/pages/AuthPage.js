import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
   const message = useMessage();
   const { loading, error, request, clearError } = useHttp();
   const [form, setForm] = useState({ email: "", password: "" });

   useEffect(() => {
      message(error);
      clearError();
   }, [error, message, clearError]);

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   };

   const signUpHandler = async () => {
      try {
         const data = await request("/api/auth/signup", "POST", { ...form });
         message(data.message);
      } catch (error) {}
   };
   const logInHandler = async () => {
      try {
         const data = await request("/api/auth/login", "POST", {
            ...form,
         });
         message(data.message);
      } catch (error) {}
   };

   return (
      <div className="row">
         <div className="col s8 offset-s2">
            <h1 className="white-text center">MERN</h1>
            <div className="card grey darken-3">
               <div className="card-content white-text">
                  <span className="card-title">Авторизация</span>
                  <div className="input-field">
                     <input
                        id="email"
                        type="text"
                        name="email"
                        className="validate"
                        onChange={changeHandler}
                     />
                     <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                     <input
                        id="password"
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler}
                     />
                     <label htmlFor="password">Пароль</label>
                  </div>
                  <div className="card-action">
                     <button
                        className="btn deep-purple lighten-3 black-text col s3 "
                        onClick={logInHandler}
                        disabled={loading}
                     >
                        Войти
                     </button>
                     <button
                        className="btn amber lighten-3 black-text col s6 offset-s3"
                        onClick={signUpHandler}
                        disabled={loading}
                     >
                        Регистрация
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
