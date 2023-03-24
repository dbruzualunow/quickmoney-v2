

export const alazar = (min, max, current) => {
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    if (current && random === current) {
        return alazar(min, max, current)
    }
    return random
}