package com.tayfurunal.kanbantool.repository;

import com.tayfurunal.kanbantool.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    User getById(Long id);

    //Optional<User> findById(Long id);

}
