/* =========================================================
   BURAK KURNAZ — INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       CUSTOM CURSOR
    ----------------------------------------------------- */

    const cursor = document.querySelector(".cursor");

    if (cursor) {

        document.addEventListener("mousemove", (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });

        const interactiveElements = document.querySelectorAll(
            "a, .project, .service, .tags span"
        );

        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });
    }


    /* -----------------------------------------------------
       SCROLL REVEAL
    ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".section-number, .about-grid, .work-header, .project, .service, .currently h2, .tags, .contact h2, .contact-links"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });


    /* -----------------------------------------------------
       SMOOTH ANCHOR LINKS
    ----------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* -----------------------------------------------------
       PROJECT NUMBER PARALLAX
    ----------------------------------------------------- */

    const projects = document.querySelectorAll(".project");

    projects.forEach((project) => {

        const number = project.querySelector(".project-visual span");

        if (!number) return;

        project.addEventListener("mousemove", (event) => {

            const rect = project.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const moveX = (x / rect.width - 0.5) * 20;
            const moveY = (y / rect.height - 0.5) * 20;

            number.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        });

        project.addEventListener("mouseleave", () => {

            number.style.transform =
                "translate(0, 0)";

        });

    });


    /* -----------------------------------------------------
       CURRENT YEAR
    ----------------------------------------------------- */

    const footerYear = document.querySelector("footer");

    if (footerYear) {

        const yearText = footerYear.innerHTML;

        footerYear.innerHTML =
            yearText.replace("2026", new Date().getFullYear());

    }

});
