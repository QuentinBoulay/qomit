import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../../admin/Templates/NavAdmin';

import { API_BASE_URL, API_EP_USERS, API_EP_PASSWORD } from '../../../apiConstantes';

function Profile() {
    const activePage = "profile";

    const navigate = useNavigate();

    const [userToken] = useState(localStorage.getItem('user_token_qomit'));
    const [userId] = useState(localStorage.getItem('user_id_qomit'));

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!userToken) {
            navigate('/admin');
        }
    }, [userToken, navigate]);

    useEffect(() => {
        fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}`)
            .then(response => response.json())
            .then(user => {
                console.log(user);
                setUser(user);
            })
    }, [userId]);

    const [actualPassword, setActualPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new URLSearchParams();
        data.append('old_password', actualPassword);
        data.append('new_password', newPassword);
        data.append('confirm_password', confirmPassword);

        try {
            const response = await fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}${API_EP_PASSWORD}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString()
            });

            const jsonData = await response.json();
            setResponseMessage(jsonData.message);
            if (jsonData.error === 0) {
                setActualPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return (
            <div className='body-admin'>
                <div className='page'>
                    <div className='nav_admin'>
                        <NavAdmin activeLink={activePage} />
                    </div>
                    <div className='page_block'>
                        <h1>Mon profil</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Mon profil</h1>
                    <div className='subtitle'>Gérer les paramètres de votre profil</div>
                    <div className='my_profil'>
                        <div className='profil_block'>
                            <div className='picture'>
                                <div className='block_picture'>
                                    <img src={user.use_picture} alt={user.use_firstname} />
                                </div>
                            </div>
                            <div className='informations'>
                                <div className='profile'>
                                    <h2>Modifier mon profil</h2>
                                    <div className='company'>
                                        <div className='input_block'>
                                            <label>Entreprise</label>
                                            <input value={user.com_name} disabled />
                                        </div>
                                    </div>
                                    <div className='personal'>
                                        <div className='input_block'>
                                            <label>Prénom</label>
                                            <input value={user.use_firstname} disabled />
                                        </div>
                                        <div className='input_block'>
                                            <label>Nom</label>
                                            <input value={user.use_lastname} disabled />
                                        </div>
                                        <div className='input_block'>
                                            <label>Email</label>
                                            <input value={user.use_email} disabled />
                                        </div>
                                        <div className='input_block'>
                                            <label>Téléphone</label>
                                            <input value={user.use_phone} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className='password'>
                                    <h2>Changer mon mot de passe</h2>
                                    <form onSubmit={handleSubmit} className="password_block">
                                        <div className='actual'>
                                            <div className='input_block'>
                                                <label htmlFor="actual_password">Mot de passe actuel</label>
                                                <input type="password" id="actual_password" value={actualPassword} onChange={(e) => setActualPassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className='new'>
                                            <div className='input_block'>
                                                <label htmlFor="new_password">Nouveau mot de passe</label>
                                                <input type="password" id="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                            </div>
                                            <div className='input_block'>
                                                <label htmlFor="confirm_password">Nouveau mot de passe</label>
                                                <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className='save'>
                                            <button type="submit">Enregistrer</button>
                                        </div>
                                    </form>
                                </div>
                                {responseMessage && <div>{responseMessage}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
