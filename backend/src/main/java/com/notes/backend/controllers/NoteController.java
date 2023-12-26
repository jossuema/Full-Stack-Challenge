package com.notes.backend.controllers;

import com.notes.backend.models.Category;
import com.notes.backend.models.CategoryDto;
import com.notes.backend.models.Note;
import com.notes.backend.services.CategoryService;
import com.notes.backend.services.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> createNote(@RequestBody Note note) {
        for (Category category : note.getCategories()) {
            if (!categoryService.existsById(category.getId())) {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.ok(noteService.create(note));
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.findAllNotes();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Integer id) {
        noteService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Integer id) {
        return noteService.findNoteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Integer id, @RequestBody Note note) {
        if (!noteService.findNoteById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Note updatedNote = noteService.updateNote(id, note);
        return ResponseEntity.ok(updatedNote);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.create(categoryDto));
    }



}
