export function SocialProof() {
    return (
        <section className="border-y bg-muted/20 py-12">
            <div className="container text-center">
                <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Trusted by operators managing 1,500+ locations combined
                </p>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                    {/* Placeholders for anonymized or generic enterprise logos */}
                    <div className="flex items-center text-xl font-bold text-foreground/80">
                        <span className="mr-2 text-2xl">⚡</span> RapidResponse
                    </div>
                    <div className="flex items-center text-xl font-bold text-foreground/80">
                        <span className="mr-2 text-2xl">🏨</span> HospitalityOne
                    </div>
                    <div className="flex items-center text-xl font-bold text-foreground/80">
                        <span className="mr-2 text-2xl">🛠️</span> ProFix National
                    </div>
                    <div className="flex items-center text-xl font-bold text-foreground/80">
                        <span className="mr-2 text-2xl">🍔</span> BurgerBest Corp
                    </div>
                    <div className="flex items-center text-xl font-bold text-foreground/80">
                        <span className="mr-2 text-2xl">🧹</span> CleanCrew
                    </div>
                </div>
            </div>
        </section>
    )
}
