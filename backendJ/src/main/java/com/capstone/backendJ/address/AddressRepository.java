package com.capstone.backendJ.address;


import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Long>{

	Address findByUserName(String username);
}