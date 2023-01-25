import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Referal = (props)=>{
    let { place } = useParams();
    let {sethistoryplacename}= props
    useEffect(()=>{
        if(place){
            sethistoryplacename(place)
        }
    },[place])

    return(
        <>
        </>
    )
}

export default Referal