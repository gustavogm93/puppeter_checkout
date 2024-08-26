function getFormattedDateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const months = [
        '1', '2', '3', '4', '5', '6',
        '7', '8', '9', '10', '11', '12'
    ];
    const month = months[now.getMonth()];
    const day = now.getDate();

    return `${hours}:${minutes}:${seconds} ${day}/${month} `;
}

module.exports = {getFormattedDateTime}; 