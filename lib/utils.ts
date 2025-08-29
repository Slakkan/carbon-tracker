export function sleep(min = 200, max = 800) {
    const delay = min + Math.random() * (max - min)
    return new Promise((resolve) => setTimeout(resolve, delay))
}
