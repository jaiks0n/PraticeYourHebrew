// Deck Papa — fruits et légumes
// Format : id, french, hebrew, transcription, category, partOfSpeech: 'noun', gender

import type { VocabularyEntry } from './types'
import { MASCULINE_TAV_ENDING_NOTE } from './vocabulary-noms'

export const vocabularyPapa: VocabularyEntry[] = [
  // Fruits
  { id: '1', french: 'pomme', hebrew: 'תַּפּוּחַ', hebrewPlural: 'תַּפּוּחִים', transcription: 'tapuach', transcriptionPlural: 'tapuchim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '2', french: 'orange', hebrew: 'תַּפּוּז', hebrewPlural: 'תַּפּוּזִים', transcription: 'tapuz', transcriptionPlural: 'tapuzim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '3', french: 'banane', hebrew: 'בָּנָנָה', hebrewPlural: 'בָּנָנוֹת', transcription: 'banana', transcriptionPlural: 'bananot', category: 'Fruits', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '4', french: 'fraise', hebrew: 'תּוּת', hebrewPlural: 'תּוּתִים', transcription: 'tut', transcriptionPlural: 'tutim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '5', french: 'raisin', hebrew: 'עֵנָב', hebrewPlural: 'עֲנָבִים', transcription: 'enav', transcriptionPlural: 'anavim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '6', french: 'pastèque', hebrew: 'אֲבַטִּיחַ', hebrewPlural: 'אֲבַטִּיחִים', transcription: 'avatich', transcriptionPlural: 'avatichim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '7', french: 'melon', hebrew: 'מֵלוֹן', hebrewPlural: 'מֵלוֹנִים', transcription: 'melon', transcriptionPlural: 'melonim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '8', french: 'poire', hebrew: 'אַגַּס', hebrewPlural: 'אֲגַסִּים', transcription: 'agas', transcriptionPlural: 'agasim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '9', french: 'pêche', hebrew: 'אַפְרֵסֶק', hebrewPlural: 'אֲפָרְסְקִים', transcription: 'afarsek', transcriptionPlural: 'afarsekim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '10', french: 'cerise', hebrew: 'דּוּבְדְּבָן', hebrewPlural: 'דּוּבְדְּבָנִים', transcription: 'duvdevan', transcriptionPlural: 'duvdevanim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '11', french: 'citron', hebrew: 'לִימוֹן', hebrewPlural: 'לִימוֹנִים', transcription: 'limon', transcriptionPlural: 'limonim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '13', french: 'ananas', hebrew: 'אָנָנָס', hebrewPlural: 'אֲנָנָסִים', transcription: 'ananas', transcriptionPlural: 'ananasim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '14', french: 'mangue', hebrew: 'מָנְגּוֹ', hebrewPlural: 'מַנְגּוֹאִים', transcription: 'mango', transcriptionPlural: 'mangoim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '15', french: 'avocat', hebrew: 'אָבוֹקָדוֹ', hebrewPlural: 'אֲבוֹקָדוֹאִים', transcription: 'avokado', transcriptionPlural: 'avokadoim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '16', french: 'grenade', hebrew: 'רִמּוֹן', hebrewPlural: 'רִמּוֹנִים', transcription: 'rimon', transcriptionPlural: 'rimonim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '17', french: 'figue', hebrew: 'תְּאֵנָה', hebrewPlural: 'תְּאֵנִים', transcription: 'teena', transcriptionPlural: 'teenim', category: 'Fruits', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '18', french: 'datte', hebrew: 'תַּמָּר', hebrewPlural: 'תְּמָרִים', transcription: 'tamar', transcriptionPlural: 'tmarim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '19', french: 'kiwi', hebrew: 'קִיוִי', hebrewPlural: 'קִיוִוים', transcription: 'kiwi', transcriptionPlural: 'kiwiim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '20', french: 'abricot', hebrew: 'מִשְׁמֵשׁ', hebrewPlural: 'מִשְׁמְשִׁים', transcription: 'mishmesh', transcriptionPlural: 'mishmshim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '21', french: 'prune', hebrew: 'שְׁזִיף', hebrewPlural: 'שְׁזִיפִים', transcription: 'shezif', transcriptionPlural: 'shezifim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '22', french: 'noix', hebrew: 'אֱגוֹז', hebrewPlural: 'אֱגוֹזִים', transcription: 'egoze', transcriptionPlural: 'egozim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '23', french: 'amande', hebrew: 'שָׁקֵד', hebrewPlural: 'שְׁקֵדִים', transcription: 'shaked', transcriptionPlural: 'shkedim', category: 'Fruits', partOfSpeech: 'noun', gender: 'masculine' },

  // Légumes
  { id: '24', french: 'tomate', hebrew: 'עַגְבָנִיָּה', hebrewPlural: 'עַגְבָנִיּוֹת', transcription: 'agvania', transcriptionPlural: 'agvaniyot', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '25', french: 'carotte', hebrew: 'גֶּזֶר', hebrewPlural: 'גְּזָרִים', transcription: 'gazar', transcriptionPlural: 'gzarim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '26', french: 'pomme de terre', hebrew: 'תַּפּוּחַ אֲדָמָה', hebrewPlural: 'תַּפּוּחֵי אֲדָמָה', transcription: 'tapuach adama', transcriptionPlural: 'tapuchei adama', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '27', french: 'oignon', hebrew: 'בָּצָל', hebrewPlural: 'בְּצָלִים', transcription: 'betzal', transcriptionPlural: 'btzalim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '28', french: 'ail', hebrew: 'שׁוּם', hebrewPlural: '-', transcription: 'shum', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '29', french: 'concombre', hebrew: 'מְלָפְפוֹן', hebrewPlural: 'מְלָפְפוֹנִים', transcription: 'melafefon', transcriptionPlural: 'melafefonim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '30', french: 'poivron', hebrew: 'פִּלְפֵּל', hebrewPlural: 'פִּלְפְּלִים', transcription: 'pilpel', transcriptionPlural: 'pilpelim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '31', french: 'courgette', hebrew: 'קִישׁוּא', hebrewPlural: 'קִישׁוּאִים', transcription: 'kishu', transcriptionPlural: 'kishuim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '32', french: 'aubergine', hebrew: 'חָצִיל', hebrewPlural: 'חֲצִילִים', transcription: 'chatzil', transcriptionPlural: 'chatzilim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '33', french: 'chou', hebrew: 'כְּרוּב', hebrewPlural: 'כְּרוּבִים', transcription: 'kruv', transcriptionPlural: 'kruvim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '34', french: 'laitue', hebrew: 'חַסָּה', hebrewPlural: 'חַסּוֹת', transcription: 'chasa', transcriptionPlural: 'chasot', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '35', french: 'épinard', hebrew: 'תֶּרֶד', hebrewPlural: '-', transcription: 'tered', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '36', french: 'champignon', hebrew: 'פִּטרִיָּה', hebrewPlural: 'פִּטרִיּוֹת', transcription: 'pitriya', transcriptionPlural: 'pitriyot', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '37', french: 'petit pois', hebrew: 'אֲפוּנָה', hebrewPlural: 'אֲפוּנוֹת', transcription: 'afuna', transcriptionPlural: 'afunot', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '39', french: 'maïs', hebrew: 'תִּירָס', hebrewPlural: '-', transcription: 'tiras', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '40', french: 'betterave', hebrew: 'סֶלֶק', hebrewPlural: 'סְלָקִים', transcription: 'selek', transcriptionPlural: 'slakim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '41', french: 'radis', hebrew: 'צְנוֹן', hebrewPlural: 'צְנוֹנִים', transcription: 'tsnon', transcriptionPlural: 'tsnonim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '42', french: 'brocoli', hebrew: 'בְּרוֹקוֹלִי', hebrewPlural: '-', transcription: 'broccoli', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '43', french: 'chou-fleur', hebrew: 'כְּרוּבִית', hebrewPlural: 'כְּרוּבִיּוֹת', transcription: 'kruvit', transcriptionPlural: 'kruviyot', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '44', french: 'citrouille', hebrew: 'דְּלַעַת', hebrewPlural: 'דְּלָעוֹת', transcription: 'delaat', transcriptionPlural: 'delaot', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '45', french: 'persil', hebrew: 'פֶּטְרוֹזִילְיָה', hebrewPlural: '-', transcription: 'petruzilia', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'feminine' },
  { id: '46', french: 'olive', hebrew: 'זַיִת', hebrewPlural: 'זֵיתִים', transcription: 'zayit', transcriptionPlural: 'zeitim', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine', note: MASCULINE_TAV_ENDING_NOTE },
  { id: '47', french: 'pois chiche', hebrew: 'חֻמּוֹס', hebrewPlural: '-', transcription: 'chumus', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '48', french: 'navet', hebrew: 'לֶפֶת', hebrewPlural: 'לְפָתוֹת', transcription: 'lefet', transcriptionPlural: 'lefetot', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '49', french: 'céleri', hebrew: 'כּרֶפֶס', hebrewPlural: '-', transcription: 'kerepes', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
  { id: '50', french: 'fenouil', hebrew: 'שׁוּמֵר', hebrewPlural: '-', transcription: 'shumer', transcriptionPlural: '-', category: 'Légumes', partOfSpeech: 'noun', gender: 'masculine' },
]
