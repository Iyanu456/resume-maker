
interface inputLabelProps {
    label?: string;
    type: any;
    value: any;
    handleChange(e: any): any;
    style?: string;
    placeholder?: string
}

export default function InputLabel(props: inputLabelProps) {
    return (
        <div className={`input-group w-[100%] ${props.style}`}>
            {props.label && (
            <><label className="form-label font-bold pb-2 text-[0.78em]" htmlFor="exampleInput">{props.label}</label><br /></>)}
            
            <input 
              className="form-control mt-[0.2em]" 
              placeholder={props.placeholder}
              type={props.type}
              value={props.value}
              onChange={props.handleChange}
            />
          </div>
    )
}