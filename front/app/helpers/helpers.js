function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function getTimeLeftFormat(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
}