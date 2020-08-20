import React from 'react';

export const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h1>Сокращение ссылок</h1>
                <div className="card grey darken-3">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div class="input-field">
                            <input
                                id="email"
                                type="text"
                                name="email"
                                className="validate"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div class="input-field">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="validate"
                            />
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="card-action">
                            <button className="btn deep-purple lighten-3 black-text col s3 ">Войти</button>
                            <button className="btn amber lighten-3 black-text col s6 offset-s3">Регистрация</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}