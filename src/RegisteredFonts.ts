import { Font } from "@react-pdf/renderer";

export const RegisterFont = () => {
	Font.register({
		family: "Poppins",
		fonts: [
			{ src: "/Poppins-Regular.ttf", fontWeight: "normal" },
			{ src: "/Poppins-Bold.ttf", fontWeight: "bold" },
			{ src: "/Poppins-SemiBold.ttf", fontWeight: "semibold" },
		],
	});
	Font.register({
		family: "Inter",
		fonts: [
			{ src: "/Inter-Regular.ttf", fontWeight: "normal" },
			{ src: "/Inter-Bold.ttf", fontWeight: "bold" },
		],
	});
	Font.register({
		family: "Calibri",
		fonts: [
			{ src: "/Calibri.ttf", fontWeight: "normal" },
			{ src: "/Calibri-bold.ttf", fontWeight: "bold" },
		],
	});
};
