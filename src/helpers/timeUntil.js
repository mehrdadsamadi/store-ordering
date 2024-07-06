// let count = 0

export function timeUntil(endTime) {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end - now;

    if (difference <= 0) {
        findLowestBid()
    }

    const minutes = Math.floor(difference / 1000 / 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${minutes} : ${seconds}`;
}

const findLowestBid = async () => {
    await fetch("/api/orders/bidding/findLowestBid", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
    })
}