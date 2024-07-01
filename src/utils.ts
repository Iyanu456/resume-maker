export function convertToMilliseconds(hours: number = 0, minutes: number = 0, seconds: number = 0): number {
    const millisecondsPerHour = 60 * 60 * 1000;
    const millisecondsPerMinute = 60 * 1000;
    const millisecondsPerSecond = 1000;

    return (hours * millisecondsPerHour) + (minutes * millisecondsPerMinute) + (seconds * millisecondsPerSecond);
}