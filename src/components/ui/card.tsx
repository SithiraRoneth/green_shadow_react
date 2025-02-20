export function Card({ children }: { children: React.ReactNode }) {
    return <div className="shadow-lg p-4 rounded-lg bg-white">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-2">{children}</div>;
}
