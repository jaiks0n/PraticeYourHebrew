import type { Course } from './course-types'

export const coursEt: Course = {
  id: 'cours-et',
  title: "Le marqueur d'objet direct : את (et)",
  language: 'fr',
  sections: [
    {
      id: 'section-1',
      title: "1. Qu'est-ce que את ?",
      content:
        'En hébreu, את (prononcé "et") est un marqueur grammatical obligatoire qui se place devant l\'objet direct d\'un verbe, mais uniquement quand cet objet est défini. Il n\'a pas d\'équivalent direct en français — c\'est une particularité propre à l\'hébreu.',
    },
    {
      id: 'section-2',
      title: '2. Verbes transitifs vs intransitifs',
      content: "Avant de comprendre quand utiliser את, il faut distinguer deux types de verbes.",
      subsections: [
        {
          id: 'subsection-2a',
          title: 'Verbes transitifs',
          content:
            'Un verbe transitif a besoin d\'un objet direct. Tu peux toujours poser la question "quoi ?" ou "qui ?" après le verbe pour trouver cet objet.',
          examples: [
            { french: 'Je mange quoi ? → une pomme', hebrew: '?אני אוכל מה', transcription: 'ani ochel ma?' },
            { french: 'Je vois qui ? → David', hebrew: '?אני רואה את מי', transcription: 'ani roe et mi?' },
            { french: "J'aime quoi ? → la musique", hebrew: '?אני אוהב את מה', transcription: 'ani ohev et ma?' },
          ],
          note: 'Ces verbes peuvent avoir את devant leur objet si cet objet est défini.',
        },
        {
          id: 'subsection-2b',
          title: 'Verbes intransitifs',
          content:
            'Un verbe intransitif n\'a pas d\'objet direct. La question "quoi ?" ou "qui ?" après le verbe ne fonctionne pas.',
          examples: [
            { french: 'Je cours (quoi ? → impossible)', hebrew: 'אני רץ', transcription: 'ani rats' },
            { french: 'Il dort (quoi ? → impossible)', hebrew: 'הוא ישן', transcription: 'hu yashen' },
            { french: 'Elle pleure (quoi ? → impossible)', hebrew: 'היא בוכה', transcription: 'hi bocha' },
            { french: 'Nous arrivons (quoi ? → impossible)', hebrew: 'אנחנו מגיעים', transcription: 'anachnu magiim' },
          ],
          note: 'Ces verbes n\'auront JAMAIS את en hébreu.',
        },
      ],
    },
    {
      id: 'section-3',
      title: '3. Défini vs Indéfini',
      content: "Pour les verbes transitifs, on utilise את uniquement si l'objet est défini.",
      subsections: [
        {
          id: 'subsection-3a',
          title: "Qu'est-ce qu'un nom défini ?",
          content:
            "Un nom est défini quand on sait exactement de quoi ou de qui on parle — c'est quelque chose de précis, d'identifiable.",
          examples: [
            { french: 'passe-moi la pomme (on sait laquelle)', hebrew: 'תן לי את התפוח', transcription: 'ten li et hatapuach' },
            { french: "j'ai vu le film (un film précis)", hebrew: 'ראיתי את הסרט', transcription: 'raiti et haseret' },
            { french: "j'aime David (une personne précise)", hebrew: 'אני אוהב את דוד', transcription: 'ani ohev et david' },
          ],
        },
        {
          id: 'subsection-3b',
          title: "Qu'est-ce qu'un nom indéfini ?",
          content:
            "Un nom est indéfini quand on parle d'une chose quelconque, pas précise, ou qu'on l'introduit pour la première fois.",
          examples: [
            { french: "je mange une pomme (n'importe laquelle)", hebrew: 'אני אוכל תפוח', transcription: 'ani ochel tapuach' },
            { french: "j'ai vu un film (quelconque)", hebrew: 'ראיתי סרט', transcription: 'raiti seret' },
            { french: 'je cherche un appartement', hebrew: 'אני מחפש דירה', transcription: 'ani mechapes dira' },
          ],
        },
        {
          id: 'subsection-3c',
          title: "L'astuce en français",
          content: 'En français, les articles donnent une indication directe :',
          rules: [
            { article: 'un / une / des', type: 'Indéfini', useEt: false },
            { article: 'le / la / les', type: 'Défini', useEt: true },
            { article: 'Nom propre (David, Paris...)', type: 'Toujours défini', useEt: true },
            { article: 'Possessif (mon, ton, son...)', type: 'Toujours défini', useEt: true },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: '4. La règle complète',
      rules: [
        {
          id: 'rule-1',
          situation: 'Verbe intransitif',
          useEt: false,
          useEtLabel: 'JAMAIS',
          hebrewExample: 'אני רץ',
          transcriptionExample: 'ani rats',
          frenchExample: 'Je cours',
          explanation: "Pas d'objet direct possible",
        },
        {
          id: 'rule-2',
          situation: 'Verbe transitif + objet indéfini (un/une/des)',
          useEt: false,
          useEtLabel: 'NON',
          hebrewExample: 'אני אוכל תפוח',
          transcriptionExample: 'ani ochel tapuach',
          frenchExample: 'Je mange une pomme',
          explanation: "L'objet n'est pas précis",
        },
        {
          id: 'rule-3',
          situation: 'Verbe transitif + objet défini (le/la/les)',
          useEt: true,
          useEtLabel: 'OUI',
          hebrewExample: 'אני אוכל את התפוח',
          transcriptionExample: 'ani ochel et hatapuach',
          frenchExample: 'Je mange la pomme',
          explanation: "L'objet est précis, identifiable",
        },
        {
          id: 'rule-4',
          situation: 'Verbe transitif + nom propre',
          useEt: true,
          useEtLabel: 'OUI',
          hebrewExample: 'פגשתי את דוד',
          transcriptionExample: 'pagashti et david',
          frenchExample: "J'ai rencontré David",
          explanation: 'Un nom propre est toujours défini',
        },
        {
          id: 'rule-5',
          situation: 'Verbe transitif + pronom (moi, toi, lui...)',
          useEt: true,
          useEtLabel: 'OUI (fusionné)',
          hebrewExample: 'אני אוהב אותך',
          transcriptionExample: 'ani ohev otcha',
          frenchExample: "Je t'aime",
          explanation: 'את se fusionne avec le pronom : אותי, אותך, אותו, אותה, אותנו, אותכם, אותם',
        },
        {
          id: 'rule-6',
          situation: 'Verbe transitif + possessif (mon, ton, son...)',
          useEt: true,
          useEtLabel: 'OUI',
          hebrewExample: 'שכחתי את המפתחות שלי',
          transcriptionExample: 'shachachti et hamaftechot sheli',
          frenchExample: "J'ai oublié mes clés",
          explanation: "Un possessif rend l'objet défini",
        },
      ],
    },
    {
      id: 'section-5',
      title: '5. Les 3 cas où את apparaît SANS ה-',
      content:
        "En général, את accompagne le ה- (l'article défini). Mais il y a 3 exceptions :",
      cases: [
        {
          id: 'case-1',
          title: 'Cas 1 : Noms propres',
          content: "Les noms propres n'ont pas besoin de ה- car ils sont naturellement définis.",
          examples: [
            { french: "J'ai rencontré David", hebrew: 'פגשתי את דוד', transcription: 'pagashti et david' },
            { french: "J'aime Jérusalem", hebrew: 'אני אוהב את ירושלים', transcription: 'ani ohev et yerushalayim' },
            { french: 'Elle connaît Sarah', hebrew: 'היא מכירה את שרה', transcription: 'hi makira et sara' },
          ],
        },
        {
          id: 'case-2',
          title: 'Cas 2 : Pronoms suffixes (את fusionné)',
          content: "Quand l'objet est un pronom personnel, את se fusionne avec lui.",
          pronouns: [
            { person: '1ère sg.', hebrew: 'אוֹתִי', transcription: 'oti', french: 'me / moi' },
            { person: '2ème sg. m.', hebrew: 'אוֹתְךָ', transcription: 'otcha', french: 'te / toi (m.)' },
            { person: '2ème sg. f.', hebrew: 'אוֹתָךְ', transcription: 'otach', french: 'te / toi (f.)' },
            { person: '3ème sg. m.', hebrew: 'אוֹתוֹ', transcription: 'oto', french: 'le / lui' },
            { person: '3ème sg. f.', hebrew: 'אוֹתָהּ', transcription: 'ota', french: 'la / elle' },
            { person: '1ère pl.', hebrew: 'אוֹתָנוּ', transcription: 'otanu', french: 'nous' },
            { person: '2ème pl. m.', hebrew: 'אֶתְכֶם', transcription: 'etchem', french: 'vous (m.)' },
            { person: '2ème pl. f.', hebrew: 'אֶתְכֶן', transcription: 'etchen', french: 'vous (f.)' },
            { person: '3ème pl. m.', hebrew: 'אוֹתָם', transcription: 'otam', french: 'les / eux (m.)' },
            { person: '3ème pl. f.', hebrew: 'אוֹתָן', transcription: 'otan', french: 'les / elles (f.)' },
          ],
          examples: [
            { french: "Je t'aime", hebrew: 'אני אוהב אותך', transcription: 'ani ohev otcha' },
            { french: "Il m'a vu", hebrew: 'הוא ראה אותי', transcription: 'hu raa oti' },
            { french: 'Elle les connaît', hebrew: 'היא מכירה אותם', transcription: 'hi makira otam' },
          ],
        },
        {
          id: 'case-3',
          title: 'Cas 3 : Possessifs (שלי, שלך...)',
          content:
            "Quand le nom est suivi d'un possessif, il porte généralement ה- mais le possessif lui-même n'en a pas besoin.",
          examples: [
            { french: "J'ai oublié mes clés", hebrew: 'שכחתי את המפתחות שלי', transcription: 'shachachti et hamaftechot sheli' },
            { french: 'Il a pris mon livre', hebrew: 'הוא לקח את הספר שלי', transcription: 'hu lakach et hasefer sheli' },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: '6. Exemples comparatifs',
      comparisons: [
        {
          indefinite: { french: 'Je lis UN livre', hebrew: 'אני קורא ספר', transcription: 'ani kore sefer' },
          definite: { french: 'Je lis LE livre', hebrew: 'אני קורא את הספר', transcription: 'ani kore et hasefer' },
        },
        {
          indefinite: { french: "J'ai acheté UNE voiture", hebrew: 'קניתי מכונית', transcription: 'kaniti mechonit' },
          definite: { french: "J'ai acheté LA voiture", hebrew: 'קניתי את המכונית', transcription: 'kaniti et hamechonit' },
        },
        {
          indefinite: { french: 'Je cherche UN travail', hebrew: 'אני מחפש עבודה', transcription: 'ani mechapes avoda' },
          definite: { french: 'Je cherche LE travail (précis)', hebrew: 'אני מחפש את העבודה', transcription: 'ani mechapes et haavoda' },
        },
        {
          indefinite: { french: 'Il mange DES pommes', hebrew: 'הוא אוכל תפוחים', transcription: 'hu ochel tapuchim' },
          definite: { french: 'Il mange LES pommes', hebrew: 'הוא אוכל את התפוחים', transcription: 'hu ochel et hatapuchim' },
        },
        {
          indefinite: { french: 'Je cours (intransitif — jamais את)', hebrew: 'אני רץ', transcription: 'ani rats' },
          definite: null,
        },
      ],
    },
    {
      id: 'section-7',
      title: '7. Résumé en 3 règles simples',
      summary: [
        {
          rule: 'Verbe intransitif',
          useEt: false,
          explanation: "Jamais de את — impossible d'avoir un objet direct",
          color: 'red',
        },
        {
          rule: 'Verbe transitif + objet indéfini (un/une/des)',
          useEt: false,
          explanation: 'Pas de את — le nom est seul, sans article',
          color: 'orange',
        },
        {
          rule: 'Verbe transitif + objet défini (le/la/les / nom propre / possessif / pronom)',
          useEt: true,
          explanation: 'את obligatoire',
          color: 'green',
        },
      ],
    },
  ],
}
