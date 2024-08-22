package com.capstone.backend.userDetails;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserDetailsRepository extends CrudRepository<UserDetails, Integer>{

	Optional<org.springframework.security.core.userdetails.UserDetails> findByUserName(String username);
}