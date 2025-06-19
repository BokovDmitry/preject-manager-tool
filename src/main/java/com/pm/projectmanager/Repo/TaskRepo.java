package com.pm.projectmanager.Repo;

import com.pm.projectmanager.Entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<TaskEntity, Long> {
}
