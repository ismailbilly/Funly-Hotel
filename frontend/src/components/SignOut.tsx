import React from 'react'
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from 'react-query';
import { successToast,  ErrorToast} from "../utils/notifications";
//import toast from 'react-hot-toast';
const SignOut = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validationToken"); 
            successToast('Signed Out')

        }, 
        onError: (error: Error) => {
            ErrorToast(error.message)
        }
    })
    const handleClick = () => {
        mutation.mutate()
    }
  return (
      <button onClick={handleClick}  className="flex items-center bg-[#B6BABF] text-[#0D445F] px-3 font-bold hover:bg-gray-100">
      Sign Out
    </button>
  );
}

export default SignOut