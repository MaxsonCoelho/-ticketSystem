import { useState, createContext, useEffect } from "react";
import firebase from '../services/firebaseConnection';


export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //function save user loged
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, [])

    async function signUp(email, password, name) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                name: name,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data);
                stogareUser(data);
                setLoadingAuth(true);
            })
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    function stogareUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider 
        value={{
            signed: !!user, 
            user, 
            loading,
            signUp
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;