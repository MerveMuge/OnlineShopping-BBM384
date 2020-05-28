package com.humbo.humbo2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.humbo.humbo2.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

	Category findByName(String name);

	@Query(value="with recursive cat_tree as (select id,name,parent_id from category where name = :parent union all select child.id,child.name,child.parent_id from category as child join cat_tree as parent on parent.id = child.parent_id) select * from cat_tree;",
	nativeQuery = true)
	Iterable<Category> findWithChilds(@Param("parent") String parent);

	@Query(value="SELECT * FROM category WHERE category.parent_id=:cat", nativeQuery=true)
	Iterable<Category> findParentCategories(Category cat);
    
}