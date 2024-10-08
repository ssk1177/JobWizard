package com.capstone.backend.notifications;


import org.springframework.data.repository.CrudRepository;

public interface NotificationsRepository extends CrudRepository<Notifications, Long>{

	Notifications findByUserName(String username);
}