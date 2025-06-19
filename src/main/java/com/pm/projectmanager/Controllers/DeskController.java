package com.pm.projectmanager.Controllers;

import com.pm.projectmanager.Entities.DeskEntity;
import com.pm.projectmanager.Exceptions.UserNotRegisteredException;
import com.pm.projectmanager.Services.DeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/desks")
public class DeskController {

    @Autowired
    private DeskService deskService;

    @GetMapping("")
    public ResponseEntity<?> getDesks(@RequestParam String username) {
        try {
            return ResponseEntity.ok(deskService.getDesks(username));
        }catch (UserNotRegisteredException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went terribly wrong");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeskById(@PathVariable long id) {
        try {
            return ResponseEntity.ok(deskService.getDeskById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/newdesk")
    public ResponseEntity<?> createDesk(@RequestBody DeskEntity newDesk, @RequestParam String username) {
        try{
            return ResponseEntity.ok(deskService.createDesk(newDesk, username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editDesk(@RequestBody DeskEntity newDesk, @RequestParam long id) {
        try {
            return ResponseEntity.ok(deskService.editDesk(newDesk, id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDesk(@PathVariable long id) {
        try{
            deskService.deleteDesk(id);
            return ResponseEntity.ok("Desk deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
