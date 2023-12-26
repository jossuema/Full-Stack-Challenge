package com.notes.backend.services;

import com.notes.backend.models.Category;
import com.notes.backend.models.CategoryDto;
import com.notes.backend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Category create(CategoryDto category) {
        Category newCategory = new Category();
        newCategory.setName(category.getName());
        return categoryRepository.save(newCategory);
    }

    public Category createByName(String name) {
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).get();
    }
}
