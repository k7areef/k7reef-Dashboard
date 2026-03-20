/**
 * @typedef {Object} ProfileProps
 * @property {Object} appConfig
 * @property {boolean} isLoading
 */

import { Link } from "react-router-dom";
import SectionHeader from "./components/SectionHeader";
import React from "react";

/**
 * @param {ProfileProps} props
 */

function Profile({ appConfig, isLoading }) {

    const {
        contact_info
    } = appConfig || {};

    return (
        <section className="profile-section" id="profile">
            {/* Header */}
            <SectionHeader
                title="Profile"
                description="View and edit your profile settings."
            />
            {/* Content */}
            {
                isLoading ? (
                    <>Loading...</>
                ) : (
                    <div className="content space-y-5">
                        {/* Contact Info */}
                        <div className="contact-info bg-card-bg text-white p-5 rounded-lg border-2 border-accent-soft space-y-5">
                            {/* Title */}
                            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">Contact Info</h2>
                            {/* Info */}
                            <div className="info grid grid-cols-1 2xl:grid-cols-2 gap-5">
                                {
                                    contact_info && (
                                        Object.keys(contact_info).map((key, index) => (<div className={`${key}-info space-y-2`} key={index}>
                                            <div className="header mb-3">
                                                <h3 className="font-medium sm:text-lg">{"->"} {contact_info[key].name}</h3>
                                            </div>
                                            {/* Info */}
                                            <div className="info space-y-2 p-3 bg-dark-bg border-2 border-accent-soft rounded-md *:[&>span]:last-of-type:font-medium *:[&>span]:first-of-type:text-muted-text *:[&>span]:first-of-type:text-sm">
                                                {/* Name */}
                                                <div className={`${key}-name`}>
                                                    <span>Name: </span>
                                                    <span>{contact_info[key].name}</span>
                                                </div>
                                                {/* Value */}
                                                <div className={`${key}-value`}>
                                                    <span>Value: </span>
                                                    <a
                                                        href={contact_info[key].value}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="underline"
                                                        title={contact_info[key].value}
                                                    >{contact_info[key].value}</a>
                                                </div>
                                                {/* label */}
                                                <div className={`${key}-label`}>
                                                    <span>Label: </span>
                                                    <span>{contact_info[key].label}</span>
                                                </div>
                                                {/* Icon */}
                                                <div className={`${key}-icon flex items-center gap-2`}>
                                                    <span>Icon: </span>
                                                    <img
                                                        src={contact_info[key].icon_url}
                                                        alt={contact_info[key].name}
                                                        className="sm:w-7.5"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        ))
                                    )
                                }
                            </div>
                            {/* Separator */}
                            <hr className="border-t-accent-soft" />
                            {/* Actions */}
                            <div className="actions flex items-center justify-end gap-3">
                                {/* Edit */}
                                <Link
                                    to={`/dashboard/profile`}
                                    className="underline text-primary font-medium shrink-0 sm:hover:text-primary/80 block w-fit"
                                >
                                    Edit Contact Info
                                </Link>
                            </div>
                        </div>
                        {/* Social Profiles */}
                        <div className="social-profiles bg-card-bg text-white p-5 rounded-lg border-2 border-accent-soft space-y-5">
                            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">Social Profiles</h2>
                            {/* Separator */}
                            <hr className="border-t-accent-soft" />
                            {/* Actions */}
                            <div className="actions flex items-center justify-end gap-3">
                                {/* Edit */}
                                <Link
                                    to={`/dashboard/profile`}
                                    className="underline text-primary font-medium shrink-0 sm:hover:text-primary/80 block w-fit"
                                >
                                    Edit Social Profiles
                                </Link>
                            </div>
                        </div>
                        {/* Cv / Resume */}
                        <div className="cv-resume bg-card-bg text-white p-5 rounded-lg border-2 border-accent-soft space-y-5">
                            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">Cv / Resume</h2>
                            {/* Separator */}
                            <hr className="border-t-accent-soft" />
                            {/* Actions */}
                            <div className="actions flex items-center justify-end gap-3">
                                {/* Edit */}
                                <Link
                                    to={`/dashboard/profile`}
                                    className="underline text-primary font-medium shrink-0 sm:hover:text-primary/80 block w-fit"
                                >
                                    Edit Cv
                                </Link>
                            </div>
                        </div>
                        {/* App Settings */}
                        <div className="app-settings bg-card-bg text-white p-5 rounded-lg border-2 border-accent-soft space-y-5">
                            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">App Settings</h2>
                            {/* Separator */}
                            <hr className="border-t-accent-soft" />
                            {/* Actions */}
                            <div className="actions flex items-center justify-end gap-3">
                                {/* Edit */}
                                <Link
                                    to={`/dashboard/profile`}
                                    className="underline text-primary font-medium shrink-0 sm:hover:text-primary/80 block w-fit"
                                >
                                    Edit Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default Profile;