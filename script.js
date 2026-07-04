/* =========================================================
   NOVA EVENTS
   WEBINAR / LIVE WORKSHOP LANDING PAGE
   FILE: script.js
========================================================= */

"use strict";


/* =========================================================
   1. EVENT CONFIGURATION
   உன் event details இங்கே change பண்ணலாம்
========================================================= */

const EVENT_CONFIG = {
    title: "Build Better Interfaces — Free Live Workshop",

    description:
        "A practical live workshop for designers and developers who want to create clearer, faster and more conversion-focused digital experiences.",

    location: "Online via Zoom",

    /*
     * Event starts:
     * 15 August 2026, 7:00 PM IST
     */
    startDate: new Date("2026-08-15T19:00:00+05:30"),

    /*
     * Event ends:
     * 15 August 2026, 8:30 PM IST
     */
    endDate: new Date("2026-08-15T20:30:00+05:30"),

    website:
        window.location.protocol === "file:"
            ? "https://example.com/build-better-interfaces"
            : window.location.href.split("#")[0]
};


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const header =
    document.querySelector(".site-header");

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");

const registrationForm =
    document.getElementById("registration-form");

const formView =
    document.getElementById("form-view");

const successView =
    document.getElementById("success-view");

const successName =
    document.getElementById("success-name");

const submitButton =
    registrationForm?.querySelector(".form-submit");

const googleCalendarLink =
    document.getElementById("google-calendar-link");

const downloadIcsButton =
    document.getElementById("download-ics");

const registerAnotherButton =
    document.getElementById("register-another");

const toast =
    document.getElementById("toast");


/* =========================================================
   3. HELPER FUNCTIONS
========================================================= */

function padNumber(number) {
    return String(number).padStart(2, "0");
}


function scrollToElement(selector) {
    const element =
        document.querySelector(selector);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function closeMobileMenu() {
    if (!menuButton || !mobileMenu) {
        return;
    }

    menuButton.classList.remove("is-active");

    mobileMenu.classList.remove("is-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove("menu-open");
}


function showToast(message) {
    if (!toast) {
        return;
    }

    const toastText =
        toast.querySelector("span");

    if (toastText) {
        toastText.textContent = message;
    }

    toast.classList.add("is-visible");

    window.clearTimeout(
        showToast.timeoutId
    );

    showToast.timeoutId =
        window.setTimeout(() => {
            toast.classList.remove("is-visible");
        }, 2600);
}


function formatCalendarDate(date) {
    return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
}


/* =========================================================
   4. HEADER SCROLL EFFECT
========================================================= */

function updateHeaderState() {
    if (!header) {
        return;
    }

    header.classList.toggle(
        "is-scrolled",
        window.scrollY > 20
    );
}


window.addEventListener(
    "scroll",
    updateHeaderState,
    {
        passive: true
    }
);


updateHeaderState();


/* =========================================================
   5. MOBILE MENU
========================================================= */

menuButton?.addEventListener(
    "click",
    () => {
        const isOpen =
            mobileMenu.classList.toggle("is-open");

        menuButton.classList.toggle(
            "is-active",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );
    }
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {
        link.addEventListener(
            "click",
            closeMobileMenu
        );
    });


window.addEventListener(
    "resize",
    () => {
        if (window.innerWidth > 920) {
            closeMobileMenu();
        }
    }
);


/* =========================================================
   6. SCROLL BUTTONS
========================================================= */

document
    .querySelectorAll("[data-scroll-register]")
    .forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                closeMobileMenu();

                scrollToElement("#register");

                window.setTimeout(() => {
                    document
                        .getElementById("full-name")
                        ?.focus({
                            preventScroll: true
                        });
                }, 650);
            }
        );
    });


document
    .querySelectorAll("[data-scroll-agenda]")
    .forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                scrollToElement("#agenda");
            }
        );
    });


/* =========================================================
   7. COUNTDOWN TIMER
========================================================= */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const countdownElement =
    document.getElementById("countdown");


