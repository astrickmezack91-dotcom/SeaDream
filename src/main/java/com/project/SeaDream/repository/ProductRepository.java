package com.project.SeaDream.repository;

import com.project.SeaDream.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}