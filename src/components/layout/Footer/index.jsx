function Footer() {
    return (
        <footer className="border-t-2 border-t-accent-soft p-3 md:p-5 flex items-center justify-between flex-wrap gap-3">
            <p className="text-muted-text">@ {new Date().getFullYear()} DataStore Admin Panel. All systems operational.</p>
        </footer>
    )
}

export default Footer;