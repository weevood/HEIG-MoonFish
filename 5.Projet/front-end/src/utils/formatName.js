import capitalize from "@/utils/capitalize";

export default function formatName(firstName, lastName) {
		return capitalize(firstName) + ' ' + capitalize(lastName)
}
