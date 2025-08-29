export default function ChartLoading({ height = 280 }: { height?: number }) {
    return (
        <div
            style={{
                height,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                background: "linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 37%,#f3f4f6 63%)",
                backgroundSize: "400% 100%",
                animation: "pulse 1.2s ease-in-out infinite",
            }}>
            <style>{`@keyframes pulse{0%{background-position:100% 50%}100%{background-position:0 50%}}`}</style>
        </div>
    )
}
