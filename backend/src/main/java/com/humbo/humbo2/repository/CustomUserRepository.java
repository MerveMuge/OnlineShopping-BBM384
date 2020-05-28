package com.humbo.humbo2.repository;

import java.util.Optional;

import com.humbo.humbo2.domain.CustomUser;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CustomUserRepository extends CrudRepository<CustomUser, String>{
    Optional<CustomUser> findByEmail(String email);

	Iterable<CustomUser> findByRoles(String[] roles);

    @Transactional
    @Modifying
    @Query(value = "UPDATE custom_user SET new_notification = 'true' WHERE email in :userList", nativeQuery = true)
	void updateNewNotification(Iterable<CustomUser> userList);
}