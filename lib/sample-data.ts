import type { Locale } from "@/lib/i18n";

export type SampleExam = {
  title: string;
  slug: string;
  provider: string;
  level: string;
  category: string;
  durationMinutes: number;
  description: string;
  isPremium: boolean;
  questionCount: number;
};

export type SampleQuestion = {
  examSlug: string;
  prompt: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
};

type LocalizedText = Record<Locale, string>;

const t = (copy: LocalizedText, locale: Locale) => copy[locale];

const examCatalog = [
  {
    slug: "telc-b1-reading-essentials",
    provider: "TELC",
    level: "B1",
    durationMinutes: 45,
    isPremium: false,
    questionCount: 12,
    category: {
      en: "Reading",
      tr: "Okuma",
      de: "Lesen",
      el: "Αναγνωση",
      ar: "القراءة",
      uk: "Читання",
      es: "Lectura",
      fr: "Lecture"
    },
    title: {
      en: "TELC B1 Alltag Lesen",
      tr: "TELC B1 Gunun Icinde Okuma",
      de: "TELC B1 Alltag Lesen",
      el: "TELC B1 Καθημερινη Αναγνωση",
      ar: "TELC B1 قراءة الحياة اليومية",
      uk: "TELC B1 Читання для щоденних ситуацiй",
      es: "TELC B1 Lectura cotidiana",
      fr: "TELC B1 Lecture du quotidien"
    },
    description: {
      en: "Work through notices, emails, and short articles with the pacing learners expect from TELC-style reading tasks.",
      tr: "TELC tarzinda duyurular, e-postalar ve kisa metinlerle calisin.",
      de: "Ube Hinweise, E-Mails und kurze Texte im typischen TELC-Lesetempo.",
      el: "Εξασκησου σε ανακοινωσεις, email και συντομα κειμενα σε στυλ TELC.",
      ar: "تدرب على الاعلانات والرسائل والمقالات القصيرة باسلوب قريب من TELC.",
      uk: "Працюйте з оголошеннями, листами та короткими текстами у стилi TELC.",
      es: "Trabaja con avisos, correos y textos breves al estilo TELC.",
      fr: "Travaillez des annonces, e-mails et textes courts dans un style proche du TELC."
    }
  },
  {
    slug: "goethe-b2-listening-focus",
    provider: "Goethe",
    level: "B2",
    durationMinutes: 35,
    isPremium: false,
    questionCount: 10,
    category: {
      en: "Listening",
      tr: "Dinleme",
      de: "Horen",
      el: "Ακροαση",
      ar: "الاستماع",
      uk: "Аудiювання",
      es: "Escucha",
      fr: "Ecoute"
    },
    title: {
      en: "Goethe B2 Horen Fokus",
      tr: "Goethe B2 Dinleme Odagi",
      de: "Goethe B2 Horen Fokus",
      el: "Goethe B2 Εστιαση στην Ακροαση",
      ar: "Goethe B2 تركيز الاستماع",
      uk: "Goethe B2 Фокус на аудiюваннi",
      es: "Goethe B2 Enfoque de escucha",
      fr: "Goethe B2 Focus ecoute"
    },
    description: {
      en: "Build confidence with short dialogues, announcements, and detail questions inspired by Goethe listening sections.",
      tr: "Kisa diyaloglar ve duyurularla Goethe tarzinda dinleme guveni kazanin.",
      de: "Starke dein Horen mit kurzen Dialogen und Ansagen im Goethe-Stil.",
      el: "Χτισε σιγουρια με διαλογους και ανακοινωσεις εμπνευσμενες απο Goethe.",
      ar: "ابن الثقة عبر حوارات قصيرة واعلانات واسئلة تفصيلية على نمط Goethe.",
      uk: "Пiдвищуйте впевненiсть завдяки коротким дiалогам i оголошенням у стилi Goethe.",
      es: "Gana confianza con dialogos breves y anuncios inspirados en Goethe.",
      fr: "Gagnez en confiance avec des dialogues et annonces inspires des sections Goethe."
    }
  },
  {
    slug: "fide-speaking-alltag-schweiz",
    provider: "fide",
    level: "A2-B1",
    durationMinutes: 25,
    isPremium: false,
    questionCount: 8,
    category: {
      en: "Speaking",
      tr: "Konusma",
      de: "Sprechen",
      el: "Ομιλια",
      ar: "المحادثة",
      uk: "Говорiння",
      es: "Oral",
      fr: "Oral"
    },
    title: {
      en: "fide Speaking Alltag Schweiz",
      tr: "fide Isvicre Gunluk Konusma",
      de: "fide Sprechen Alltag Schweiz",
      el: "fide Ομιλια για την καθημερινοτητα στην Ελβετια",
      ar: "fide محادثة الحياة اليومية في سويسرا",
      uk: "fide Усне мовлення у Швейцарii",
      es: "fide Expresion oral en la vida diaria suiza",
      fr: "fide Oral du quotidien en Suisse"
    },
    description: {
      en: "Practice everyday Swiss scenarios, short role-plays, and clear spoken responses in a fide-inspired format.",
      tr: "Isvicre gunluk hayat senaryolari ve kisa rol oyunlariyla calisin.",
      de: "Ube alltagliche Schweizer Situationen und kurze Rollenspiele im fide-Stil.",
      el: "Εξασκησου σε καθημερινες ελβετικες καταστασεις και συντομους ρολους.",
      ar: "تدرب على مواقف يومية سويسرية وتمثيل ادوار قصير بصيغة قريبة من fide.",
      uk: "Практикуйте швейцарськi побутовi ситуацii та короткi рольовi вправи.",
      es: "Practica situaciones cotidianas suizas y pequenos juegos de rol.",
      fr: "Pratiquez des situations suisses du quotidien et de courts jeux de role."
    }
  },
  {
    slug: "goethe-c1-writing-clarity",
    provider: "Goethe",
    level: "C1",
    durationMinutes: 50,
    isPremium: true,
    questionCount: 6,
    category: {
      en: "Writing",
      tr: "Yazma",
      de: "Schreiben",
      el: "Γραφη",
      ar: "الكتابة",
      uk: "Письмо",
      es: "Escritura",
      fr: "Ecriture"
    },
    title: {
      en: "Goethe C1 Schreiben Klarheit",
      tr: "Goethe C1 Yazma Netligi",
      de: "Goethe C1 Schreiben Klarheit",
      el: "Goethe C1 Καθαρη Γραφη",
      ar: "Goethe C1 وضوح الكتابة",
      uk: "Goethe C1 Чiткiсть письма",
      es: "Goethe C1 Claridad al escribir",
      fr: "Goethe C1 Ecriture claire"
    },
    description: {
      en: "Train argument structure, register, and cohesion with essay prompts designed for advanced exam preparation.",
      tr: "Ileri seviye sinav hazirligi icin yazi yapisi ve tutarlilik calisin.",
      de: "Trainiere Argumentstruktur, Register und Kohasion fur fortgeschrittene Prufungen.",
      el: "Δουλεψε δομη επιχειρηματος και συνοχη για προχωρημενη προετοιμασια.",
      ar: "تدرب على بنية الحجة والاسلوب والترابط لامتحانات المستوى المتقدم.",
      uk: "Тренуйте структуру аргументiв i звязнiсть для просунутого рiвня.",
      es: "Entrena estructura, registro y cohesion para preparacion avanzada.",
      fr: "Travaillez la structure, le registre et la coherence pour un niveau avance."
    }
  }
] as const;

