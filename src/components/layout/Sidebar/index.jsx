import Button from "@components/UI/Button";
import { useLogoutConfirmationContext } from "@contexts/LogoutConfirmationContext";
import { faAddressCard, faBolt, faBriefcase, faDatabase, faExternalLinkAlt, faLayerGroup, faRightFromBracket, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const links = [
    { to: "/dashboard/projects", label: "Projects", icon: faLayerGroup },
    { to: "/dashboard/skills", label: "Skills", icon: faBolt },
    { to: "/dashboard/services", label: "Services", icon: faBriefcase },
    { to: "/dashboard/profile", label: "Profile", icon: faUser },
    { href: import.meta.env.VITE_SUPABASE_PROJECT_URL, label: "Supabase", icon: faDatabase },
    { href: "https://k7reef-frontend.vercel.app/", label: "Portfolio", icon: faAddressCard },
];

function Sidebar() {

    const { isLoading, openModal } = useLogoutConfirmationContext();

    return (
        <aside className="bg-card-bg h-screen w-15 lg:w-80 border-e-2 border-e-accent-soft flex flex-col">
            {/* Header */}
            <div className="sidebar-header p-3 lg:p-5 text-lg lg:text-2xl font-semibold border-b-2 border-b-accent-soft flex items-center gap-3">
                <div className="icon w-10 h-10 rounded-xl flex items-center justify-center bg-primary">
                    <FontAwesomeIcon icon={faDatabase} />
                </div>
                <span className="max-lg:hidden">DATASTORE</span>
            </div>
            {/* Body */}
            <div className="sidebar-body p-3 lg:p-5">
                <ul className="sidebar-links space-y-2">
                    {
                        links.map((link, index) => (<li key={index}>
                            {
                                link.href ? (
                                    <a
                                        target="_blank"
                                        href={link.href}
                                        title={link.label}
                                        rel="noreferrer"
                                        aria-label={link.label}
                                        className="font-medium text-lg px-3 py-2 flex items-center max-lg:justify-center gap-2 rounded-2xl border-2 border-transparent text-muted-text sm:hover:text-primary sm:hover:bg-accent-soft sm:hover:border-primary/70 transition-colors will-change-auto"
                                    >
                                        <FontAwesomeIcon icon={link.icon} />
                                        <span className="max-lg:hidden">{link.label}</span>
                                        <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-auto max-lg:hidden!" />
                                    </a>
                                ) : (
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) => `font-medium text-lg px-3 py-2 flex items-center max-lg:justify-center gap-2 rounded-2xl border-2 transition-colors will-change-auto ${isActive ? "text-primary bg-accent-soft border-primary/70" : "border-transparent text-muted-text sm:hover:text-primary sm:hover:bg-accent-soft sm:hover:border-primary/70"}`}
                                    >
                                        <FontAwesomeIcon icon={link.icon} />
                                        <span className="max-lg:hidden">{link.label}</span>
                                    </NavLink>
                                )
                            }
                        </li>))
                    }
                </ul>
            </div>
            <div className="footer p-3 lg:p-5 mt-auto">
                {/* Logout */}
                <Button
                    type="button"
                    title="Logout"
                    variant="danger"
                    disabled={false}
                    aria-label="Logout"
                    onClick={openModal}
                    className="w-full flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={isLoading ? faSpinner : faRightFromBracket} {...(isLoading ? { className: "animate-spin" } : {})} />
                    <span className="max-lg:hidden">Logout</span>
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar;