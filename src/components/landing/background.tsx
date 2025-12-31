export const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }}
        />
        <div
            className="absolute inset-0"
            style={{
                background:
                    "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(99,102,241,0.15), transparent)",
            }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
);
