class User {
  private _age!: number;
  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    protected phone: string,
    age: number,
  ) {
    this.age = age;
  }
  get age(): number {
    return this._age;
  }
  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("your age must be from 18 to 60   ");
    }
    this._age = value;
  }
  private noteBooks: NoteBook[] = [];
  addNoteBook(noteBook: NoteBook): void {
    this.noteBooks.push(noteBook);
  }

  removeNoteBook(noteBook: NoteBook): void {
    this.noteBooks = this.noteBooks.filter((nb) => nb !== noteBook);
  }

  getNoteBooks(): NoteBook[] {
    return [...this.noteBooks];
  }

  displayInfo(): void {
    console.log({
      message: "your info",
      data: `id  :${this.id},
            name :${this.name},
              age:${this.age},
            email:${this.email}
            phone:${this.phone}

    `,
    });
  }
}

// ////////////////////////////////////////////////
class Admin extends User {
  manageNotes(
    notebook: NoteBook,
    action: "add" | "remove",
    payload:
      | {
          title: string;
          content: string;
          author: User;
        }
      | number,
  ): void {
    if (!this.getNoteBooks().includes(notebook)) {
      throw new Error("This Notebook does not belong to Admin");
    }
    // Add Note
    if (action === "add") {
      if (typeof payload === "number") {
        throw new Error("Add action requires Note data");
      }
      notebook.addNote(payload.title, payload.content, payload.author);
    } else {
      // Remove Note
      if (typeof payload !== "number") {
        throw new Error("Remove action requires Note ID");
      }

      notebook.removeNote(payload);
    }
  }

  ///////////////////////////////// El Admin yedeeer Notes beta3 kol el Users

  // manageAllUsersNotes(
  //   usersStorage: StorageItem<User>,
  //   notebook: NoteBook,
  //   action: "add" | "remove",
  //   payload:
  //     | {
  //         title: string;
  //         content: string;
  //         author: User;
  //       }
  //     | number
  // ): void {
  //   const notebookExists = usersStorage
  //     .getAllItems()
  //     .some((user) => user.getNoteBooks().includes(notebook));

  //   if (!notebookExists) {
  //     throw new Error("Notebook not found");
  //   }

  //   if (action === "add") {
  //     if (typeof payload === "number") {
  //       throw new Error("Add action requires Note data");
  //     }

  //     notebook.addNote(
  //       payload.title,
  //       payload.content,
  //       payload.author
  //     );
  //   } else {
  //     if (typeof payload !== "number") {
  //       throw new Error("Remove action requires Note ID");
  //     }

  //     notebook.removeNote(payload);
  //   }
  // }
}
////////////////////////////////////////////////
class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public userId: User,
  ) {}

  preview(): string {
    return this.content.length > 10
      ? this.content.substring(0, 10)
      : this.content;
  }
}

/////////////////////////////////////////

class NoteBook {
  private notes: Note[] = [];

  private nextId = 1;

  // El NoteBook howa elly by create el Note
  addNote(title: string, content: string, author: User): Note {
    const note = new Note(this.nextId++, title, content, author);

    this.notes.push(note);

    return note;
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  getNotes(): Note[] {
    return [...this.notes];
  }
}
///////////////////////////////////////////
class StorageItem<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }
  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}

// // Create Admin
// const admin = new Admin(
//   1,
//   "Omran",
//   "Omran2000@gmail.com",
//   "1212121212",
//   "01069635688",
//   26,
// );

// // Create NoteBook
// const notebook = new NoteBook();

// admin.addNoteBook(notebook);

// admin.manageNotes(notebook, "add", {
//   title: "ts",
//   content: "Why is happiness important? ",
//   author: admin,
// });

// // Display Notes
// console.log(notebook.getNotes());

// // Display Note Preview
// console.log(notebook.getNotes()[0].preview());

// // Remove Note
// admin.manageNotes(notebook, "remove", 1);

// // Display Notes after removing
// console.log(notebook.getNotes());

// const usersStorage = new StorageItem<User>();

// usersStorage.addItem(admin);

// console.log(usersStorage.getAllItems());
