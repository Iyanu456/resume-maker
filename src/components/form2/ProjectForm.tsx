import InputLabel from "../InputLabel";
interface projectProps {
    data: {
        project: string;
        about: string;
        description: string;
        duration: string;
    };
    handleChange: (
        userDetails: string,
        index: any,
        field: string,
        event: any
    ) => any;
    index: any;
}
export default function ProjectForm(props: projectProps) {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {/* Personal Info Form */}
           
                <div className="flex flex-col gap-1">
                    <div>
                        <InputLabel
                            type="text"
                            value={props.data.project}
                            handleChange={(e) =>
                                props.handleChange(
                                    "project",
                                    props.index,
                                    "project",
                                    e.target.value
                                )
                            }
                            label="Project Name"
                        />
                    </div>
                    <div>
                        <InputLabel
                            type="text"
                            value={props.data.about}
                            handleChange={(e) =>
                                props.handleChange(
                                    "project",
                                    props.index,
                                    "about",
                                    e.target.value
                                )
                            }
                            label="Short description"
                        />
                    </div>
                    <div>
                        {" "}
                        <InputLabel
                            type="text"
                            value={props.data.description}
                            handleChange={(e) =>
                                props.handleChange(
                                    "project",
                                    props.index,
                                    "description",
                                    e.target.value
                                )
                            }
                            label="About project"
                        />
                    </div>
                    <div>
                        {" "}
                        <InputLabel
                            type="text"
                            value={props.data.duration}
                            handleChange={(e) =>
                                props.handleChange(
                                    "project",
                                    props.index,
                                    "duration",
                                    e.target.value
                                )
                            }
                            label="Duration"
                        />
                    </div>
                </div>
        </form>
    );
}
