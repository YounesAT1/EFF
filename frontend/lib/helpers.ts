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
  const regex = /PT(\d+)H(\d+)M/;
  const match = duration.match(regex);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
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
