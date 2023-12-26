package com.notes.backend.services;

import com.notes.backend.models.Note;
import com.notes.backend.repositories.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public Note create(Note note) {
        return noteRepository.save(note);
    }

    public void deleteById(Integer id) {
        if (!noteRepository.existsById(id)) {
            throw new EntityNotFoundException("Any note found with id: " + id);
        }
        noteRepository.deleteById(id);
    }

    public List<Note> findAllNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> findNoteById(Integer id) {
        return noteRepository.findById(id);
    }

    public Note updateNote(Integer id, Note updatedNote) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setContent(updatedNote.getContent());
                    note.setArchived(updatedNote.isArchived());
                    note.setCategories(updatedNote.getCategories());
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new EntityNotFoundException("Any note found with id: " + id));
    }

}
