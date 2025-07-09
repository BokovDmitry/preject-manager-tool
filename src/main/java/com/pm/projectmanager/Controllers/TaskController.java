package com.pm.projectmanager.Controllers;

import com.pm.projectmanager.Entities.TaskEntity;
import com.pm.projectmanager.Services.TaskService;
import com.pm.projectmanager.Utils.TASK_STATE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTasks(@RequestParam long deskId) {
        try{
            return ResponseEntity.ok(taskService.getAllTasks(deskId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable long taskId) {
        try {
            return ResponseEntity.ok(taskService.getTaskById(taskId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/newtask")
    public ResponseEntity<?> createTask(@RequestBody TaskEntity newTask, @RequestParam long deskId) {
        try {
            return ResponseEntity.ok(taskService.createTask(newTask, deskId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edittask")
    public ResponseEntity<?> editTask(@RequestBody TaskEntity newTask, @RequestParam long taskId) {
        try {
            return ResponseEntity.ok(taskService.editTask(newTask, taskId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deletetask")
    public ResponseEntity<?> editTask(@RequestParam long taskId) {
        try {
            taskService.removeTask(taskId);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{taskId}/update")
    public ResponseEntity<?> updateState(@PathVariable long taskId, @RequestBody Map<String, String> body) {
        try {
            return ResponseEntity.ok(taskService.updateState(taskId, TASK_STATE.valueOf(body.get("state"))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PatchMapping("/{taskId}/check")
    public ResponseEntity<?> checkTask(@PathVariable long taskId) {
        try {
            return ResponseEntity.ok(taskService.checkTask(taskId));
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