function updateCountdown() {
    const now =
        new Date();

    const distance =
        EVENT_CONFIG.startDate.getTime() -
        now.getTime();


    /*
     * Event started or completed
     */
    if (distance <= 0) {
        if (daysElement) {
            daysElement.textContent = "00";
        }

        if (hoursElement) {
            hoursElement.textContent = "00";
        }

        if (minutesElement) {
            minutesElement.textContent = "00";
        }

        if (secondsElement) {
            secondsElement.textContent = "00";
        }

        if (countdownElement) {
            countdownElement.setAttribute(
                "aria-label",
                "The workshop has started"
            );
        }

        return;
    }


    const days = Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (
            distance /
            (1000 * 60 * 60)
        ) % 24
    );

    const minutes = Math.floor(
        (
            distance /
            (1000 * 60)
        ) % 60
    );

    const seconds = Math.floor(
        (
            distance /
            1000
        ) % 60
    );


    if (daysElement) {
        daysElement.textContent =
            padNumber(days);
    }

    if (hoursElement) {
        hoursElement.textContent =
            padNumber(hours);
    }

    if (minutesElement) {
        minutesElement.textContent =
            padNumber(minutes);
    }

    if (secondsElement) {
        secondsElement.textContent =
            padNumber(seconds);
    }
}


updateCountdown();


window.setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   8. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver" in window &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {
    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px"
            }
        );


    revealElements.forEach(
        (element, index) => {
            element.style.transitionDelay =
                `${Math.min(index % 4, 3) * 70}ms`;

            revealObserver.observe(element);
        }
    );
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}


/* =========================================================
   9. FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(
    (item, index) => {
        const button =
            item.querySelector(".faq-question");

        if (!button) {
            return;
        }


        /*
         * First FAQ open by default
         */
        if (index === 0) {
            item.classList.add("is-open");
        }


        button.addEventListener(
            "click",
            () => {
                const willOpen =
                    !item.classList.contains("is-open");


                faqItems.forEach((faqItem) => {
                    faqItem.classList.remove(
                        "is-open"
                    );

                    faqItem
                        .querySelector(".faq-question")
                        ?.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                });


                if (willOpen) {
                    item.classList.add("is-open");

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                }
            }
        );
    }
);


/* =========================================================
   10. REGISTRATION FORM VALIDATION
========================================================= */

function getFormGroup(input) {
    return input.closest(".form-group");
}


function showFieldError(input, message) {
    const group =
        getFormGroup(input);

    if (!group) {
        return;
    }

    const errorElement =
        group.querySelector(".field-error");

    group.classList.add("has-error");

    input.setAttribute(
        "aria-invalid",
        "true"
    );

    if (errorElement) {
        errorElement.textContent = message;
    }
}


function clearFieldError(input) {
    const group =
        getFormGroup(input);

    if (!group) {
        return;
    }

    const errorElement =
        group.querySelector(".field-error");

    group.classList.remove("has-error");

    input.removeAttribute("aria-invalid");

    if (errorElement) {
        errorElement.textContent = "";
    }
}


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}


function validateRegistrationForm() {
    if (!registrationForm) {
        return false;
    }


    const fullNameInput =
        registrationForm.elements.fullName;

    const emailInput =
        registrationForm.elements.email;

    let isValid = true;


    clearFieldError(fullNameInput);

    clearFieldError(emailInput);


    /*
     * Full name validation
     */
    if (
        fullNameInput.value
            .trim()
            .length < 2
    ) {
        showFieldError(
            fullNameInput,
            "Please enter your full name."
        );

        isValid = false;
    }


    /*
     * Email validation
     */
    if (
        !isValidEmail(
            emailInput.value.trim()
        )
    ) {
        showFieldError(
            emailInput,
            "Please enter a valid email address."
        );

        isValid = false;
    }


    return isValid;
}


/*
 * Remove error when user starts typing
 */
registrationForm
    ?.querySelectorAll("input")
    .forEach((input) => {
        input.addEventListener(
            "input",
            () => {
                clearFieldError(input);
            }
        );
    });


