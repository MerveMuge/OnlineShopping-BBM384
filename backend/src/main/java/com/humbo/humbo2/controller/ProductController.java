package com.humbo.humbo2.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import javax.validation.Valid;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.repository.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
class ProductController {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/products")
    Page<Product> products(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @PostMapping("/products/{categoryName}")
    Page<Product> productsOfCategory(@PathVariable String categoryName,
            @Valid @RequestBody(required = false) FilterWrapper filters, Pageable pageable) {
        Iterable<Category> categoryList = this.categoryRepository.findWithChilds(categoryName);
        System.out.println(
                "-----------------------------------------------------------------------------------------------");
        System.out.println(filters);
        System.out.println("-----------------------------------------------------------------------------------------");
        if (filters == null) {
            return productRepository.findByCategoryIn(categoryList, pageable);
        } else {
            return productRepository.findAll(new Specification<Product>() {

                private static final long serialVersionUID = 1L;

                @Override
                public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query,
                        CriteriaBuilder criteriaBuilder) {
                    List<Predicate> predicates = new ArrayList<>();
                    if (filters.getBrands() != null && !filters.getBrands().isEmpty()) {
                        In<String> inClause = criteriaBuilder.in(root.get("brand"));
                        for (String brand : filters.getBrands()) {
                            inClause.value(brand);
                        }
                        predicates.add(criteriaBuilder.and(inClause));
                    }
                    if (filters.getColors() != null && !filters.getColors().isEmpty()) {
                        In<String> inClause = criteriaBuilder.in(root.get("color"));
                        for (String color : filters.getColors()) {
                            inClause.value(color);
                        }
                        predicates.add(criteriaBuilder.and(inClause));
                    }
                    if (filters.getSellers() != null && !filters.getSellers().isEmpty()) {
                        In<String> inClause = criteriaBuilder.in(root.get("seller").get("email"));
                        for (String seller : filters.getSellers()) {
                            inClause.value(seller);
                        }
                        predicates.add(criteriaBuilder.and(inClause));
                    }
                    if (filters.getMinPrice() != null && filters.getMaxPrice() != null) {
                        predicates.add(criteriaBuilder.and(criteriaBuilder.between(root.get("price"),
                                filters.getMinPrice(), filters.getMaxPrice())));
                    } else if (filters.getMinPrice() != null) {
                        predicates.add(criteriaBuilder
                                .and(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filters.getMinPrice())));
                    } else if (filters.getMaxPrice() != null) {
                        predicates.add(criteriaBuilder
                                .and(criteriaBuilder.lessThanOrEqualTo(root.get("price"), filters.getMaxPrice())));
                    }
                    if (filters.getMinRate() != null) {
                        Subquery<Seller> subquery = query.subquery(Seller.class);
                        Root<Seller> sellerRoot = subquery.from(Seller.class);
                        subquery.select(sellerRoot).distinct(true).where(criteriaBuilder
                                .greaterThanOrEqualTo(sellerRoot.get("avg_rating"), filters.getMinRate()));
                        predicates.add(criteriaBuilder.and(criteriaBuilder.in(root.get("seller")).value(subquery)));
                    }
                    In<Category> inClause = criteriaBuilder.in(root.get("category"));
                    for (Category category : categoryList) {
                        inClause.value(category);
                    }
                    predicates.add(criteriaBuilder.and(inClause));

                    return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
                }
            }, pageable);
        }
    }

    @GetMapping("/product/{id}")
    ResponseEntity<?> getProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        Iterable<Product> like = null;
        if (product.isPresent()) {
            like = productRepository.findLike(product.get().getBrand(), product.get().getName(),
                    product.get().getSeller().getEmail());
            return ResponseEntity.ok().body(new ProductResponseWrapper(product.get(), like));
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/products/search")
    public Page<Product> search(@RequestParam String searchToken, Pageable pageable) {
        return productRepository.search(searchToken, pageable);
    }

}