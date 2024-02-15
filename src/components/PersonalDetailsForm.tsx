
import { ChangeEvent } from "react";
import InputLabel from "./InputLabel"

interface personalProps {
    data: {
        label: string,
        id: string;
        value: string;
        type: string;
        handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    }[]
}


export default function PersonalDetails(props: personalProps) {
    return (
        <form className='grid h-[fit-content]' onSubmit={(e) => e.preventDefault()}>
            <h2 className="section-title">Personal Details</h2>
            <div className='flex gap-3 mx-auto flex-item flex-wrap'>
            {props.data.map((item) => (
                <InputLabel 
                label={item.label}
                id={item.id}
                type={item.type}
                value={item.value}
                handleChange={item.handleChange}
                />
            ))}
            </div>
        </form>
    )
}