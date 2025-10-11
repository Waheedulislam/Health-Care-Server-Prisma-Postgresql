import { addHours, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const currentDate = new Date(startDate);
  console.log(currentDate);
  const lastDate = new Date(endDate);
  console.log(lastDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addHours(
        `${format(currentDate, "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0])
      )
    );
    const endDateTime = new Date(
      addHours(
        `${format(lastDate, "yyyy-MM-dd")}`,
        Number(endTime.split(":")[0])
      )
    );

    while (startDateTime <= endDateTime) {}
  }
};

export const SchedulesServices = {
  insertIntoDB,
};
