export const getTime = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const amOrPm = currentHour >= 12 ? "PM" : "AM";

  return amOrPm;
};

export default getTime;
