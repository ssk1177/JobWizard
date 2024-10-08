package com.capstone.backend.user;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>{

	User findByUserName(String username);

	User findByEmail(String email);

	boolean existsByUserName(String username);
}