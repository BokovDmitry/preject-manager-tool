package com.pm.projectmanager.Services;

import com.pm.projectmanager.Entities.DeskEntity;
import com.pm.projectmanager.Exceptions.NoSuchDeskException;
import com.pm.projectmanager.Exceptions.UserNotRegisteredException;
import com.pm.projectmanager.Repo.DeskRepo;
import com.pm.projectmanager.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeskService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DeskRepo deskRepo;

    public List<DeskEntity> getDesks(String username) throws UserNotRegisteredException {
        if(!userRepo.existsByUsername(username))
            throw new UserNotRegisteredException("User is not registered");

        return userRepo.findByUsername(username).getDesks();
    }

    public DeskEntity createDesk(DeskEntity newDesk, String username) throws UserNotRegisteredException {
        if(!userRepo.existsByUsername(username))
            throw new UserNotRegisteredException("User is not registered");

        newDesk.setUser(userRepo.findByUsername(username));

        return deskRepo.save(newDesk);
    }

    public DeskEntity editDesk(DeskEntity newDesk, long id) {
        if(!deskRepo.existsById(id))
            throw new NoSuchDeskException("Could not edit the desk. Desk not found");

        return deskRepo.findById(id).map(desk -> {
            desk.setName(newDesk.getName());
            desk.setDescription(newDesk.getDescription());
            return deskRepo.save(desk);
        }).get();

    }

    public void deleteDesk(long id) {
        if(!deskRepo.existsById(id))
            throw new NoSuchDeskException("No desk with the id specified");

        deskRepo.deleteById(id);
    }

    public DeskEntity getDeskById(long id) {
        if(!deskRepo.existsById(id))
            throw new NoSuchDeskException("Could not open the desk. Desk not found");

        return deskRepo.findById(id).get();
    }
}
