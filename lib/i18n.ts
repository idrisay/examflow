import { cookies, headers } from "next/headers";

export const locales = [
  "en",
  "tr",
  "de",
  "el",
  "ar",
  "uk",
  "es",
  "fr"
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "preferred-locale";

export const languageOptions: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
  { value: "de", label: "Deutsch" },
  { value: "el", label: "Ελληνικά" },
  { value: "ar", label: "العربية" },
  { value: "uk", label: "Українська" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" }
];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function normalizeBrowserLocale(value: string): Locale | null {
  const lowered = value.toLowerCase();

  if (isLocale(lowered)) {
    return lowered;
  }

  const baseLocale = lowered.split("-")[0];
  return isLocale(baseLocale) ? baseLocale : null;
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;

  if (locale && isLocale(locale)) {
    return locale;
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");

  if (acceptLanguage) {
    const matchedLocale = acceptLanguage
      .split(",")
      .map((entry) => entry.split(";")[0]?.trim())
      .map((entry) => (entry ? normalizeBrowserLocale(entry) : null))
      .find((entry): entry is Locale => Boolean(entry));

    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return defaultLocale;
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

const translations = {
  en: {
    announcement: "Support us in improving the website so we can help even more learners succeed.",
    logoTagline: "TELC, fide, Goethe and more",
    nav: {
      exams: "Exams",
      practice: "Practice",
      upload: "Upload Docs",
      support: "Support Us",
      login: "Log in",
      logout: "Logout",
      join: "Join free",
      language: "Language"
    },
    home: {
      eyebrow: "German exam practice for real life and real tests",
      title: "Prepare for TELC, fide, Goethe, and more in one calm study space.",
      description:
        "FreeExamPrep gives learners a cleaner way to practice reading, listening, writing, and speaking across the exam formats they are actually studying for.",
      panelEyebrow: "What you can practice",
      panelText:
        "Structured packs for reading, listening, speaking, and writing with levels from A2 to C1.",
      primaryCta: "Start free practice",
      secondaryCta: "Create account",
      highlights: [
        ["Exam families", "Practice TELC, fide, Goethe, and related German exam styles in one library."],
        ["Skill-based training", "Switch between reading, listening, writing, and speaking instead of only full mocks."],
        ["Optional account", "Create an account to save attempts and keep a visible study rhythm."]
      ],
      mixTitle: "This week's study mix",
      mixBadge: "4 exam paths",
      skills: ["Reading", "Listening", "Speaking", "Writing"],
      featuredEyebrow: "Featured Exams",
      featuredTitle: "Choose the exam style that matches your next goal",
      featuredDescription:
        "Browse exam packs by provider, skill, and level. The library starts with realistic sample sets so you can build confidence before the real test day.",
      cards: [
        ["Collect better materials", "Upload useful PDFs, notes, and worksheets so the library feels closer to the exams people really take."],
        ["Support free access", "Optional support helps us keep practice open while expanding exam types and study tools."],
        ["Build your routine", "Use an account to track attempts, compare scores, and stay consistent from A2 through C1."]
      ]
    },
    common: {
      freeAccess: "Free access",
      advancedSet: "Advanced set",
      openExam: "Open exam",
      min: "min",
      questions: "questions"
    },
    examsPage: {
      eyebrow: "Exam Library",
      title: "Practice packs for TELC, fide, Goethe, and more",
      description:
        "Explore by exam family, level, and skill area so you can choose the right format for your next speaking test, listening paper, or writing task."
    },
    examDetail: {
      sampleQuestions: "sample questions",
      loginForPractice: "Log in for full practice",
      practiceNow: "Practice now",
      previewQuestion: "Preview question",
      openResponse: "This is an open response question for speaking or writing practice."
    },
    practice: {
      dashboardEyebrow: "Your dashboard",
      dashboardTitle: "Recent progress",
      scoreSuffix: "% score",
      noAttempts: "No saved attempts yet. Finish one practice set to start.",
      accessEyebrow: "Practice access",
      accessTitle: "Save your TELC, fide, and Goethe practice history",
      accessDescription:
        "You can browse the exam library without an account, but signing in lets you keep scores, compare attempts, and turn random study sessions into a real plan.",
      createAccount: "Create free account",
      login: "Log in"
    },
    practiceClient: {
      eyebrow: "Practice Mode",
      description: "Work through each task, then save your result when you finish.",
      question: "Question",
      textareaPlaceholder: "Write your answer here",
      saveResult: "Save result",
      saved: "Your practice result was saved.",
      loginToSave: "Please log in to save your score.",
      score: "Score",
      wait: "Please wait..."
    },
    loginPage: {
      eyebrow: "Welcome back",
      title: "Log in to improve faster",
      description: "Save your scores, revisit hard questions, and turn open practice into a real study system.",
      noAccount: "No account yet?",
      createOne: "Create one here"
    },
    registerPage: {
      eyebrow: "Start free",
      title: "Create an account for smarter practice",
      description:
        "Public users can browse questions, but members can save attempts, build history, and study with more structure.",
      haveAccount: "Already have an account?",
      login: "Log in"
    },
    authForm: {
      firstName: "First name",
      firstNamePlaceholder: "Your first name",
      lastName: "Last name",
      optional: "optional",
      lastNamePlaceholder: "Your last name",
      email: "Email",
      password: "Password",
      passwordPlaceholder: "Minimum 6 characters",
      login: "Log in",
      createAccount: "Create my free account",
      genericError: "Something went wrong."
    },
    supportPage: {
      eyebrow: "Support",
      title: "Keep the platform completely free",
      description:
        "Every learner can use FreeExamPrep for free. Support is optional and helps with hosting, content review, and expanding the question bank without adding paywalls.",
      cardTitle: "Free first, support optional",
      cardText:
        "Supporters can contribute directly with PayPal. We create the order on the server, capture it after approval, and store the result in Supabase."
    },
    uploadPage: {
      eyebrow: "Community Uploads",
      title: "Help improve the library",
      description:
        "If you have useful TELC-style notes, worksheets, or reference documents, you can upload them here so we can review and improve the platform.",
      cardTitle: "Suggested files",
      cardText:
        "Upload PDFs, scanned exercises, writing prompts, answer sheets, or vocabulary notes. We store submissions for review before anything is published."
    },
    notFound: {
      eyebrow: "Not Found",
      title: "This exam page is missing",
      description: "The page you tried to open does not exist yet, but you can keep exploring the public exam library.",
      cta: "Browse exams"
    }
  },
  tr: {
    announcement: "Gercekci formatlarla Almanca sinav calismasi",
    logoTagline: "TELC, fide, Goethe ve daha fazlasi",
    nav: { exams: "Sinavlar", practice: "Pratik", upload: "Dokuman Yukle", support: "Destek Ol", login: "Giris yap", logout: "Cikis", join: "Ucretsiz katil", language: "Dil" },
    home: {
      eyebrow: "Gercek hayat ve gercek sinavlar icin Almanca calisma",
      title: "TELC, fide, Goethe ve daha fazlasina tek bir sakin calisma alaninda hazirlanin.",
      description: "FreeExamPrep, ogrencilere okuma, dinleme, yazma ve konusma becerilerini calismak icin daha temiz bir alan sunar.",
      panelEyebrow: "Neler calisabilirsiniz",
      panelText: "A2'den C1'e kadar okuma, dinleme, konusma ve yazma paketleri.",
      primaryCta: "Ucretsiz pratik baslat",
      secondaryCta: "Hesap olustur",
      highlights: [["Sinav aileleri", "TELC, fide ve Goethe gibi Alman sinav stillerini tek kutuphanede calisin."], ["Beceri odakli", "Sadece tam deneme yerine okuma, dinleme, yazma ve konusma secin."], ["Istege bagli hesap", "Denemeleri kaydetmek ve duzenli calismak icin hesap olusturun."]],
      mixTitle: "Bu haftaki calisma dengesi",
      mixBadge: "4 sinav yolu",
      skills: ["Okuma", "Dinleme", "Konusma", "Yazma"],
      featuredEyebrow: "One Cikan Sinavlar",
      featuredTitle: "Siradaki hedefinize uyan sinav stilini secin",
      featuredDescription: "Saglayiciya, seviyeye ve beceriye gore paketleri inceleyin.",
      cards: [["Daha iyi materyaller toplayin", "Gercek sinavlara daha yakin bir kutuphane icin PDF ve notlar yukleyin."], ["Ucretsiz erisimi destekleyin", "Istege bagli destek, platformun acik kalmasina yardimci olur."], ["Rutininizi kurun", "A2'den C1'e kadar denemeleri takip edin ve ilerlemeyi gorun."]]
    },
    common: { freeAccess: "Ucretsiz erisim", advancedSet: "Ileri set", openExam: "Sinavi ac", min: "dk", questions: "soru" },
    examsPage: { eyebrow: "Sinav Kutuphanesi", title: "TELC, fide, Goethe ve daha fazlasi icin pratik paketleri", description: "Bir sonraki sinaviniz icin dogru formati secmek uzere saglayiciya ve beceriye gore kesfedin." },
    examDetail: { sampleQuestions: "ornek soru", loginForPractice: "Tam pratik icin giris yap", practiceNow: "Simdi pratik yap", previewQuestion: "Onizleme soru", openResponse: "Bu, konusma veya yazma icin acik uclu bir sorudur." },
    practice: { dashboardEyebrow: "Paneliniz", dashboardTitle: "Son ilerleme", scoreSuffix: "% puan", noAttempts: "Henuz kayitli deneme yok. Baslamak icin bir set bitirin.", accessEyebrow: "Pratik erisimi", accessTitle: "TELC, fide ve Goethe pratik gecmisinizi kaydedin", accessDescription: "Hesapsiz gezebilirsiniz ancak giris yapmak puanlarinizi ve denemelerinizi saklar.", createAccount: "Ucretsiz hesap olustur", login: "Giris yap" },
    practiceClient: { eyebrow: "Pratik Modu", description: "Her gorevi tamamlayin ve sonunda sonucunuzu kaydedin.", question: "Soru", textareaPlaceholder: "Cevabinizi buraya yazin", saveResult: "Sonucu kaydet", saved: "Pratik sonucunuz kaydedildi.", loginToSave: "Puani kaydetmek icin giris yapin.", score: "Puan", wait: "Lutfen bekleyin..." },
    loginPage: { eyebrow: "Tekrar hos geldiniz", title: "Daha hizli gelismek icin giris yapin", description: "Puanlarinizi kaydedin ve zor sorulara geri donun.", noAccount: "Henuz hesabiniz yok mu?", createOne: "Buradan olusturun" },
    registerPage: { eyebrow: "Ucretsiz baslayin", title: "Daha akilli pratik icin hesap olusturun", description: "Uyeler denemeleri kaydedebilir ve daha duzenli calisabilir.", haveAccount: "Zaten hesabiniz var mi?", login: "Giris yap" },
    authForm: { firstName: "Ad", firstNamePlaceholder: "Adiniz", lastName: "Soyad", optional: "istege bagli", lastNamePlaceholder: "Soyadiniz", email: "E-posta", password: "Sifre", passwordPlaceholder: "En az 6 karakter", login: "Giris yap", createAccount: "Ucretsiz hesabimi olustur", genericError: "Bir seyler ters gitti." },
    supportPage: { eyebrow: "Destek", title: "Platformu tamamen ucretsiz tutun", description: "Her ogrenci FreeExamPrep'i ucretsiz kullanabilir. Destek istege baglidir.", cardTitle: "Once ucretsiz, destek istege bagli", cardText: "Destekciler PayPal ile katkida bulunabilir." },
    uploadPage: { eyebrow: "Topluluk Yuklemeleri", title: "Kutuphane gelissin", description: "Faydali notlar ve dokumanlariniz varsa buradan yukleyebilirsiniz.", cardTitle: "Onerilen dosyalar", cardText: "PDF, taranmis alistirma, yazma gorevleri ve kelime notlari yukleyin." },
    notFound: { eyebrow: "Bulunamadi", title: "Bu sinav sayfasi eksik", description: "Acmak istediginiz sayfa henuz yok.", cta: "Sinavlara goz at" }
  },
  de: {
    announcement: "Deutschprufungen mit realistischen Formaten uben",
    logoTagline: "TELC, fide, Goethe und mehr",
    nav: { exams: "Prufungen", practice: "Uben", upload: "Dateien hochladen", support: "Unterstutzen", login: "Anmelden", logout: "Abmelden", join: "Kostenlos starten", language: "Sprache" },
    home: {
      eyebrow: "Deutschprufungen fur Alltag und echte Tests",
      title: "Bereite dich auf TELC, fide, Goethe und mehr in einem ruhigen Lernraum vor.",
      description: "FreeExamPrep bietet einen klaren Ort zum Uben von Lesen, Horen, Schreiben und Sprechen.",
      panelEyebrow: "Was du uben kannst",
      panelText: "Strukturierte Pakete fur Lesen, Horen, Sprechen und Schreiben von A2 bis C1.",
      primaryCta: "Kostenlos uben",
      secondaryCta: "Konto erstellen",
      highlights: [["Prufungsarten", "Ube TELC, fide und Goethe in einer Bibliothek."], ["Fertigkeiten", "Wechsle zwischen Lesen, Horen, Schreiben und Sprechen."], ["Optionales Konto", "Speichere Versuche und baue eine Lernroutine auf."]],
      mixTitle: "Dein Lernmix dieser Woche",
      mixBadge: "4 Lernwege",
      skills: ["Lesen", "Horen", "Sprechen", "Schreiben"],
      featuredEyebrow: "Empfohlene Prufungen",
      featuredTitle: "Wahle den Prufungsstil fur dein nachstes Ziel",
      featuredDescription: "Entdecke Pakete nach Anbieter, Niveau und Fertigkeit.",
      cards: [["Bessere Materialien sammeln", "Lade PDFs und Notizen hoch, damit die Bibliothek praxisnaher wird."], ["Freien Zugang unterstutzen", "Freiwillige Unterstutzung hilft beim Ausbau der Plattform."], ["Routine aufbauen", "Verfolge Versuche und bleibe von A2 bis C1 konstant."]]
    },
    common: { freeAccess: "Freier Zugang", advancedSet: "Fortgeschrittenes Set", openExam: "Prufung offnen", min: "Min", questions: "Fragen" },
    examsPage: { eyebrow: "Prufungsbibliothek", title: "Ubungspakete fur TELC, fide, Goethe und mehr", description: "Suche nach Anbieter, Niveau und Fertigkeit fur dein nachstes Ziel." },
    examDetail: { sampleQuestions: "Beispielfragen", loginForPractice: "Fur volles Training anmelden", practiceNow: "Jetzt uben", previewQuestion: "Vorschau Frage", openResponse: "Dies ist eine offene Aufgabe fur Sprech- oder Schreibtraining." },
    practice: { dashboardEyebrow: "Dein Bereich", dashboardTitle: "Letzte Fortschritte", scoreSuffix: "% Ergebnis", noAttempts: "Noch keine gespeicherten Versuche. Beende einen Satz, um zu starten.", accessEyebrow: "Trainingszugang", accessTitle: "Speichere deine TELC-, fide- und Goethe-Ubungen", accessDescription: "Ohne Konto kannst du die Bibliothek ansehen, mit Konto speicherst du Ergebnisse und Vergleichswerte.", createAccount: "Kostenloses Konto erstellen", login: "Anmelden" },
    practiceClient: { eyebrow: "Trainingsmodus", description: "Bearbeite jede Aufgabe und speichere danach dein Ergebnis.", question: "Frage", textareaPlaceholder: "Schreibe hier deine Antwort", saveResult: "Ergebnis speichern", saved: "Dein Ergebnis wurde gespeichert.", loginToSave: "Bitte melde dich an, um dein Ergebnis zu speichern.", score: "Punktzahl", wait: "Bitte warten..." },
    loginPage: { eyebrow: "Willkommen zuruck", title: "Anmelden und schneller besser werden", description: "Speichere deine Ergebnisse und bearbeite schwierige Fragen erneut.", noAccount: "Noch kein Konto?", createOne: "Hier erstellen" },
    registerPage: { eyebrow: "Kostenlos starten", title: "Ein Konto fur smarteres Uben erstellen", description: "Mitglieder konnen Versuche speichern und strukturierter lernen.", haveAccount: "Schon ein Konto?", login: "Anmelden" },
    authForm: { firstName: "Vorname", firstNamePlaceholder: "Dein Vorname", lastName: "Nachname", optional: "optional", lastNamePlaceholder: "Dein Nachname", email: "E-Mail", password: "Passwort", passwordPlaceholder: "Mindestens 6 Zeichen", login: "Anmelden", createAccount: "Mein kostenloses Konto erstellen", genericError: "Etwas ist schiefgelaufen." },
    supportPage: { eyebrow: "Unterstutzung", title: "Halte die Plattform komplett kostenlos", description: "Jede lernende Person kann FreeExamPrep kostenlos nutzen. Unterstutzung ist freiwillig.", cardTitle: "Kostenlos zuerst, Unterstutzung optional", cardText: "Unterstutzer konnen direkt per PayPal beitragen." },
    uploadPage: { eyebrow: "Uploads aus der Community", title: "Hilf, die Bibliothek zu verbessern", description: "Wenn du nutzliche Notizen oder Dokumente hast, kannst du sie hier hochladen.", cardTitle: "Empfohlene Dateien", cardText: "Lade PDFs, gescannte Ubungen, Schreibaufgaben oder Wortschatznotizen hoch." },
    notFound: { eyebrow: "Nicht gefunden", title: "Diese Prufungsseite fehlt", description: "Die gewunschte Seite existiert noch nicht.", cta: "Prufungen ansehen" }
  },
  el: {
    announcement: "Εξασκηση σε γερμανικες εξετασεις με ρεαλιστικες μορφες",
    logoTagline: "TELC, fide, Goethe και αλλα",
    nav: { exams: "Εξετασεις", practice: "Εξασκηση", upload: "Ανεβασμα εγγραφων", support: "Υποστηριξη", login: "Συνδεση", logout: "Αποσυνδεση", join: "Δωρεαν εγγραφη", language: "Γλωσσα" },
    home: {
      eyebrow: "Γερμανικες εξετασεις για πραγματικη ζωη και πραγματικα τεστ",
      title: "Προετοιμασου για TELC, fide, Goethe και αλλα σε εναν ηρεμο χωρο μελετης.",
      description: "Το FreeExamPrep προσφερει καθαρο χωρο για αναγνωση, ακροαση, γραφη και ομιλια.",
      panelEyebrow: "Τι μπορεις να εξασκησεις",
      panelText: "Δομημενα πακετα απο A2 μεχρι C1.",
      primaryCta: "Ξεκινα δωρεαν",
      secondaryCta: "Δημιουργια λογαριασμου",
      highlights: [["Οικογενειες εξετασεων", "Εξασκηση σε TELC, fide και Goethe σε μια βιβλιοθηκη."], ["Ανα δεξιοτητα", "Διαλεξε αναγνωση, ακροαση, γραφη ή ομιλια."], ["Προαιρετικος λογαριασμος", "Αποθηκευσε προσπαθειες και χτισε ρυθμο μελετης."]],
      mixTitle: "Το μειγμα μελετης αυτης της εβδομαδας",
      mixBadge: "4 διαδρομες",
      skills: ["Αναγνωση", "Ακροαση", "Ομιλια", "Γραφη"],
      featuredEyebrow: "Προτεινομενες εξετασεις",
      featuredTitle: "Διαλεξε το στυλ εξετασης για τον επομενο στοχο σου",
      featuredDescription: "Εξερευνησε πακετα ανα παροχο, επιπεδο και δεξιοτητα.",
      cards: [["Καλυτερα υλικα", "Ανεβασε PDF και σημειωσεις."], ["Υποστηριξε τη δωρεαν προσβαση", "Η προαιρετικη υποστηριξη βοηθα την πλατφορμα να μεγαλωσει."], ["Χτισε ρουτινα", "Παρακολουθησε προσπαθειες απο A2 εως C1."]]
    },
    common: { freeAccess: "Δωρεαν προσβαση", advancedSet: "Προχωρημενο σετ", openExam: "Ανοιγμα εξετασης", min: "λεπ", questions: "ερωτησεις" },
    examsPage: { eyebrow: "Βιβλιοθηκη εξετασεων", title: "Πακετα εξασκησης για TELC, fide, Goethe και αλλα", description: "Αναζητησε ανα παροχο, επιπεδο και δεξιοτητα." },
    examDetail: { sampleQuestions: "δειγμα ερωτησεων", loginForPractice: "Συνδεση για πληρη εξασκηση", practiceNow: "Εξασκηση τωρα", previewQuestion: "Προεπισκοπηση ερωτησης", openResponse: "Αυτη ειναι ανοιχτη ερωτηση για ομιλια ή γραφη." },
    practice: { dashboardEyebrow: "Ο πινακας σου", dashboardTitle: "Προσφατη προοδος", scoreSuffix: "% βαθμος", noAttempts: "Δεν υπαρχουν αποθηκευμενες προσπαθειες ακομα.", accessEyebrow: "Προσβαση εξασκησης", accessTitle: "Αποθηκευσε το ιστορικο εξασκησης TELC, fide και Goethe", accessDescription: "Με λογαριασμο μπορεις να κρατας βαθμους και συγκρισεις.", createAccount: "Δημιουργια δωρεαν λογαριασμου", login: "Συνδεση" },
    practiceClient: { eyebrow: "Λειτουργια εξασκησης", description: "Ολοκληρωσε καθε εργασια και αποθηκευσε το αποτελεσμα σου.", question: "Ερωτηση", textareaPlaceholder: "Γραψε την απαντηση σου εδω", saveResult: "Αποθηκευση αποτελεσματος", saved: "Το αποτελεσμα σου αποθηκευτηκε.", loginToSave: "Συνδεσου για να αποθηκευσεις το αποτελεσμα σου.", score: "Βαθμος", wait: "Περιμενε..." },
    loginPage: { eyebrow: "Καλως ηρθες πισω", title: "Συνδεσου για να βελτιωθεις πιο γρηγορα", description: "Αποθηκευσε βαθμους και ξαναδουλεψε δυσκολες ερωτησεις.", noAccount: "Δεν εχεις λογαριασμο;", createOne: "Δημιουργησε εναν εδω" },
    registerPage: { eyebrow: "Ξεκινα δωρεαν", title: "Δημιουργησε λογαριασμο για εξυπνοτερη εξασκηση", description: "Τα μελη μπορουν να αποθηκευουν προσπαθειες και ιστορικο.", haveAccount: "Εχεις ηδη λογαριασμο;", login: "Συνδεση" },
    authForm: { firstName: "Ονομα", firstNamePlaceholder: "Το ονομα σου", lastName: "Επιθετο", optional: "προαιρετικο", lastNamePlaceholder: "Το επιθετο σου", email: "Email", password: "Κωδικος", passwordPlaceholder: "Τουλαχιστον 6 χαρακτηρες", login: "Συνδεση", createAccount: "Δημιουργια δωρεαν λογαριασμου", genericError: "Κατι πηγε στραβα." },
    supportPage: { eyebrow: "Υποστηριξη", title: "Κρατηστε την πλατφορμα εντελως δωρεαν", description: "Ολοι μπορουν να χρησιμοποιουν το FreeExamPrep δωρεαν.", cardTitle: "Πρωτα δωρεαν, η υποστηριξη ειναι προαιρετικη", cardText: "Οι υποστηρικτες μπορουν να συμβαλουν με PayPal." },
    uploadPage: { eyebrow: "Ανεβασματα κοινοτητας", title: "Βοηθησε να βελτιωθει η βιβλιοθηκη", description: "Αν εχεις χρησιμες σημειωσεις ή εγγραφα, ανεβασε τα εδω.", cardTitle: "Προτεινομενα αρχεια", cardText: "Ανεβασε PDF, ασκησεις, θεματα εκθεσης ή λεξιλογιο." },
    notFound: { eyebrow: "Δεν βρεθηκε", title: "Αυτη η σελιδα εξετασης λειπει", description: "Η σελιδα που ζητησες δεν υπαρχει ακομα.", cta: "Δες τις εξετασεις" }
  },
  ar: {
    announcement: "تدريب على امتحانات الالمانية بصيغ واقعية",
    logoTagline: "TELC و fide و Goethe والمزيد",
    nav: { exams: "الاختبارات", practice: "التدريب", upload: "رفع الملفات", support: "ادعمنا", login: "تسجيل الدخول", logout: "تسجيل الخروج", join: "انضم مجانا", language: "اللغة" },
    home: {
      eyebrow: "تدريب على الالمانية للحياة اليومية وللاختبارات الحقيقية",
      title: "استعد لـ TELC و fide و Goethe والمزيد في مساحة دراسة هادئة.",
      description: "يوفر FreeExamPrep مكانا واضحا للتدريب على القراءة والاستماع والكتابة والمحادثة.",
      panelEyebrow: "ما الذي يمكنك التدرب عليه",
      panelText: "حزم منظمة من A2 حتى C1 للقراءة والاستماع والمحادثة والكتابة.",
      primaryCta: "ابدأ التدريب مجانا",
      secondaryCta: "انشئ حسابا",
      highlights: [["عائلات الاختبارات", "تدرب على TELC و fide و Goethe في مكتبة واحدة."], ["حسب المهارة", "اختر القراءة او الاستماع او الكتابة او المحادثة."], ["حساب اختياري", "احفظ المحاولات وابن روتين دراسة واضحا."]],
      mixTitle: "مزيج الدراسة هذا الاسبوع",
      mixBadge: "4 مسارات",
      skills: ["القراءة", "الاستماع", "المحادثة", "الكتابة"],
      featuredEyebrow: "اختبارات مميزة",
      featuredTitle: "اختر نمط الاختبار المناسب لهدفك القادم",
      featuredDescription: "تصفح الحزم حسب الجهة والمستوى والمهارة.",
      cards: [["اجمع مواد افضل", "ارفع ملفات PDF والملاحظات لتحسين المكتبة."], ["ادعم الوصول المجاني", "الدعم الاختياري يساعدنا على توسيع المنصة."], ["ابن روتينك", "تابع محاولاتك من A2 حتى C1."]]
    },
    common: { freeAccess: "وصول مجاني", advancedSet: "مجموعة متقدمة", openExam: "افتح الاختبار", min: "د", questions: "اسئلة" },
    examsPage: { eyebrow: "مكتبة الاختبارات", title: "حزم تدريب لـ TELC و fide و Goethe والمزيد", description: "استكشف حسب الجهة والمستوى والمهارة." },
    examDetail: { sampleQuestions: "اسئلة نموذجية", loginForPractice: "سجل الدخول للتدريب الكامل", practiceNow: "تدرب الان", previewQuestion: "معاينة السؤال", openResponse: "هذا سؤال مفتوح للمحادثة او الكتابة." },
    practice: { dashboardEyebrow: "لوحتك", dashboardTitle: "احدث التقدم", scoreSuffix: "% نتيجة", noAttempts: "لا توجد محاولات محفوظة بعد.", accessEyebrow: "وصول التدريب", accessTitle: "احفظ سجل تدريب TELC و fide و Goethe", accessDescription: "يمكنك تصفح المكتبة بدون حساب، لكن الحساب يحفظ النتائج ويقارن المحاولات.", createAccount: "انشئ حسابا مجانا", login: "تسجيل الدخول" },
    practiceClient: { eyebrow: "وضع التدريب", description: "اكمل كل مهمة ثم احفظ نتيجتك عند الانتهاء.", question: "السؤال", textareaPlaceholder: "اكتب اجابتك هنا", saveResult: "احفظ النتيجة", saved: "تم حفظ نتيجتك.", loginToSave: "يرجى تسجيل الدخول لحفظ النتيجة.", score: "النتيجة", wait: "يرجى الانتظار..." },
    loginPage: { eyebrow: "اهلا بعودتك", title: "سجل الدخول لتتقدم بشكل اسرع", description: "احفظ نتائجك وارجع الى الاسئلة الصعبة.", noAccount: "ليس لديك حساب؟", createOne: "انشئه من هنا" },
    registerPage: { eyebrow: "ابدأ مجانا", title: "انشئ حسابا لتدريب اذكى", description: "يمكن للاعضاء حفظ المحاولات وبناء سجل دراسة.", haveAccount: "لديك حساب بالفعل؟", login: "تسجيل الدخول" },
    authForm: { firstName: "الاسم الاول", firstNamePlaceholder: "اسمك الاول", lastName: "اسم العائلة", optional: "اختياري", lastNamePlaceholder: "اسم العائلة", email: "البريد الالكتروني", password: "كلمة المرور", passwordPlaceholder: "6 احرف على الاقل", login: "تسجيل الدخول", createAccount: "انشئ حسابي المجاني", genericError: "حدث خطأ ما." },
    supportPage: { eyebrow: "الدعم", title: "حافظ على المنصة مجانية بالكامل", description: "يمكن لكل متعلم استخدام FreeExamPrep مجانا. الدعم اختياري.", cardTitle: "المجانية اولا والدعم اختياري", cardText: "يمكن للمساهمين الدعم مباشرة عبر PayPal." },
    uploadPage: { eyebrow: "ملفات المجتمع", title: "ساعد في تحسين المكتبة", description: "اذا كانت لديك ملاحظات او مستندات مفيدة، يمكنك رفعها هنا.", cardTitle: "ملفات مقترحة", cardText: "ارفع ملفات PDF او تمارين ممسوحة او مهام كتابة او ملاحظات مفردات." },
    notFound: { eyebrow: "غير موجود", title: "صفحة الاختبار هذه غير موجودة", description: "الصفحة التي حاولت فتحها غير موجودة حاليا.", cta: "تصفح الاختبارات" }
  },
  uk: {
    announcement: "Пiдготовка до iспитiв з нiмецької у реальному форматi",
    logoTagline: "TELC, fide, Goethe та iнше",
    nav: { exams: "Iспити", practice: "Практика", upload: "Завантажити файли", support: "Пiдтримати", login: "Увiйти", logout: "Вийти", join: "Безкоштовно", language: "Мова" },
    home: {
      eyebrow: "Нiмецькi iспити для життя та реальних тестiв",
      title: "Готуйтеся до TELC, fide, Goethe та iнших iспитiв в одному спокiйному просторi.",
      description: "FreeExamPrep дає зручний простiр для читання, аудiювання, письма та говорiння.",
      panelEyebrow: "Що можна тренувати",
      panelText: "Структурованi набори вiд A2 до C1.",
      primaryCta: "Почати безкоштовно",
      secondaryCta: "Створити акаунт",
      highlights: [["Сiмейства iспитiв", "Практикуйте TELC, fide та Goethe в однiй бiблiотецi."], ["За навичками", "Оберiть читання, аудiювання, письмо або говорiння."], ["Необовязковий акаунт", "Зберiгайте спроби та створюйте рутину."]],
      mixTitle: "Навчальний баланс цього тижня",
      mixBadge: "4 напрями",
      skills: ["Читання", "Аудiювання", "Говорiння", "Письмо"],
      featuredEyebrow: "Рекомендованi iспити",
      featuredTitle: "Оберiть формат iспиту для наступної цiлi",
      featuredDescription: "Переглядайте набори за провайдером, рiвнем i навичкою.",
      cards: [["Кращi матерiали", "Завантажуйте PDF та нотатки для покращення бiблiотеки."], ["Пiдтримайте безкоштовний доступ", "Добровiльна пiдтримка допомагає розвивати платформу."], ["Побудуйте рутину", "Вiдстежуйте спроби вiд A2 до C1."]]
    },
    common: { freeAccess: "Безкоштовний доступ", advancedSet: "Просунутий набiр", openExam: "Вiдкрити iспит", min: "хв", questions: "питань" },
    examsPage: { eyebrow: "Бiблiотека iспитiв", title: "Практичнi набори для TELC, fide, Goethe та iнших", description: "Дослiджуйте за провайдером, рiвнем i навичкою." },
    examDetail: { sampleQuestions: "зразкових питань", loginForPractice: "Увiйти для повної практики", practiceNow: "Практикуватися зараз", previewQuestion: "Попереднє питання", openResponse: "Це вiдкрите завдання для говорiння або письма." },
    practice: { dashboardEyebrow: "Ваша панель", dashboardTitle: "Останнiй прогрес", scoreSuffix: "% результат", noAttempts: "Ще немає збережених спроб.", accessEyebrow: "Доступ до практики", accessTitle: "Зберiгайте iсторiю практики TELC, fide i Goethe", accessDescription: "Без акаунта можна переглядати бiблiотеку, а з акаунтом зберiгати бали та порiвнювати спроби.", createAccount: "Створити безкоштовний акаунт", login: "Увiйти" },
    practiceClient: { eyebrow: "Режим практики", description: "Виконайте кожне завдання та збережiть результат.", question: "Питання", textareaPlaceholder: "Напишiть вашу вiдповiдь тут", saveResult: "Зберегти результат", saved: "Ваш результат збережено.", loginToSave: "Увiйдiть, щоб зберегти результат.", score: "Результат", wait: "Зачекайте..." },
    loginPage: { eyebrow: "З поверненням", title: "Увiйдiть, щоб прогресувати швидше", description: "Зберiгайте результати та повертайтеся до складних питань.", noAccount: "Ще немає акаунта?", createOne: "Створiть тут" },
    registerPage: { eyebrow: "Почнiть безкоштовно", title: "Створiть акаунт для розумнiшої практики", description: "Учасники можуть зберiгати спроби та iсторiю.", haveAccount: "Вже маєте акаунт?", login: "Увiйти" },
    authForm: { firstName: "Iмя", firstNamePlaceholder: "Ваше iмя", lastName: "Прiзвище", optional: "необовязково", lastNamePlaceholder: "Ваше прiзвище", email: "Email", password: "Пароль", passwordPlaceholder: "Мiнiмум 6 символiв", login: "Увiйти", createAccount: "Створити мiй безкоштовний акаунт", genericError: "Щось пiшло не так." },
    supportPage: { eyebrow: "Пiдтримка", title: "Збережiть платформу повнiстю безкоштовною", description: "Кожен може користуватися FreeExamPrep безкоштовно. Пiдтримка необовязкова.", cardTitle: "Спочатку безкоштовно, пiдтримка добровiльна", cardText: "Пiдтримати можна безпосередньо через PayPal." },
    uploadPage: { eyebrow: "Завантаження спiльноти", title: "Допоможiть покращити бiблiотеку", description: "Якщо у вас є кориснi нотатки чи документи, завантажте їх тут.", cardTitle: "Рекомендованi файли", cardText: "Завантажуйте PDF, вправи, теми для письма чи словниковi нотатки." },
    notFound: { eyebrow: "Не знайдено", title: "Ця сторiнка iспиту вiдсутня", description: "Сторiнка, яку ви хотiли вiдкрити, ще не iснує.", cta: "Переглянути iспити" }
  },
  es: {
    announcement: "Practica examenes de aleman con formatos realistas",
    logoTagline: "TELC, fide, Goethe y mas",
    nav: { exams: "Examenes", practice: "Practica", upload: "Subir documentos", support: "Apoyanos", login: "Iniciar sesion", logout: "Cerrar sesion", join: "Unete gratis", language: "Idioma" },
    home: {
      eyebrow: "Preparacion de aleman para la vida real y examenes reales",
      title: "Preparate para TELC, fide, Goethe y mas en un espacio de estudio tranquilo.",
      description: "FreeExamPrep ofrece un lugar claro para practicar lectura, escucha, escritura y expresion oral.",
      panelEyebrow: "Que puedes practicar",
      panelText: "Paquetes estructurados desde A2 hasta C1.",
      primaryCta: "Empezar gratis",
      secondaryCta: "Crear cuenta",
      highlights: [["Familias de examenes", "Practica TELC, fide y Goethe en una sola biblioteca."], ["Por destreza", "Cambia entre lectura, escucha, escritura y expresion oral."], ["Cuenta opcional", "Guarda intentos y crea una rutina visible."]],
      mixTitle: "Tu mezcla de estudio de esta semana",
      mixBadge: "4 rutas",
      skills: ["Lectura", "Escucha", "Oral", "Escritura"],
      featuredEyebrow: "Examenes destacados",
      featuredTitle: "Elige el estilo de examen para tu siguiente meta",
      featuredDescription: "Explora por proveedor, nivel y destreza.",
      cards: [["Reune mejores materiales", "Sube PDF y apuntes para mejorar la biblioteca."], ["Apoya el acceso gratuito", "El apoyo opcional nos ayuda a ampliar la plataforma."], ["Crea tu rutina", "Sigue tus intentos desde A2 hasta C1."]]
    },
    common: { freeAccess: "Acceso gratis", advancedSet: "Set avanzado", openExam: "Abrir examen", min: "min", questions: "preguntas" },
    examsPage: { eyebrow: "Biblioteca de examenes", title: "Paquetes de practica para TELC, fide, Goethe y mas", description: "Explora por proveedor, nivel y destreza." },
    examDetail: { sampleQuestions: "preguntas de muestra", loginForPractice: "Inicia sesion para la practica completa", practiceNow: "Practicar ahora", previewQuestion: "Vista previa de la pregunta", openResponse: "Esta es una pregunta abierta para practicar expresion oral o escrita." },
    practice: { dashboardEyebrow: "Tu panel", dashboardTitle: "Progreso reciente", scoreSuffix: "% puntuacion", noAttempts: "Todavia no hay intentos guardados.", accessEyebrow: "Acceso a practica", accessTitle: "Guarda tu historial de practica de TELC, fide y Goethe", accessDescription: "Sin cuenta puedes explorar la biblioteca, pero con cuenta puedes guardar resultados y comparar intentos.", createAccount: "Crear cuenta gratis", login: "Iniciar sesion" },
    practiceClient: { eyebrow: "Modo practica", description: "Completa cada tarea y guarda tu resultado al terminar.", question: "Pregunta", textareaPlaceholder: "Escribe tu respuesta aqui", saveResult: "Guardar resultado", saved: "Tu resultado fue guardado.", loginToSave: "Inicia sesion para guardar tu resultado.", score: "Puntuacion", wait: "Espera..." },
    loginPage: { eyebrow: "Bienvenido de nuevo", title: "Inicia sesion para mejorar mas rapido", description: "Guarda tus resultados y vuelve a las preguntas dificiles.", noAccount: "Todavia no tienes cuenta?", createOne: "Creala aqui" },
    registerPage: { eyebrow: "Empieza gratis", title: "Crea una cuenta para practicar mejor", description: "Los miembros pueden guardar intentos e historial.", haveAccount: "Ya tienes cuenta?", login: "Iniciar sesion" },
    authForm: { firstName: "Nombre", firstNamePlaceholder: "Tu nombre", lastName: "Apellido", optional: "opcional", lastNamePlaceholder: "Tu apellido", email: "Correo electronico", password: "Contrasena", passwordPlaceholder: "Minimo 6 caracteres", login: "Iniciar sesion", createAccount: "Crear mi cuenta gratis", genericError: "Algo salio mal." },
    supportPage: { eyebrow: "Apoyo", title: "Mantener la plataforma completamente gratis", description: "Toda persona puede usar FreeExamPrep gratis. El apoyo es opcional.", cardTitle: "Primero gratis, apoyo opcional", cardText: "Las personas que apoyan pueden contribuir directamente con PayPal." },
    uploadPage: { eyebrow: "Subidas de la comunidad", title: "Ayuda a mejorar la biblioteca", description: "Si tienes notas o documentos utiles, puedes subirlos aqui.", cardTitle: "Archivos sugeridos", cardText: "Sube PDF, ejercicios escaneados, tareas de escritura o notas de vocabulario." },
    notFound: { eyebrow: "No encontrado", title: "Falta esta pagina de examen", description: "La pagina que intentaste abrir todavia no existe.", cta: "Ver examenes" }
  },
  fr: {
    announcement: "Pratiquez les examens d allemand avec des formats realistes",
    logoTagline: "TELC, fide, Goethe et plus",
    nav: { exams: "Examens", practice: "Pratique", upload: "Televerser des docs", support: "Soutenir", login: "Connexion", logout: "Deconnexion", join: "Rejoindre gratuitement", language: "Langue" },
    home: {
      eyebrow: "Preparation a l allemand pour la vie reelle et les vrais tests",
      title: "Preparez TELC, fide, Goethe et plus dans un espace d etude calme.",
      description: "FreeExamPrep offre un espace clair pour travailler la lecture, l ecoute, l ecriture et l oral.",
      panelEyebrow: "Ce que vous pouvez pratiquer",
      panelText: "Des packs structures de A2 a C1.",
      primaryCta: "Commencer gratuitement",
      secondaryCta: "Creer un compte",
      highlights: [["Familles d examens", "Travaillez TELC, fide et Goethe dans une seule bibliotheque."], ["Par competence", "Passez de la lecture a l ecoute, l ecriture ou l oral."], ["Compte facultatif", "Enregistrez vos tentatives et creez une routine."]],
      mixTitle: "Votre mix d etude cette semaine",
      mixBadge: "4 parcours",
      skills: ["Lecture", "Ecoute", "Oral", "Ecriture"],
      featuredEyebrow: "Examens a la une",
      featuredTitle: "Choisissez le style d examen pour votre prochain objectif",
      featuredDescription: "Explorez selon l organisme, le niveau et la competence.",
      cards: [["De meilleurs supports", "Televersez des PDF et des notes pour enrichir la bibliotheque."], ["Soutenir l acces gratuit", "Le soutien facultatif nous aide a developper la plateforme."], ["Construire votre routine", "Suivez vos tentatives de A2 a C1."]]
    },
    common: { freeAccess: "Acces gratuit", advancedSet: "Pack avance", openExam: "Ouvrir l examen", min: "min", questions: "questions" },
    examsPage: { eyebrow: "Bibliotheque d examens", title: "Packs de pratique pour TELC, fide, Goethe et plus", description: "Explorez selon l organisme, le niveau et la competence." },
    examDetail: { sampleQuestions: "questions d exemple", loginForPractice: "Se connecter pour la pratique complete", practiceNow: "Pratiquer maintenant", previewQuestion: "Apercu de la question", openResponse: "Ceci est une question ouverte pour l oral ou l ecrit." },
    practice: { dashboardEyebrow: "Votre tableau de bord", dashboardTitle: "Progres recents", scoreSuffix: "% score", noAttempts: "Aucune tentative enregistree pour le moment.", accessEyebrow: "Acces a la pratique", accessTitle: "Enregistrez votre historique TELC, fide et Goethe", accessDescription: "Sans compte vous pouvez parcourir la bibliotheque, avec un compte vous pouvez enregistrer vos resultats.", createAccount: "Creer un compte gratuit", login: "Connexion" },
    practiceClient: { eyebrow: "Mode pratique", description: "Terminez chaque tache puis enregistrez votre resultat.", question: "Question", textareaPlaceholder: "Ecrivez votre reponse ici", saveResult: "Enregistrer le resultat", saved: "Votre resultat a ete enregistre.", loginToSave: "Connectez-vous pour enregistrer votre resultat.", score: "Score", wait: "Veuillez patienter..." },
    loginPage: { eyebrow: "Bon retour", title: "Connectez-vous pour progresser plus vite", description: "Enregistrez vos scores et revenez sur les questions difficiles.", noAccount: "Pas encore de compte ?", createOne: "Creez-en un ici" },
    registerPage: { eyebrow: "Commencer gratuitement", title: "Creer un compte pour une pratique plus intelligente", description: "Les membres peuvent enregistrer leurs tentatives et leur historique.", haveAccount: "Vous avez deja un compte ?", login: "Connexion" },
    authForm: { firstName: "Prenom", firstNamePlaceholder: "Votre prenom", lastName: "Nom", optional: "facultatif", lastNamePlaceholder: "Votre nom", email: "Email", password: "Mot de passe", passwordPlaceholder: "6 caracteres minimum", login: "Connexion", createAccount: "Creer mon compte gratuit", genericError: "Une erreur est survenue." },
    supportPage: { eyebrow: "Soutien", title: "Gardons la plateforme totalement gratuite", description: "Tout le monde peut utiliser FreeExamPrep gratuitement. Le soutien est facultatif.", cardTitle: "Gratuit d abord, soutien optionnel", cardText: "Les soutiens peuvent contribuer directement via PayPal." },
    uploadPage: { eyebrow: "Televersements de la communaute", title: "Aidez a ameliorer la bibliotheque", description: "Si vous avez des notes ou documents utiles, vous pouvez les televerser ici.", cardTitle: "Fichiers suggeres", cardText: "Televersez des PDF, exercices scannes, sujets d ecriture ou notes de vocabulaire." },
    notFound: { eyebrow: "Introuvable", title: "Cette page d examen est absente", description: "La page que vous avez voulu ouvrir n existe pas encore.", cta: "Parcourir les examens" }
  }
} as const;

export async function getTranslations() {
  const locale = await getLocale();
  return { locale, messages: translations[locale] };
}
