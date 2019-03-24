export const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


export const parseHtml = (string) => { // Parsing the character entities. P.S. You might find some unparsed entities too since there's no way I can know beforehand about what entity might show up.
  return string
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, 'e')
    .replace(/&ldquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&rdquo;/g, '"')
    .replace(/&deg/g, "°")
    .replace(/&shy;/g, " ")
}


export const normalizePayload = (payload) => { // Normalising the payload. Restructuring the api response since it was very vague. explicitly shuffling the options.

  let normalisedPayload = []

  for (let i = 0; i < payload.length; i++) {
    let dummyObject = {
      question: payload[i].question,
      options: shuffle([payload[i].correct_answer, ...payload[i].incorrect_answers]),
      correct_answer: payload[i].correct_answer,
    }

    normalisedPayload.push(dummyObject)
  }

  return normalisedPayload

}

export const getCategory = (cat) => {
  return parseHtml(catObj[cat])
}


export const getDiff = (diff) => {
  return parseHtml(diffObj[diff])
}


export const saveScore = (payload) => {

  let list = localStorage.getItem("highscore")

  list = JSON.parse(list)

  let updated = false;

  if (list) {
    // CASE: When list exists in local storage
    if (list.length === 0) {
      // CASE: when list length is 0
      list.push(payload)
      localStorage.setItem("highscore", JSON.stringify(list))

    } else {
      for (let i in list) {

        if (list[i].cat === payload.cat && list[i].diff === payload.diff && list[i].score < payload.score) {
          // CASE: When same category and same difficulty but a greater score. Needs to be replaced with the greater score
          list[i].alias = payload.alias
          list[i].score = payload.score
          updated = true;

        }
      }
    }

    if(!updated) {
      // CASE: When updated is false that means there were no matching entries with same category and diffculty thus new entry is generated
      list.push(payload)
      localStorage.setItem("highscore", JSON.stringify(list))
    } else {
      // CASE: When updates is true that means an entry was replaced
      localStorage.setItem("highscore", JSON.stringify(list))
    }

  } else {
    // CASE: When no local storage is found
    let temp = []
    temp.push(payload)
    localStorage.setItem("highscore", JSON.stringify(temp))
  }
}


const catObj = {
  "any" : "Any Category",
  "9" : "General Knowledge",
  "10" : "Entertainment: Books",
  "11" : "Entertainment: Film",
  "12" : "Entertainment: Music",
  "13" : "Entertainment: Musicals &amp; Theatres",
  "14" : "Entertainment: Television",
  "15" : "Entertainment: Video Games",
  "16" : "Entertainment: Board Games",
  "17" : "Science &amp; Nature",
  "18" : "Science: Computers",
  "19" : "Science: Mathematics",
  "20" : "Mythology",
  "21" : "Sports",
  "22" : "Geography",
  "23" : "History",
  "24" : "Politics",
  "25" : "Art",
  "26" : "Celebrities",
  "27" : "Animals",
  "28" : "Vehicles",
  "29" : "Entertainment: Comics",
  "30" : "Science: Gadgets",
  "31" : "Entertainment: Japanese Anime &amp; Manga",
  "32" : "Entertainment: Cartoon &amp; Animations",
}

const diffObj = {
  "any" : "Mixed",
  "easy" : "Easy",
  "medium" : "Medium",
  "hard" : "Hard",
}
