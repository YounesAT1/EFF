export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

interface Person {
  firstName: string;
  lastName: string;
}

export function getInitials(person: Person): string {
  const firstNameInitial = person.firstName.charAt(0).toUpperCase();
  const lastNameInitial = person.lastName.charAt(0).toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
}

export const formatTime = (time: string) => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Utility function to format duration to HH MM
export const formatDuration = (durationMs: number) => {
  const hours = Math.floor(durationMs / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  return `${hours}h ${minutes}m`;
};

export const formatDurationString = (duration: string): string => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
  const match = duration.match(regex);
  if (match) {
    const hours = match[1] ? parseInt(match[1]) : "00";
    const minutes = match[2] ? parseInt(match[2]) : "00";
    return `${hours}h ${minutes}m`;
  }
  return "";
};

export function formatDate(dateString: any) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = dateString.split("-");
  const formattedDate = new Date(year, month - 1, day);
  const dayOfWeek = formattedDate.toLocaleDateString("en", { weekday: "long" });
  const monthName = months[formattedDate.getMonth()];
  const dayOfMonth = formattedDate.getDate();

  return `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year}`;
}

export function formatSegemntDuration(duration: any) {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} h ${minutes} m`;
}

export function encodeData(data: any) {
  return encodeURIComponent(JSON.stringify(data));
}

export function decodeData(dataString: any) {
  return JSON.parse(decodeURIComponent(dataString));
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCardType = (partialCardNumber: any) => {
  if (!partialCardNumber || typeof partialCardNumber !== "string") {
    return null;
  }

  const visaPrefixes = ["4"];
  const mastercardPrefixes = ["51", "52", "53", "54", "55"];

  const sanitizedCardNumber = partialCardNumber.replace(/\s/g, "");
  const firstDigits = sanitizedCardNumber.slice(0, 2);

  if (visaPrefixes.includes(firstDigits)) {
    return "visa";
  } else if (mastercardPrefixes.includes(firstDigits)) {
    return "masterCard";
  } else {
    return null;
  }
};

export const steps = [
  {
    id: "Step one",
    name: "Personal information",
    fields: [
      "email",
      "gender",
      "title",
      "firstName",
      "lastName",
      "nationality",
      "dateOfBirth",
      "phoneNumber",
      "passportNumber",
      "passportExpirationDate",
    ],
  },
  {
    id: "Step two",
    name: "Payment details",
    fields: [
      "cardHolderFirstName",
      "cardHolderLastName",
      "cardNumber",
      "cardExperationDate",
      "cardCVV",
    ],
  },
  {
    id: "Step three",
    name: "Over view",
    fields: [],
  },
];
