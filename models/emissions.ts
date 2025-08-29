export type EmissionEntry = {
    id: string
    date: string // ISO "2025-08-29"
    category: "Energy" | "Transport" | "Food" | "Purchases" | "Waste"
    scope: "Scope 1" | "Scope 2" | "Scope 3"
    amount: number // kg CO2e
    note?: string
}
