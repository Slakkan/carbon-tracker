"use client"

import dynamic from "next/dynamic"

import Footer from "@/components/footer"
import Header from "@/components/header"
import DashboardLoading from "@/components/dashboard-loading"

const Dashboard = dynamic(() => import("@/components/dashboard"), {
    ssr: false,
    loading: () => <DashboardLoading />,
})

export default function Home() {
    return (
        <div className='app'>
            <Header />
            <Dashboard />
            <Footer />
        </div>
    )
}
