import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

const notes: Note[] = [];

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const now = new Date().toISOString();
    const newIndex = notes.length === 0 ? 1 : notes[notes.length - 1].id + 1;
    const newNote: Note = {
      id: newIndex,
      ...createNoteDto,
      createdAt_iso8601: now,
      updatedAt_iso8601: now,
    };
    notes.push(newNote);

    return Promise.resolve(newNote);
  }

  findAll(): Promise<Note[]> {
    return Promise.resolve(notes);
  }

  findOne(id: number): Promise<Note> {
    const note = notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return Promise.resolve(note);
  }

  update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    const updatedNote = {
      ...note,
      ...updateNoteDto,
      updatedAt_iso8601: new Date().toISOString(),
    };

    const index = notes.indexOf(note);
    notes[index] = updatedNote;

    return Promise.resolve(updatedNote);
  }

  remove(id: number): Promise<Note> {
    const note = notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    const index = notes.indexOf(note);
    notes.splice(index, 1);

    return Promise.resolve(note);
  }
}
