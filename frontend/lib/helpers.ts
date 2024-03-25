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
