import "./landing.css";
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <>
            <div className="nav flex py-[1.2em] px-[2em] relative z-20 top-0 bottom-auto border-b-2">
                <p className="text-[1.2em] font-bold">Sketchcv</p>
            </div>
            <div className="hero grid place-items-center h-[fit-contents] pt-[2em] md:pt-[5em]">
                <div className="max-w-[75%] text-center">
                    <h2 className="poppins font-semibold text-[2em] md:text-[3em]">
                        Create a free <span className="text-[#007bff]">Resume</span> in minutes
                    </h2>
                    <p className="text-[1.05em] m-auto pt-3 text-grey poppins md:max-w-[70%] ">
                        Create a professional and standout resume effortlessly with our
                        user-friendly resume builder. Whether you're a seasoned professional
                        or just starting your career, we've got you covered.
                    </p>
                    <div className="flex gap-3 justify-center center-align mt-[2em] ">
                        <Link to="/resume">
                        <button className="btn bg-[#007bff] text-white py-[0.6em] px-[2.2em] rounded-[0.75em]">
                            Get Started
                        </button>
                        </Link>
                        
                        <Link to="/signup">
                        <button className="btn-outline py-[0.6em] px-[2.2em] rounded-[0.75em] hidden md:block">
                            Sign in
                        </button></Link>
                        
                    </div>
                </div>
            </div>
            <div className="grid place-items-center mt-[5em] relative px-5">
                <div className="shadow-2xl border-[2px] w-[fit-contents] p-1 rounded-[0.8em] md:max-w-[75vw]">
                    <div className=" bg-white w-[fit-contents] p-3 rounded-[0.75em] ">
                        <img src="resume-maker-screenshoot2.PNG" />
                    </div>
                </div>
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
