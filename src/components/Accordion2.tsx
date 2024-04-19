import React, { useRef } from "react";
import Icon from "../Icon";
import "./styles/accordion2.css";

interface Accordion2Props {
	onAdd: (field: string, defaultObject: any) => void;
	onDelete: (field: string, index: number) => void;
	defaultObject: any;
	field: string;
	accordionData: { title: string; content: any; visible: boolean }[];
	onToggleVisibility: (field: any, index: number) => void;
	onAccordionClose?: () => void;
	placeholder?: string;
	activeIndex: number | null;
	setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const Accordion2: React.FC<Accordion2Props> = ({
	onAdd,
	onDelete,
	defaultObject,
	field,
	accordionData,
	onToggleVisibility,
	activeIndex,
	setActiveIndex
}) => {
	//const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const addNewRef = useRef<HTMLButtonElement>(null);

	const handleAccordionClick = (index: number) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleAccordionClose = () => {
		setActiveIndex(null);
	};

	const handleToggleVisibility = (index: number) => {
		handleAccordionClick(index);
		onToggleVisibility(field, index);
	};

	const handleAddNewItem = () => {
		onAdd(field, defaultObject);
		setActiveIndex(null);
		if (addNewRef.current) {
			addNewRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	const handleDeleteItem = (index: number) => {
		onDelete(field, index);
		handleAccordionClick(index);
	};

	return (
		
		<div className="bg-white">
			{accordionData.map((section, index) => (
				<div
					key={index}
					className={`accordion-section2 ${
						activeIndex !== null && activeIndex !== index
							? "hidden"
							: ""
					}`}>
					<div
						className={`accordion2-header cursor-pointer flex ${
							activeIndex === index ? "hidden" : ""
						}`}
						onClick={() => handleAccordionClick(index)}>
						<p className="accordion2-title">
							<b>
								{section.title === ""
									? "Click here to add new content"
									: section.title}
							</b>
						</p>
						{/*index !== 0 && (
              <>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="accordion-btn mr-0 ml-auto"
                >
                  <Icon src='/trash.svg' />
                </button>
              </>
            )*/}
						<button
							onClick={() => handleToggleVisibility(index)}
							className="accordion-btn mr-0 ml-auto grid">
							<Icon
								src={`${
									section.visible
										? "/eye.svg"
										: "eye-slash.svg"
								}`}
								className="my-auto mr-[0.4em]"
							/>
						</button>
					</div>
					{activeIndex === index && (
						<div className="flex  flex-col gap-[1em]">
							<div className="">{section.content}</div>
							<div className="flex ">
								<div className="w-[100%] flex gap-2 justify-center center-align">
									{index !== 0 && (
										<button
											onClick={() =>
												handleDeleteItem(index)
											}
											className=" ml-0 mr-auto secondary">
											<b className="m-auto text-[0.95 em] ">
												Delete
											</b>
										</button>
									)}
									<div className=" flex mr-0 ml-auto  gap-2 justify-center center-align">
										<button onClick={handleAccordionClose} className="hidden md:block secondary">
											<p className="h-[fit-content] m-auto cursor-pointer">
												<b>Close</b>
											</p>
										</button>

                    <button onClick={handleAccordionClose} className="block md:hidden secondary">
											<p className=" h-[fit-content] m-auto cursor-pointer">
												<b>Close</b>
											</p>
										</button>

										<p className="h-[fit-content] m-auto">
											|
										</p>
										<button
											onClick={handleAccordionClose}
											className="accordion-btn btn-primary flex gap-1 justify-center center-align">
											<Icon
												src="/tick-circle.svg"
												className="my-auto"
												style={{
													maxheight: "18px",
													maxWidth: "18px",
												}}
											/>
											<p>Save</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			))}
			<div
				className={`grid place-items-center mb-[-0.6em] ${
					activeIndex !== null ? "hidden" : ""
				}`}>
				<button
					ref={addNewRef}
					onClick={handleAddNewItem}
					className="flex gap-1 md:min-w-[40%] btn accordion-btn mx-auto btn-dotted">
					Add New{" "}
					<img
						src="add.svg"
						className=" h-[20px] w-[20px]"
						alt="Add"
					/>
				</button>
			</div>
		</div>
		
	);
};

export default Accordion2;
