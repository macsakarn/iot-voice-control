import React from 'react'
import jim from "../assets/jim.png";
import jimHappy from "../assets/jim_happy.png";
import jimSad from "../assets/jim_sad.png";

export default function JimImage({type}) {
    if (type === "normal"){
        return <img src={jim} width={200} />
    }else if(type === "happy"){
        return <img src={jimHappy} width={200} />
    }else if(type === "sad"){
        return <img src={jimSad} width={200} />
    }

}
