const getGreetings = (hour: number): string => {
  if (hour < 12) {
    return 'Buenos días';
  } else if (hour >= 18) {
    return 'Buenas noches';
  } else {
    return 'Buenas tardes';
  }
};

const useGreetings = () => {
  const hour = new Date(Date.now()).getHours();

  return getGreetings(hour);
};

export default useGreetings;
