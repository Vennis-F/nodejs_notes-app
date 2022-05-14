const fs = require("fs")
const validator = require("validator")
const yargs = require("yargs")
const terminalMsg = require("./terminalMsg")
const { list, add, read, remove, msgEmpty } = require("./utils.js")

//----File system
//fs.writeFileSync("notes.txt", "Hello world")
//fs.appendFileSync("notes.txt", "\nMy name is Hoàng Anh")

//----Validator
//console.log(validator.isEmail("hoanganhgo28062001@gmail.com"))

//----Customize yards command
yargs.version("1.0.1")

yargs
  .command({
    command: "add",
    describe: "Add a new note",
    builder: {
      title: {
        describe: "Note tile",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => add(argv),
  })
  .command({
    command: "remove",
    describe: "Remove a note",
    builder: {
      title: {
        describe: "note title",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => remove(argv.title),
  })
  .command({
    command: "list",
    describe: "List out all notes",
    handler: () => {
      let lstNotes = list()
      if (msgEmpty(lstNotes)) return

      lstNotes.forEach((note) => {
        console.log(note)
      })
    },
  })
  .command({
    command: "read",
    describe: "Read a note",
    builder: {
      title: {
        describe: "note title",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      const note = read(argv.title)

      if (note) return console.log(note)
      return console.log(
        terminalMsg.errMsg("Cannot find the note with that title!")
      )
    },
  }).argv
