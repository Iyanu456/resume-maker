interface IconProps {
    src?: string;
    width?: string;
    height?: string;
    className?: string;
    alt?: string;
    style?: object;
    onClick?: (e?: any | null) => any;
}

const DEFAULT_WIDTH = "10px"; // Set your default width
const DEFAULT_HEIGHT = "10px"; // Set your default height

export default function Icon(props: IconProps) {
    const width = props.width || DEFAULT_WIDTH;
    const height = props.height || DEFAULT_HEIGHT;

    return (
       
            <img src={props.src} className={props.className} height={height} width={width} alt={props.alt} style={props.style}/>
       
    );
}