export function canCancelAppointment(dateTime) {
  const appointmentDate = new Date(dateTime);
  const now = new Date();
  const differenceInMs = appointmentDate.getTime() - now.getTime();
  const hours = differenceInMs / 1000 / 60 / 60;

  return hours >= 24;
}
