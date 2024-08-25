package com.capstone.backendJ.settings;


import org.springframework.data.repository.CrudRepository;

public interface SettingsRepository extends CrudRepository<Settings, Long>{

	Settings findByUserName(String username);
}