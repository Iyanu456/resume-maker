interface IconProps {
    src?: string;
    width?: string;
    height?: string;
    className?: string;
    alt?: string;
    onClick?: (e?: any | null) => any;
}

const DEFAULT_WIDTH = "10px"; // Set your default width
const DEFAULT_HEIGHT = "10px"; // Set your default height

export default function Icon(props: IconProps) {
    const width = props.width || DEFAULT_WIDTH;
    const height = props.height || DEFAULT_HEIGHT;

    return (
        <button onClick={props.onClick} className={props.className}>
            <img src={props.src} height={height} width={width} alt={props.alt}/>
        </button>
    );
}