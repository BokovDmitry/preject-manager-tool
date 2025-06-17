package com.pm.projectmanager.Controllers;

import com.pm.projectmanager.Entities.UserEntity;
import com.pm.projectmanager.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Connection failed");
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        try{
            return ResponseEntity.ok(userService.getUserByUsername(username));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

        @PutMapping("/edit")
        public ResponseEntity<?> editUser(@RequestBody UserEntity user, @RequestParam long id) {
            try{
                return ResponseEntity.ok(userService.editUser(user, id));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteUser(@PathVariable long id) {
            try {
                userService.deleteUser(id);
                return ResponseEntity.ok("User deleted successfully");
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
}
