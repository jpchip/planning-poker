export function getRoomFromUrl(): string {
    const url = new URL(window.location.href);
    const room = url.searchParams.get("room");
    return room || '';
}

export function setRoomToUrl(room: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set('room', room);
    window.history.replaceState({}, room, url.toString());
}