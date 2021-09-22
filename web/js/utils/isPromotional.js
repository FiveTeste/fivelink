const getDateInstance = (dateStr) => {
  const [year, month, day] = dateStr.split("/");
  return new Date(+year, +month - 1, +day);
}

export const isPromotional = (product) => {
  const currentDate = new Date();

  // VALIDA O DIA
  const isDayAvailable = (() => {
    const weekDays = JSON.parse(product.PROMO_DIAS_SEMANA);
    if (Array.isArray(weekDays) && weekDays.length > 0) {
      return weekDays.includes(currentDate.getDay());
    } else {
      const startDate = getDateInstance(product.DT_INICIO_PROMOCAO);
      const endDate = getDateInstance(product.DT_FIM_PROMOCAO);
      endDate.setHours(23, 59, 59);

      const afterStart = startDate.getTime() <= currentDate.getTime();
      const beforeEnd = endDate.getTime() >= currentDate.getTime();

      return afterStart && beforeEnd;
    }
  })();

  if (!isDayAvailable) return false;

  // VALIDA A HORA
  const timeStartArr = product.HORA_INICIO_PROMOCAO.split(":");
  const timeEndArr = product.HORA_FIM_PROMOCAO.split(":");

  const timeStart = new Date();
  timeStart.setHours(...timeStartArr);
  const timeEnd = new Date();
  timeEnd.setHours(...timeEndArr);

  const afterStart = timeStart.getTime() <= currentDate.getTime();
  const beforeEnd = timeEnd.getTime() >= currentDate.getTime();

  return afterStart && beforeEnd;
}