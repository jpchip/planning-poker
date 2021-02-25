export function getRoomFromUrl(): string {
    const url = new URL(window.location.href);
    const room = url.searchParams.get("room");
    return room || '';
}