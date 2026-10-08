
/* =====================================
   BURAK KURNAZ — CREATIVE INDEX
   Interactions
===================================== */

// 1. KİŞİSEL BİLGİLER
// Tırnakların arasına kendi bilgilerini yaz.

const CONFIG = {
  email: "EPOSTA_ADRESIN",
  instagram: "INSTAGRAM_KULLANICI_ADIN",
  linkedin: "LINKEDIN_PROFIL_ADRESIN"
};


// 2. FOOTER YILI

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 3. TÜRKİYE SAATİ

const clockElement = document.getElementById("clock");

function updateClock() {
  if (!clockElement) return;

  clockElement.textContent = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

updateClock();
setInterval(updateClock, 30000);


// 4. MOBİL MENÜ

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function closeMenu() {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menüyü aç");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Menüyü aç" : "Menüyü kapat"
    );

    navigation.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      closeMenu();
    }
  });
}


// 5. SCROLL REVEAL ANİMASYONLARI

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  prefersReducedMotion ||
  !("IntersectionObserver" in window)
) {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


// 6. E-POSTA BAĞLANTILARI

const emailIsConfigured =
  CONFIG.email &&
  CONFIG.email !== "EPOSTA_ADRESIN" &&
  CONFIG.email.includes("@");

const emailLinks = [
  document.getElementById("email-link"),
  document.getElementById("email-text")
].filter(Boolean);

emailLinks.forEach((link) => {
  if (emailIsConfigured) {
    link.href = `mailto:${CONFIG.email}`;
  } else {
    link.href = "#contact";
  }
});


// 7. SOSYAL MEDYA BAĞLANTILARI

function setProfileLink(elementId, baseUrl, username, placeholder) {
  const link = document.getElementById(elementId);

  if (!link) return;

  const value = (username || "").trim();

  if (!value || value === placeholder) {
    // Örnek bağlantıların yanlışlıkla kullanılmasını önle.
    link.hidden = true;
    return;
  }

  let url;

  if (/^https?:\/\//i.test(value)) {
    url = value;
  } else {
    const cleanValue = value.replace(/^@/, "");

    if (
      !cleanValue ||
      /[/?#\s]/.test(cleanValue)
    ) {
      link.hidden = true;
      return;
    }

    url = baseUrl + cleanValue;
  }

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== new URL(baseUrl).hostname
    ) {
      link.hidden = true;
      return;
    }

    link.href = parsedUrl.href;
    link.hidden = false;
  } catch {
    link.hidden = true;
  }
}

setProfileLink(
  "instagram-link",
  "https://www.instagram.com/",
  CONFIG.instagram,
  "INSTAGRAM_KULLANICI_ADIN"
);

setProfileLink(
  "linkedin-link",
  "https://www.linkedin.com/",
  CONFIG.linkedin,
  "LINKEDIN_PROFIL_ADRESIN"
);


});
