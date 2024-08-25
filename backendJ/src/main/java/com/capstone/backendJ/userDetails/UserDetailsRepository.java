package com.capstone.backendJ.userDetails;

import org.springframework.data.repository.CrudRepository;

public interface UserDetailsRepository extends CrudRepository<UserDetails, Long>{

	UserDetails findByUserName(String username);
}