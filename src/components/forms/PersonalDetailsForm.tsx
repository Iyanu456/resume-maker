
import { ChangeEvent, useEffect, useState } from "react";
import InputLabel from "../InputLabel"

interface personalProps {
    formStyle: string;
    value: string;
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => any;
    onFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => any;
    onLastNameChange: (e: ChangeEvent<HTMLInputElement>) => any;
}


export default function PersonalDetails(props: personalProps) {

    return (
        <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
            <h1 className="section-title"><b>Your Details</b></h1>
            <div className="flex flex-col gap-4">
                <InputLabel 
                label='Job Title'
                type='text'
                value={props.value}
                handleChange={props.onTitleChange}
                />
                <div className="flex gap-5">
                <InputLabel 
                label='First Name'
                type='text'
                value={props.value}
                handleChange={props.onFirstNameChange}
                />
                <InputLabel 
                label='Last Name'
                type='text'
                value={props.value}
                handleChange={props.onLastNameChange}
                />
                </div>
                <InputLabel 
                label='Email'
                type='text'
                value={props.value}
                handleChange={props.onTitleChange}
                />
            </div>
        </form>
    )
}
