package com.pm.projectmanager.Services;

import com.pm.projectmanager.Entities.TaskEntity;
import com.pm.projectmanager.Exceptions.NoSuchDeskException;
import com.pm.projectmanager.Exceptions.NoSuchTaskException;
import com.pm.projectmanager.Repo.DeskRepo;
import com.pm.projectmanager.Repo.TaskRepo;
import com.pm.projectmanager.Utils.TASK_STATE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
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
            return taskRepo.save(task);
        }).get();
    }

    public void removeTask(long taskId) {
        if(!taskRepo.existsById(taskId))
            throw new NoSuchTaskException("Could not open the task. Task does not exist");

        taskRepo.deleteById(taskId);
    }

    public TaskEntity checkTask(long taskId) {
        if(!taskRepo.existsById(taskId))
            throw new NoSuchTaskException("Could not open the task. Task does not exist");

        TaskEntity checkedTask = taskRepo.findById(taskId).get();
        checkedTask.setDone(!checkedTask.isDone());
        return taskRepo.save(checkedTask);
    }

    public TaskEntity updateState(long taskId, TASK_STATE newState) {
        if(!taskRepo.existsById(taskId))
            throw new NoSuchTaskException("Could not open the task. Task does not exist");

        TaskEntity newTask = taskRepo.findById(taskId).get();
        newTask.setState(newState);
        return taskRepo.save(newTask);
    }
}