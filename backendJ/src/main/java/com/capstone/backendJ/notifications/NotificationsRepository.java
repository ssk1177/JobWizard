package com.capstone.backendJ.notifications;


import org.springframework.data.repository.CrudRepository;

public interface NotificationsRepository extends CrudRepository<Notifications, Long>{

	Notifications findByUserName(String username);
}