/* =========================================================
   11. GOOGLE CALENDAR LINK
========================================================= */

function createGoogleCalendarUrl() {
    const baseUrl =
        "https://calendar.google.com/calendar/render";


    const params =
        new URLSearchParams({
            action: "TEMPLATE",

            text: EVENT_CONFIG.title,

            dates:
                `${formatCalendarDate(
                    EVENT_CONFIG.startDate
                )}` +
                "/" +
                `${formatCalendarDate(
                    EVENT_CONFIG.endDate
                )}`,

            details:
                EVENT_CONFIG.description,

            location:
                EVENT_CONFIG.location
        });


    return `${baseUrl}?${params.toString()}`;
}


if (googleCalendarLink) {
    googleCalendarLink.href =
        createGoogleCalendarUrl();
}


/* =========================================================
   12. DOWNLOAD ICS CALENDAR FILE
========================================================= */

function escapeIcsText(text) {
    return text
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");
}


function downloadCalendarFile() {
    const now =
        new Date();


    const icsContent = [
        "BEGIN:VCALENDAR",

        "VERSION:2.0",

        "PRODID:-//Nova Events//Webinar Registration//EN",

        "CALSCALE:GREGORIAN",

        "METHOD:PUBLISH",

        "BEGIN:VEVENT",

        `UID:${Date.now()}@novaevents.example`,

        `DTSTAMP:${formatCalendarDate(now)}`,

        `DTSTART:${formatCalendarDate(
            EVENT_CONFIG.startDate
        )}`,

        `DTEND:${formatCalendarDate(
            EVENT_CONFIG.endDate
        )}`,

        `SUMMARY:${escapeIcsText(
            EVENT_CONFIG.title
        )}`,

        `DESCRIPTION:${escapeIcsText(
            EVENT_CONFIG.description
        )}`,

        `LOCATION:${escapeIcsText(
            EVENT_CONFIG.location
        )}`,

        "STATUS:CONFIRMED",

        "END:VEVENT",

        "END:VCALENDAR"

    ].join("\r\n");


    const file =
        new Blob(
            [icsContent],
            {
                type: "text/calendar;charset=utf-8"
            }
        );


    const fileUrl =
        URL.createObjectURL(file);


    const temporaryLink =
        document.createElement("a");


    temporaryLink.href = fileUrl;

    temporaryLink.download =
        "build-better-interfaces-workshop.ics";


    document.body.appendChild(
        temporaryLink
    );


    temporaryLink.click();

    temporaryLink.remove();


    URL.revokeObjectURL(fileUrl);


    showToast(
        "Calendar file downloaded"
    );
}


downloadIcsButton?.addEventListener(
    "click",
    downloadCalendarFile
);


/* =========================================================
   13. REGISTRATION FORM SUBMISSION
========================================================= */

registrationForm?.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();


        /*
         * Stop if validation fails
         */
        if (!validateRegistrationForm()) {
            registrationForm
                .querySelector(
                    '[aria-invalid="true"]'
                )
                ?.focus();

            return;
        }


        const fullName =
            registrationForm
                .elements
                .fullName
                .value
                .trim();


        /*
         * Loading state
         */
        submitButton?.classList.add(
            "is-loading"
        );


        if (submitButton) {
            submitButton
                .querySelector("span")
                .textContent =
                "Confirming Registration";

            submitButton
                .querySelector("i")
                .className =
                "bi bi-arrow-repeat";
        }


        /*
         * DEMO MODE
         *
         * இப்போதைக்கு இது database-ல் save ஆகாது.
         *
         * Real registration save செய்ய:
         * - Firebase
         * - Supabase
         * - Formspree
         * - Eventbrite
         * - Backend API
         *
         * இவற்றில் ஒன்றை connect பண்ண வேண்டும்.
         */
        window.setTimeout(() => {
            submitButton?.classList.remove(
                "is-loading"
            );


            if (submitButton) {
                submitButton
                    .querySelector("span")
                    .textContent =
                    "Register Now — Free";

                submitButton
                    .querySelector("i")
                    .className =
                    "bi bi-arrow-right";
            }


            /*
             * Show first name in success message
             */
            if (successName) {
                successName.textContent =
                    fullName.split(" ")[0];
            }


            /*
             * Hide form
             */
            if (formView) {
                formView.hidden = true;
            }


            /*
             * Show success screen
             */
            if (successView) {
                successView.hidden = false;
            }


            document
                .querySelector(
                    ".registration-card"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            showToast(
                "Registration confirmed"
            );

        }, 800);
    }
);


