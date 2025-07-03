"use client"

import { fetchUserData } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store";
import { useEffect } from "react";

export default function FetchInformation() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchUserData());
    },[dispatch])

    return null;
}
