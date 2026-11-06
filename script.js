
/* =========================================
   SAFFRON & SOUL
   Website Interactions
========================================= */

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Close menu after clicking a navigation link

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        }

    });

}


// 2. AUTOMATIC FOOTER YEAR

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// 3. SMOOTH NAVIGATION SUPPORT

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);

internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);

        }

    });

});


// 4. CONSOLE MESSAGE

console.log(
    "Saffron & Soul website initialized successfully."
);


// =========================================
// 5. DEMO RESERVATION FORM
// =========================================

const reservationForm =
    document.getElementById("reservationForm");

const reservationDate =
    document.getElementById("reservationDate");

const reservationStatus =
    document.getElementById("reservationStatus");

// Set today's date as the minimum reservation date.

if (reservationDate) {
    const today = new Date();

    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    reservationDate.min = localToday;
}

if (reservationForm) {

    reservationForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("guestName").value.trim();

        const phone =
            document.getElementById("guestPhone").value.trim();

        const date = reservationDate.value;

        const time =
            document.getElementById("reservationTime").value;

        const guests =
            document.getElementById("guestCount").value;

        if (!name || !phone || !date || !time || !guests) {
            alert("Please complete all reservation details.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            alert("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        const selectedDate = new Date(date + "T00:00:00");

        const now = new Date();

        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        if (selectedDate < today) {
            alert("Please select today or a future date.");
            return;
        }

        // Demo-only confirmation. No information is transmitted.

        if (reservationStatus) {
            reservationStatus.innerHTML = `
    <strong>Enquiry Submitted Successfully!</strong>
    <p>
        Thank you, ${name}! Your reservation enquiry has been received
        in this demo. No actual restaurant booking has been made.
    </p>
`;

            reservationStatus.classList.add("show");
        }

        reservationForm.reset();

        console.log("Demo reservation form tested successfully.");

    });

}
