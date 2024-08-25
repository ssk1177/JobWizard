package com.capstone.backendJ.documents;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface DocumentsRepository extends CrudRepository<Documents, Long>{

	List<Documents> findByUserName(String username);

	Documents findByUserNameAndFiletype(String username, String string);
}