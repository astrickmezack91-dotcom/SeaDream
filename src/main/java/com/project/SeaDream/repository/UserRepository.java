package com.project.SeaDream.repository;

import com.project.SeaDream.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}