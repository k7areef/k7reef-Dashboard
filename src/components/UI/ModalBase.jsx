/**
 * @typedef {Object} ModalBaseProps
 * @prop {React.ReactNode} children
 * @prop {boolean} isOpen
 * @prop {function} closeModal
 */

import React from "react";
import { createPortal } from "react-dom";

/**
 * @param {ModalBaseProps} props
 */

function ModalBase({ children, isOpen, closeModal }) {

    if (!isOpen) return null;

    return (
        <React.Fragment>
            {
                createPortal(<div
                    onClick={closeModal}
                    className="modal-base min-h-screen py-5 left-0 top-0 w-full fixed z-100 bg-card-bg/20 backdrop-blur-lg flex items-center justify-center"
                >
                    <div className="container">
                        {children}
                    </div>
                </div>,
                    document.getElementById("root-modal")
                )
            }
        </React.Fragment>
    )
}

export default ModalBase;