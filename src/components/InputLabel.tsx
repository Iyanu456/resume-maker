
interface inputLabelProps {
    label: string;
    id: string;
    type: any;
    value: any;
    handleChange(e: any): any;
}

export default function InputLabel(props: inputLabelProps) {
    return (
        <div className="input-group">
            <label className="form-label pb-4" htmlFor="exampleInput">{props.label}</label>
            <br />
            <input 
              className="form-control mt-[0.2em]" 
              id={props.id} 
              placeholder=" "
              type={props.type}
              value={props.value}
              onChange={props.handleChange}
            />
          </div>
    )
}