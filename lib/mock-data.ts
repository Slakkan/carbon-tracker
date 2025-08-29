export const COLORS = {
    deepBlue: "#005A9C",
    brightGreen: "#78BE20",
    lightSky: "#A6DAF1",
    lightGrey: "#9CA3AF",
    orange: "#FF6F3C",
    white: "#FFFFFF",
    gray100: "#f5f5f5",
    gray700: "#374151",
}

export const monthlyTrend = [
    { month: "Jan", co2: 820 },
    { month: "Feb", co2: 790 },
    { month: "Mar", co2: 760 },
    { month: "Apr", co2: 740 },
    { month: "May", co2: 715 },
    { month: "Jun", co2: 690 },
    { month: "Jul", co2: 670 },
    { month: "Aug", co2: 650 },
    { month: "Sep", co2: 640 },
    { month: "Oct", co2: 630 },
    { month: "Nov", co2: 625 },
    { month: "Dec", co2: 610 },
]

export const categoryBreakdown = [
    { name: "Energy", value: 310 },
    { name: "Transport", value: 210 },
    { name: "Food", value: 120 },
    { name: "Purchases", value: 90 },
    { name: "Waste", value: 40 },
]

export const scopeBars = [
    { scope: "Scope 1", value: 180 },
    { scope: "Scope 2", value: 250 },
    { scope: "Scope 3", value: 260 },
]

export const currentFootprint = 610
export const lastMonth = 630
export const delta = currentFootprint - lastMonth
export const goal = 550
export const progressPct = Math.min(100, Math.round((goal / currentFootprint) * 100))
export const offset = 120

export const gaugeData = [{ name: "progress", value: progressPct, fill: COLORS.brightGreen }]
