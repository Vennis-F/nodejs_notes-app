const fs = require("fs")
const terminalMsg = require("./terminalMsg")

const msgEmpty = (list) => {
  if (list.lenght === 0) {
    console.log(terminalMsg.errMsg("The notes is empty!"))
    return true
  }
  return false
}

const storeNote = (list) => {
  const jsonLstNotes = JSON.stringify(list)
  fs.writeFileSync("test.json", jsonLstNotes)
}

const add = ({ title, body }) => {
  let lstNotes = list()

  //check duplicated
  if (lstNotes.find((note) => note.title == title))
    return console.log(terminalMsg.errMsg("Title is duplicated"))
  console.log(
    lstNotes.indexOf((note) => {
      console.log(note.title, title, note.title == title)
      return note.title == title
    })
  )

  //Push to array and store
  lstNotes.push({ title, body })
  storeNote(lstNotes)

  //Announce
  console.log(terminalMsg.sucessMsg("File save sucessed!"))
}

const list = () => {
  try {
    //Get list from file.json
    const dataFile = fs.readFileSync("test.json").toString()
    return JSON.parse(dataFile)
  } catch (error) {
    return []
  }
}

const read = (title) => {
  const lstNotes = list()
  let noteData = undefined

  lstNotes.forEach((note) => {
    if (note.title.toLowerCase().includes(title.toLowerCase())) noteData = note
  })
  return noteData
}

const remove = (title) => {
  let lstNotes = list()
  if (msgEmpty(list)) return

  //Pos of note remove
  const newNote = lstNotes.filter((note) => note.title != title)
  console.log(newNote)

  //Remove note
  if (newNote.length < lstNotes.length) {
    storeNote(newNote)
    return console.log(terminalMsg.sucessMsg("Remove sucessed!"))
  }
  return console.log(terminalMsg.errMsg("Not found note's title!"))
}

module.exports = { list, add, read, remove, msgEmpty }
