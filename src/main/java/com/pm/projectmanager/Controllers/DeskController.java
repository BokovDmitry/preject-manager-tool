package com.pm.projectmanager.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DeskController {
    @GetMapping("/desks")
    public ResponseEntity<?> getDesks() {
        try {
            return ResponseEntity.ok("Desks");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went terribly wrong");
        }
    }
}
