import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return true;
    }
  }

  // register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user; // Retorna o usuário criado
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
      console.error("Erro ao criar usuário:", error); // Adiciona log para depuração
    } finally {
      setLoading(false); // Sempre para o loading no final
    }
  };

  // logout - sign out

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  //login - sign out

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;

      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);

      // Verifica o código do erro
      if (error.code === "auth/invalid-credential") {
        systemErrorMessage = "Email ou senha inválidos.";
      } else {
        // Mensagem genérica para outros erros
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
      console.error("Erro ao criar usuário:", error); // Adiciona log para depuração
    } finally {
      setLoading(false); // Sempre para o loading no final
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
