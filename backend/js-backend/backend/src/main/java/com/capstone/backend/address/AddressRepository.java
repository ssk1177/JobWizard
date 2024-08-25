package com.capstone.backend.address;


import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Long>{

	Address findByUserName(String username);
}