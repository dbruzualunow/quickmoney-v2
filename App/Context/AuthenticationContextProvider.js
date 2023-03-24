import React, {createContext, useEffect, useMemo, useReducer, useState} from "react";
import translate, { setI18nConfig } from "../I18n";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../Services/ApiService";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                let success = false;

                try {
                    const response = await ApiService.login({...data, email: data.email.trim()});
                    if (response?.data?.jwt) {
                        setUser(response.data.user);
                        success = true;
                        ApiService.setAuthorizationHeader(response?.data?.jwt)
                        await AsyncStorage.setItem('userToken', response.data.jwt)
                        dispatch({type: 'SIGN_IN', token: response.data.jwt});
                    }
                } catch (error) {
                    console.log('Error: ', {error});
                }

                return success;
            },
            signOut: async () => {
                ApiService.cleanAuthorizationHeader();
                await AsyncStorage.removeItem('userToken');
                dispatch({type: 'SIGN_OUT'})
            },
            signUp: async (data) => {
                const result = {success: false, errorMsg: null};
                try {
                    const response = await ApiService.register(data);
                    if (response?.data?.jwt) {
                        setUser(response.data.user);
                        await ApiService.setAuthorizationHeader(response?.data?.jwt)
                        await AsyncStorage.setItem('userToken', response.data.jwt)
                        dispatch({type: 'SIGN_IN', token: response.data.jwt});
                        result.success = true;
                    }
                } catch (error) {
                    console.log('Error: ', error?.response?.data?.error);
                    if (error?.response?.data?.error?.message === "Email is already taken") {
                        result.errorMsg = translate('authentication.emailAlreadyTaken');
                    }else if(error?.response?.data?.error?.message === "Username required") {
                        result.errorMsg = translate('authentication.usernameRequired');
                    }else if(error?.response?.data?.error?.message === "Username already exists") {
                        result.errorMsg = translate('authentication.usernameAlreadyExists');
                    }else if(error?.response?.data?.error?.message === "Username length must be at least 3") {
                        result.errorMsg = translate('authentication.usernameLengthErrorMin');
                    }else if(error?.response?.data?.error?.message === "Username length must be less than 50") {
                        result.errorMsg = translate('authentication.usernameLengthErrorMax');
                    }else {
                        result.errorMsg = translate('authentication.loginError');
                    }
                }

                return result;
            }
        }),
        []
    );

    const refreshUser = async () => {
        const response = await ApiService.getUser();
        if (response?.data) {
            setUser(response.data);
        }
    }

    useEffect(() => {
        SplashScreen.hide()

        const bootstrapAsync = async () => {
            let userToken = await AsyncStorage.getItem('userToken')
            if (userToken) {
                try {
                    await ApiService.setAuthorizationHeader(userToken);
                    const {data} = await ApiService.getUser();
                    setUser(data);
                    await setI18nConfig(data.language)
                    await AsyncStorage.setItem('userToken', userToken)
                } catch (error) {
                    ApiService.cleanAuthorizationHeader();
                    userToken = null;
                }
            }

            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync();
    }, []);

    useEffect(() => {
        state.isLoading ? SplashScreen.show() : SplashScreen.hide();
    }, [state.isLoading]);

    return (
        <AuthenticationContext.Provider value={{...authContext, user, refreshUser, state}}>
            {children}
        </AuthenticationContext.Provider>
    );
};
