function lerp(currentValue, DestinatioValue, Time) {
    return currentValue * (1 - Time) + DestinatioValue * Time;
}