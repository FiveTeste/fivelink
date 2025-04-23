const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];


export const isOpen = () => {
  if (window.empresa.aceitando_pedidos == 0) return false;
  
  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  if (!window.empresa[dayOfWeek]) return false;

  const timeStartArr = window.empresa.HORA_INICIO.split(":");
  const timeEndArr = window.empresa.HORA_FIM.split(":");

  const timeStart = new Date();
  timeStart.setHours(...timeStartArr);
  const timeEnd = new Date();
  timeEnd.setHours(...timeEndArr);

  const afterStart = timeStart.getTime() <= currentDate.getTime();
  const beforeEnd = timeEnd.getTime() >= currentDate.getTime();

  return afterStart && beforeEnd;
}