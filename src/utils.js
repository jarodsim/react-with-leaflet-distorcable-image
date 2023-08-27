export function orderCornersClockwise(corners) {
    const center = {
        lat: corners.reduce((sum, corner) => sum + corner.lat, 0) / corners.length,
        lng: corners.reduce((sum, corner) => sum + corner.lng, 0) / corners.length,
    };

    const sortedCorners = corners.sort((a, b) => {
        const angleA = Math.atan2(a.lat - center.lat, a.lng - center.lng);
        const angleB = Math.atan2(b.lat - center.lat, b.lng - center.lng);
        return angleA - angleB;
    });

    return sortedCorners;
};