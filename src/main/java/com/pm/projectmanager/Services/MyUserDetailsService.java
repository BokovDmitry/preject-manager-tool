package com.pm.projectmanager.Services;

import com.pm.projectmanager.Entities.UserEntity;
import com.pm.projectmanager.Models.UserPrincipal;
import com.pm.projectmanager.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUsername(username);

        if(user == null) throw new UsernameNotFoundException("User not found");

        return new UserPrincipal(user);
    }
}