const questionCatalog = [
  {
    examSlug: "telc-b1-reading-essentials",
    type: "multiple-choice",
    options: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
    answer: "6:00 PM",
    prompt: {
      en: "Read the notice. When does the library close on Fridays?",
      tr: "Duyuruyu okuyun. Kutuphane cuma gunleri saat kacta kapaniyor?",
      de: "Lies den Hinweis. Wann schliesst die Bibliothek am Freitag?",
      el: "Διαβασε την ανακοινωση. Ποτε κλεινει η βιβλιοθηκη την Παρασκευη;",
      ar: "اقرا الاعلان. متى تغلق المكتبة يوم الجمعة؟",
      uk: "Прочитайте оголошення. Коли бiблiотека зачиняється у пятницю?",
      es: "Lee el aviso. A que hora cierra la biblioteca los viernes?",
      fr: "Lisez l annonce. A quelle heure ferme la bibliotheque le vendredi ?"
    },
    explanation: {
      en: "The notice states that Friday opening hours end at 18:00.",
      tr: "Duyuruda cuma saatlerinin 18:00'de bittigi yaziyor.",
      de: "Im Hinweis steht, dass die Offnungszeit am Freitag um 18:00 endet.",
      el: "Η ανακοινωση λεει οτι την Παρασκευη κλεινει στις 18:00.",
      ar: "ينص الاعلان على ان ساعات يوم الجمعة تنتهي عند 18:00.",
      uk: "В оголошеннi сказано, що у пятницю робота закiнчується о 18:00.",
      es: "El aviso indica que el horario del viernes termina a las 18:00.",
      fr: "L annonce indique que l horaire du vendredi se termine a 18h00."
    }
  },
  {
    examSlug: "goethe-b2-listening-focus",
    type: "multiple-choice",
    options: [
      "To cancel a reservation",
      "To ask about parking",
      "To request a late check-in",
      "To book breakfast"
    ],
    answer: "To request a late check-in",
    prompt: {
      en: "What is the speaker's main reason for calling the hotel?",
      tr: "Konusmacinin oteli aramasinin ana nedeni nedir?",
      de: "Warum ruft die Person hauptsachlich im Hotel an?",
      el: "Ποιος ειναι ο βασικος λογος που ο ομιλητης καλεί το ξενοδοχειο;",
      ar: "ما السبب الرئيسي لاتصال المتحدث بالفندق؟",
      uk: "Яка головна причина дзвiнка до готелю?",
      es: "Cual es la razon principal por la que la persona llama al hotel?",
      fr: "Quelle est la raison principale de l appel a l hotel ?"
    },
    explanation: {
      en: "The speaker mentions arriving after 11 PM and asks the hotel to note it.",
      tr: "Konusmaci saat 23:00'ten sonra gelecegini belirtiyor ve not dusulmesini istiyor.",
      de: "Die Person sagt, dass sie nach 23 Uhr ankommt, und bittet um einen Vermerk.",
      el: "Ο ομιλητης λεει οτι θα φτασει μετα τις 11 και ζητα να το σημειωσουν.",
      ar: "يذكر المتحدث انه سيصل بعد الساعة 11 مساء ويطلب تسجيل ذلك.",
      uk: "Мовець каже, що прибуде пiсля 23:00, i просить зробити позначку.",
      es: "La persona menciona que llegara despues de las 11 y pide que lo anoten.",
      fr: "La personne dit qu elle arrivera apres 23h et demande a l hotel de le noter."
    }
  },
  {
    examSlug: "fide-speaking-alltag-schweiz",
    type: "open-ended",
    options: [],
    answer: "Answers vary",
    prompt: {
      en: "At the Gemeinde office, explain that you need help understanding a form and ask what documents you must bring.",
      tr: "Belediye ofisinde bir formu anlamak icin yardima ihtiyaciniz oldugunu aciklayin ve hangi belgeleri getirmeniz gerektigini sorun.",
      de: "Erklare im Gemeindeamt, dass du Hilfe beim Verstehen eines Formulars brauchst, und frage nach den notigen Dokumenten.",
      el: "Στο δημοτικο γραφειο εξηγησε οτι χρειαζεσαι βοηθεια με μια φορμα και ρωτησε ποια εγγραφα πρεπει να φερεις.",
      ar: "في مكتب البلدية اشرح انك تحتاج مساعدة لفهم استمارة واسال عن الوثائق التي يجب احضارها.",
      uk: "У мунiципальному офiсi пояснiть, що вам потрiбна допомога з формою, i запитайте, якi документи слiд принести.",
      es: "En la oficina municipal explica que necesitas ayuda para entender un formulario y pregunta que documentos debes llevar.",
      fr: "Au bureau communal, expliquez que vous avez besoin d aide pour comprendre un formulaire et demandez quels documents apporter."
    },
    explanation: {
      en: "A strong response is polite, clearly explains the problem, and asks focused follow-up questions.",
      tr: "Guclu bir cevap nazik olmali, sorunu acikca belirtmeli ve net sorular sormalidir.",
      de: "Eine starke Antwort ist hoflich, klar und stellt passende Ruckfragen.",
      el: "Μια καλη απαντηση ειναι ευγενικη, σαφης και κανει συγκεκριμενες ερωτησεις.",
      ar: "الاجابة الجيدة تكون مهذبة وواضحة وتتضمن اسئلة متابعة محددة.",
      uk: "Сильна вiдповiдь має бути ввiчливою, чiткою та з доречними уточненнями.",
      es: "Una buena respuesta es educada, clara y hace preguntas de seguimiento concretas.",
      fr: "Une bonne reponse est polie, claire et pose des questions precises."
    }
  },
  {
    examSlug: "goethe-c1-writing-clarity",
    type: "open-ended",
    options: [],
    answer: "Answers vary",
    prompt: {
      en: "Write a structured response discussing whether remote work improves productivity in modern companies.",
      tr: "Uzaktan calismanin modern sirketlerde verimliligi artirip artirmadigini tartisan yapili bir metin yazin.",
      de: "Schreibe eine strukturierte Stellungnahme dazu, ob Homeoffice die Produktivitat in modernen Unternehmen verbessert.",
      el: "Γραψε μια δομημενη απαντηση για το αν η τηλεργασια βελτιωνει την παραγωγικοτητα.",
      ar: "اكتب ردا منظما يناقش ما اذا كان العمل عن بعد يحسن الانتاجية في الشركات الحديثة.",
      uk: "Напишiть структуровану вiдповiдь про те, чи пiдвищує вiддалена робота продуктивнiсть.",
      es: "Escribe una respuesta estructurada sobre si el trabajo remoto mejora la productividad.",
      fr: "Redigez une reponse structuree sur l impact du teletravail sur la productivite."
    },
    explanation: {
      en: "A strong answer should present a clear position, supporting evidence, and a balanced conclusion.",
      tr: "Guclu bir cevap acik bir gorus, destekleyici kanit ve dengeli bir sonuc icermelidir.",
      de: "Eine starke Antwort hat eine klare Position, Belege und ein ausgewogenes Fazit.",
      el: "Μια δυνατη απαντηση εχει ξεκαθαρη θεση, τεκμηριωση και ισορροπημενο συμπερασμα.",
      ar: "الاجابة القوية تعرض موقفا واضحا وادلة داعمة وخاتمة متوازنة.",
      uk: "Сильна вiдповiдь повинна мати чiтку позицiю, аргументи та збалансований висновок.",
      es: "Una respuesta solida debe tener una posicion clara, pruebas y una conclusion equilibrada.",
      fr: "Une bonne reponse doit presenter une position claire, des arguments et une conclusion equilibree."
    }
  }
] as const;

export function getSampleExams(locale: Locale): SampleExam[] {
  return examCatalog.map((exam) => ({
    slug: exam.slug,
    provider: exam.provider,
    level: exam.level,
    durationMinutes: exam.durationMinutes,
    isPremium: exam.isPremium,
    questionCount: exam.questionCount,
    category: t(exam.category, locale),
    title: t(exam.title, locale),
    description: t(exam.description, locale)
  }));
}

export function getSampleQuestions(locale: Locale): SampleQuestion[] {
  return questionCatalog.map((question) => ({
    examSlug: question.examSlug,
    type: question.type,
    options: [...question.options],
    answer: question.answer,
    prompt: t(question.prompt, locale),
    explanation: t(question.explanation, locale)
  }));
}
