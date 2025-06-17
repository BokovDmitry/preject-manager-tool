package com.pm.projectmanager.Services;

import com.pm.projectmanager.Entities.UserEntity;
import com.pm.projectmanager.Exceptions.UserNotRegisteredException;
import com.pm.projectmanager.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public List<UserEntity> getAllUsers() {
        return userRepo.findAll();
    }

    public UserEntity getUserByUsername(String username) throws UserNotRegisteredException {
        if(!userRepo.existsByUsername(username))
            throw new UserNotRegisteredException("User is not registered!");

        return userRepo.findByUsername(username);
    }

    public UserEntity editUser (UserEntity newUser, long id) throws UserNotRegisteredException {
        if(!userRepo.existsById(id))
            throw new UserNotRegisteredException("User is not registered!");

        return userRepo.findById(id).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setPassword(newUser.getPassword());
            return userRepo.save(user);
        }).get();
    }

    public void deleteUser(long id) throws UserNotRegisteredException {
        if(!userRepo.existsById(id))
            throw new UserNotRegisteredException("User is not registered!");

        userRepo.deleteById(id);
    }
}