/* =========================================================
   14. REGISTER ANOTHER ATTENDEE
========================================================= */

registerAnotherButton?.addEventListener(
    "click",
    () => {
        registrationForm?.reset();


        /*
         * Checkbox checked by default
         */
        const updatesCheckbox =
            document.getElementById("updates");


        if (updatesCheckbox) {
            updatesCheckbox.checked = true;
        }


        /*
         * Clear validation errors
         */
        registrationForm
            ?.querySelectorAll(".form-group")
            .forEach((group) => {
                group.classList.remove(
                    "has-error"
                );


                const errorElement =
                    group.querySelector(
                        ".field-error"
                    );


                if (errorElement) {
                    errorElement.textContent = "";
                }
            });


        /*
         * Hide success screen
         */
        if (successView) {
            successView.hidden = true;
        }


        /*
         * Show form again
         */
        if (formView) {
            formView.hidden = false;
        }


        document
            .getElementById("full-name")
            ?.focus();
    }
);


/* =========================================================
   15. SHARE BUTTONS
========================================================= */

function openShareWindow(url) {
    window.open(
        url,
        "_blank",
        "noopener,noreferrer,width=720,height=620"
    );
}


async function copyWorkshopLink() {
    try {
        await navigator.clipboard.writeText(
            EVENT_CONFIG.website
        );


        showToast(
            "Workshop link copied"
        );

    } catch (error) {
        /*
         * Fallback for older browsers
         */
        const temporaryInput =
            document.createElement("textarea");


        temporaryInput.value =
            EVENT_CONFIG.website;


        temporaryInput.style.position =
            "fixed";

        temporaryInput.style.opacity =
            "0";


        document.body.appendChild(
            temporaryInput
        );


        temporaryInput.select();

        document.execCommand("copy");

        temporaryInput.remove();


        showToast(
            "Workshop link copied"
        );
    }
}


document
    .querySelectorAll("[data-share]")
    .forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const network =
                    button.dataset.share;


                const message =
                    "Join this free live workshop: Build Better Interfaces.";


                const encodedUrl =
                    encodeURIComponent(
                        EVENT_CONFIG.website
                    );


                const encodedMessage =
                    encodeURIComponent(message);


                /*
                 * LinkedIn
                 */
                if (network === "linkedin") {
                    openShareWindow(
                        "https://www.linkedin.com/" +
                        "sharing/share-offsite/" +
                        `?url=${encodedUrl}`
                    );

                    return;
                }


                /*
                 * X / Twitter
                 */
                if (network === "x") {
                    openShareWindow(
                        "https://twitter.com/" +
                        "intent/tweet" +
                        `?text=${encodedMessage}` +
                        `&url=${encodedUrl}`
                    );

                    return;
                }


                /*
                 * WhatsApp
                 */
                if (network === "whatsapp") {
                    openShareWindow(
                        "https://wa.me/" +
                        `?text=${encodedMessage}` +
                        `%20${encodedUrl}`
                    );

                    return;
                }


                /*
                 * Copy link
                 */
                if (network === "copy") {
                    copyWorkshopLink();
                }
            }
        );
    });


/* =========================================================
   16. CURRENT YEAR
========================================================= */

const currentYearElement =
    document.getElementById("current-year");


if (currentYearElement) {
    currentYearElement.textContent =
        String(
            new Date().getFullYear()
        );
}
