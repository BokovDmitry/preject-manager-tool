package com.pm.projectmanager.Services;

import com.pm.projectmanager.Entities.UserEntity;
import com.pm.projectmanager.Exceptions.UserAlreadyExistsException;
import com.pm.projectmanager.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    @Lazy
    @Autowired
    AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String verify(UserEntity user) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        return authentication.isAuthenticated() ? jwtService.generateToken(user.getUsername()) : "Failure";
    }

    public UserEntity register(UserEntity user) throws UserAlreadyExistsException {
        if(userRepo.findByUsername(user.getUsername()) != null)
            throw new UserAlreadyExistsException("User with this username has already been registered");
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

}
