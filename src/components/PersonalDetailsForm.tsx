import { ChangeEvent, useEffect, useState } from "react";
import InputLabel from "./InputLabel"

interface personalProps {
    data: {
        label: string,
        value: string;
        type: string;
        handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
    }[];
    formStyle: string;
}


export default function PersonalDetails(props: personalProps) {
    const [inputFilled, setInputFilled] = useState(null)

    return (
        <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
            <h1 className="section-title"><b>Your Details</b></h1>
            <div className='grid gap-4 grid-cols-2 '>
            {props.data.map((item, index) => (
                <InputLabel 
                label={item.label}
                id={index}
                type={item.type}
                value={item.value}
                handleChange={item.handleChange}
                />
            ))}
            </div>
        </form>
    )
}