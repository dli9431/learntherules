function Timer({ currTime }: { currTime: number }) {
  const seconds = currTime;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
    </div>
  );
}

export default Timer;