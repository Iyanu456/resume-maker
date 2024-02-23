import { ChangeEvent, useState, useEffect } from "react";
import PersonalDetails from "./components/forms/PersonalDetailsForm";
import EducationForm from "./components/forms/EducationForm";
import PdfSection from "./components/PDFViewer";
import "./home.css";

export default function Home() {
  const [userDisplayedInfo, setUserDisplayedInfo] = useState({
    firstname: "",
    lastname: "",
    title: "Web Developer",
    email: "",
    phoneNo: "",
  });

  const [pdfRenderedProps, setPdfRenderedProps] = useState({
    firstname: "",
    lastname: "",
    title: "",
    email: "",
    phoneNo: "",

    education: [
      {
        school: "",
        degree: "",
        duration: "",
      },
    ],
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const scaleFactor = 1.6;

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleScreenResize = (): number => {
    // Use a formula or any logic you prefer to calculate the scale based on the window width
    //console.log(screenWidth / 2300);
    return (screenWidth / 2300) * scaleFactor; // You can adjust this formula based on your requirements
  };

  const info = {
    firstname: pdfRenderedProps.firstname,
    lastname: pdfRenderedProps.lastname,
    title: pdfRenderedProps.title,
    email: pdfRenderedProps.email,
    phoneNo: pdfRenderedProps.phoneNo,
    education: pdfRenderedProps.education,
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ): void => {
    const value = e.target.value;
    setUserDisplayedInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));

    // Clear the existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout for delayed update to pdfRenderedProps
    const newTimeoutId = setTimeout(() => {
      setPdfRenderedProps((prevUserInfo) => ({
        ...prevUserInfo,
        [field]: value,
      }));
    }, 850); // Set your desired delay in milliseconds

    // Update the state with the new timeout ID
    setTimeoutId(newTimeoutId);
  };

  
  const handleEducationSave = (index: number, data: any) => {
    setPdfRenderedProps((prevProps) => {
      const newEducationArray = [...prevProps.education];
      newEducationArray[index] = data;

      return {
        ...prevProps,
        education: newEducationArray,
      };
    });
  };

  // Render EducationForm components based on the pdfRenderedProps
  const educationForms = pdfRenderedProps.education.map((data, index) => (
    <EducationForm
      key={index}
      formStyle=""
      index={index}
      data={data}
      onSave={handleEducationSave}
    />
  ));

  return (
    <div className="relative h-[100vh] overflow-y-hidden">
      <div className="nav flex py-[1.2em] px-[2em] relative z-20 top-0 bottom-auto">
        <b>Sketch.cv</b>
      </div>
      <div className="home flex flex-wrap gap-[1.3em] justify-center center-align h-[100%] px-[2em] pt-[2em]">
        <div className="flex flex-col gap-2 h-[100%] overflow-y-hidden bg-grey">
          <div className="form-section min-w-[400px] relative rounded-[0.75em]">
            <div className="px-[1.2em] py-[1.6em] w-[400px] bg-white rounded-[0.6em] sticky top-0 z-20 shadow-lg">
              <b>Resume</b>
            </div>

            <PersonalDetails
              formStyle="form-card pb-[1em]"
              onFirstNameChange={(e) => handleChange(e, "firstname")}
              onLastNameChange={(e) => handleChange(e, "lastname")}
            />
            <div className="form-card">{educationForms}</div>
            <div className="form-card">
              <p>fhfhfh</p>
            </div>
            <div className="form-card">
              <p>fhfhfh</p>
            </div>
            <div className="form-card">
              <p>fhfhfh</p>
            </div>
          </div>
        </div>

        <div className="w-auto flex flex-col justify-center center-align w-[max-content]  h-[100%] overflow-y-hidden bg-white px-[1.5em] pb-[2.4em] rounded-[0.75em] shadow-md desktop">
          <div className="m-auto grid place-items-center w-[fit-content] h-[fit-content] overflow-y-scroll">
            <PdfSection
              className=" pt-[2em] m-auto"
              handleScreenResize={handleScreenResize}
              info={info}
              scaleFactor={scaleFactor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
