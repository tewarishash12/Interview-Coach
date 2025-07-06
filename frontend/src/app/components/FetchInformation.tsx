"use client"

import { fetchUserData } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store";
import { useEffect } from "react";

export default function FetchInformation() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(localStorage.getItem("refresh_token"))
            dispatch(fetchUserData());
    },[dispatch])

    return null;
}
