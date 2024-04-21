import "./landing.css";
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <>
            <div className="nav flex py-[1.2em] px-[2em] relative z-20 top-0 bottom-auto border-b-2">
                <p className="text-[1.2em] my-auto font-bold">Sketch.cv</p>
                <Link to="/signup" className="mr-0 ml-auto">
                    <button className=" py-[0.6em] px-[1.2em] border-[2px] rounded-md font-bold">Login</button>
                </Link>
      
            </div>
            <div className="hero grid place-items-center h-[fit-contents] pt-[5em]">
                <div className="max-w-[75%] text-center">
                    <h2 className="inter text-[2.6em] leading-[1.2em] md:text-[3.3em]">
                        <b>Create a free Resume in minutes</b>
                    </h2>
                    <p className="text-[1.05em] m-auto pt-3 text-grey poppins md:max-w-[70%] ">
                        Create a professional and standout resume effortlessly with our
                        user-friendly resume builder. Whether you're a seasoned professional
                        or just starting your career, we've got you covered.
                    </p>
                    <div className="flex gap-3 justify-center center-align mt-[2em] flex-wrap wrap">
                        <Link to="/resume" className="my-auto">
                        <button className="py-[0.5em] text-[1.1em] px-[1.1em] border-[2.3px] rounded-md font-bold">
                            Get Started
                            
                        </button>
                        </Link>
                        
                        <Link to="/signup" className="my-auto">
                        <button className="btn  bg-[#007bff] my-auto text-white py-[0.7em] px-[2.2em] rounded-md">
                            Sign in
                        </button></Link>
                        
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[1fr,11fr,1fr] md:grid-cols-[1fr,7fr,1fr] place-items-center mt-[5em] relative px-5">
                <div className="shadow-md bg-[#FB585A] w-[100%] md:h-[300px] h-[150px]"></div>
                <div className="border-[1px] shadow-2xl p-[1em] rounded-[1em]">
                    <img src="resume-maker-screenshoot2.PNG" className="max-w-[100%]"/>
                </div>
                <div className="shadow-2xl bg-[#FABE24] w-[100%] md:h-[300px] h-[150px]"></div>
                    
                
            </div>
            <div className="bg-white z-20 h-[80px] relative mt-[-1em] mb-[1em]"></div>
            <div className=" bg-black text-white px-[3em] py-[1.7em]">
                <div>
                    <h2 className="text-[2.2em] dm-serif-text">Templates</h2>
                    <h2 className="">Choose your preferred template</h2>
                </div>
                <div className="mt-[2.5em] mb-1 flex gap-[2.6em] wrap">
                    <div className="h-[330px] w-[243px] border-2 bg-white border-white border-2"></div>
                    <div className="h-[330px] w-[243px] border-2 border-white border-2"></div>
                    <div className="h-[330px] w-[243px] border-2 border-white border-2"></div>
                    <div className="h-[330px] w-[243px] border-2 border-white border-2"></div>
                </div>
            </div>
        </>
    );
}
