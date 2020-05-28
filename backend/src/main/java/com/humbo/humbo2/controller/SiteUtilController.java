package com.humbo.humbo2.controller;

import java.util.Set;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.repository.ProductRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SiteUtilController{
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;

    public SiteUtilController(CategoryRepository categoryRepository, ProductRepository productRepository){
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok().body(this.categoryRepository.findAll());
    }

    @GetMapping("/parentcategories")
    public ResponseEntity<?> getParentCategories(){
        return ResponseEntity.ok().body(this.categoryRepository.findParentCategories(this.categoryRepository.findByName("root")));
    }

    @GetMapping("/subcategories/{category}")
    public ResponseEntity<?> getSubCategoriesOf(@PathVariable String category){
        return ResponseEntity.ok().body(this.categoryRepository.findByName(category).getChildren());
    }

    @GetMapping("/filters/{category}")
    public ResponseEntity<?> getFiltersByCategory(@PathVariable String category){
        Iterable<Category> categories = this.categoryRepository.findWithChilds(category);
        Double minPrice = this.productRepository.findMinPriceByCategory(categories);
        Double maxPrice = this.productRepository.findMaxPriceByCategory(categories);
        Set<String> colors = this.productRepository.findAllColorsByCategory(categories);
        Set<String> sellers = this.productRepository.findAllSellersByCategory(categories);
        Set<String> brands = this.productRepository.findAllBrandsByCategory(categories);
        FilterWrapper filterWrapper = new FilterWrapper(minPrice, maxPrice, colors, sellers, brands, null);
        return ResponseEntity.ok().body(filterWrapper);
    }
}