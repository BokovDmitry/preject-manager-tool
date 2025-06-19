package com.pm.projectmanager.Services;

import com.pm.projectmanager.Entities.TaskEntity;
import com.pm.projectmanager.Exceptions.NoSuchDeskException;
import com.pm.projectmanager.Exceptions.NoSuchTaskException;
import com.pm.projectmanager.Repo.DeskRepo;
import com.pm.projectmanager.Repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private DeskRepo deskRepo;

    @Autowired
    private TaskRepo taskRepo;

    public List<TaskEntity> getAllTasks(long deskId) {
        if (!deskRepo.existsById(deskId))
            throw new NoSuchDeskException("Could not load tasks from the desk. Desk not found");

        return deskRepo.findById(deskId).get().getTasks();
    }

    public TaskEntity getTaskById(long taskId) {
        if(!taskRepo.existsById(taskId))
            throw new NoSuchTaskException("Could not open the task. Task does not exist");

        return taskRepo.findById(taskId).get();
    }

    public TaskEntity createTask(TaskEntity newTask, long deskId) {
        if (!deskRepo.existsById(deskId))
            throw new NoSuchDeskException("Could not load tasks from the desk. Desk not found");

        newTask.setDesk(deskRepo.findById(deskId).get());

        return taskRepo.save(newTask);
    }

    public TaskEntity editTask(TaskEntity newTask, long taskId) {
        if(!taskRepo.existsById(taskId))
            throw new NoSuchTaskException("Could not open the task. Task does not exist");

        return taskRepo.findById(taskId).map(task -> {
            task.setTitle(newTask.getTitle());
            task.setState(newTask.getState());
            task.setDone(newTask.isDone());
            task.regulateDone();
            return taskRepo.save(task);
        }).get();
    }

    public void removeTask(long taskId) {
        if(!taskRepo.existsById(taskId))
            throw new NoSuchTaskException("Could not open the task. Task does not exist");

        taskRepo.deleteById(taskId);
    }
}