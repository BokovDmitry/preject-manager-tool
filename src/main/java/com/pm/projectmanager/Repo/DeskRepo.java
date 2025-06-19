package com.pm.projectmanager.Repo;

import com.pm.projectmanager.Entities.DeskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeskRepo extends JpaRepository<DeskEntity, Long> {
}
