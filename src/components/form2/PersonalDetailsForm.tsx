import InputLabel from "../InputLabel";
import { PersonalInfoProps } from "../../types/usertypes";

interface personalProps {
  data: PersonalInfoProps;
  handleChange: (
    userDetails: string,
    index: any,
    field: string,
    event: any
  ) => any;
  handleAccordionClose: () => void
  index: any;
}
export default function PersonalDetailsForm(props: personalProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Personal Info Form */}
      <div className="flex flex-col gap-1">
        <InputLabel
          label="Full Name"
          type="text"
          value={props.data.fullname}
          handleChange={(e: any) =>
            props.handleChange(
              "personalInfo",
              props.index,
              "fullname",
              e.target.value
            )
          }
          placeholder="Enter your first and last name"
        />

        <InputLabel
          label="Job Title"
          type="text"
          value={props.data.jobTitle}
          handleChange={(e) =>
            props.handleChange(
              "personalInfo",
              props.index,
              "jobTitle",
              e.target.value
            )
          }
          placeholder="Enter Job Title"
        />

        <InputLabel
          label="Email"
          type="text"
          value={props.data.email}
          handleChange={(e) =>
            props.handleChange(
              "personalInfo",
              props.index,
              "email",
              e.target.value
            )
          }
          placeholder="Email"
        />

        <InputLabel
          label="Website"
          type="text"
          value={props.data.website}
          handleChange={(e) =>
            props.handleChange(
              "personalInfo",
              props.index,
              "website",
              e.target.value
            )
          }
          placeholder="Website"
        />
        <InputLabel
          label="Phone"
          type="text"
          value={props.data.phone}
          handleChange={(e) =>
            props.handleChange(
              "personalInfo",
              props.index,
              "phone",
              e.target.value
            )
          }
          placeholder="Phone number"
        />
        <div className="mt-3 flex">
		<button onClick={props.handleAccordionClose} className="block secondary">
			<p className=" h-[fit-content] m-auto cursor-pointer">
				<b>Close</b>
			</p>
		</button>
          <div className="flex gap-2 mr-0 ml-auto">
            <button onClick={props.handleAccordionClose} className="accordion-btn btn-primary flex gap-1 justify-center center-align">
              <p>Save</p>
            </button>
          </div>
		  
        </div>
      </div>
    </form>
  );
}
