export const dictionaries = {
  en: {
    navHome: "Home",
    navCourses: "Courses",
    navBooking: "Book",
    navPortal: "Portal",
    heroTitle: "Drive smarter. Pass sooner.",
    heroSubtitle: "Modern lessons with certified instructors and real-time scheduling."
  },
  es: {
    navHome: "Inicio",
    navCourses: "Cursos",
    navBooking: "Reservar",
    navPortal: "Portal",
    heroTitle: "Conduce mejor. Aprueba antes.",
    heroSubtitle: "Clases modernas con instructores certificados y reservas en tiempo real."
  },
  fr: {
    navHome: "Accueil",
    navCourses: "Cours",
    navBooking: "Réserver",
    navPortal: "Portail",
    heroTitle: "Conduisez mieux. Réussissez plus vite.",
    heroSubtitle: "Cours modernes avec instructeurs certifiés et réservation en direct."
  }
} as const;

export type Locale = keyof typeof dictionaries;
