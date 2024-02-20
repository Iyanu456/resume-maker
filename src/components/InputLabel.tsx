
interface inputLabelProps {
    label: string;
    type: any;
    value: any;
    handleChange(e: any): any;
    style?: string;
}

export default function InputLabel(props: inputLabelProps) {
    return (
        <div className={`input-group w-[100%] ${props.style}`}>
            <label className="form-label pb-4" htmlFor="exampleInput">{props.label}</label>
            <br />
            <input 
              className="form-control mt-[0.4em]" 
              placeholder=" "
              type={props.type}
              value={props.value}
              onChange={props.handleChange}
            />
          </div>
    )
}