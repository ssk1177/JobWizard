package com.capstone.backend.address;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Long>{

	Optional<Address> findByUserName(String username);
}