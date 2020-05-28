package com.humbo.humbo2.repository;

import java.util.Set;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.domain.Seller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// @PreAuthorize("hasRole('SELLER')")
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{
	@Override
	// @PreAuthorize("#product?.seller == null or #product?.seller?.email == authentication?.name")
	Product save(@Param("product") Product product);

	@Override
	// @PreAuthorize("@productRepository.findById(#id)?.seller?.email == authentication?.name")
	void deleteById(@Param("id") Long id);

	@Override
	// @PreAuthorize("#product?.seller?.email == authentication?.name")
	void delete(@Param("product") Product product);

	Page<Product> findByCategory(Category category, Pageable pageable);
	@Query(
            value = "SELECT DISTINCT * FROM product WHERE name ILIKE %:searchToken% or brand ILIKE %:searchToken%" ,
			countQuery = "SELECT count(distinct *) FROM FROM product WHERE name ILIKE %:searchToken% or brand ILIKE %:searchToken%", 
			nativeQuery = true
	)
	
	Page<Product> search(@Param("searchToken") String searchToken, Pageable pageable) ;

	Page<Product> findByCategoryIn(Iterable<Category> categoryList, Pageable pageable);

	Page<Product> findAllBySeller(Seller seller, Pageable pageable);

	@Query(value="SELECT MIN(price) FROM product WHERE category_id IN :categories", nativeQuery = true)
	Double findMinPriceByCategory(Iterable<Category> categories);

	@Query(value="SELECT MAX(price) FROM product WHERE category_id IN :categories", nativeQuery = true)
	Double findMaxPriceByCategory(Iterable<Category> categories);
	
	@Query(value="SELECT DISTINCT color FROM product WHERE category_id IN :categories", nativeQuery = true)
	Set<String> findAllColorsByCategory(Iterable<Category> categories);

	@Query(value="SELECT DISTINCT brand FROM product WHERE category_id IN :categories", nativeQuery = true)
	Set<String> findAllBrandsByCategory(Iterable<Category> categories);

	@Query(value="SELECT DISTINCT seller.email FROM seller, product WHERE product.seller_email=seller.email and category_id IN :categories", nativeQuery = true)
	Set<String> findAllSellersByCategory(Iterable<Category> categories);

	@Query(value="SELECT * FROM product WHERE name=:name and brand=:brand and seller_email<>:email", nativeQuery=true)
	Iterable<Product> findLike(String brand, String name, String email);
}