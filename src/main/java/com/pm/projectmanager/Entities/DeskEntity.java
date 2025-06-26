package com.pm.projectmanager.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class DeskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;

    @ManyToOne
    @JsonBackReference
    private UserEntity user;

    @OneToMany(mappedBy = "desk", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TaskEntity> tasks;

    public double getProgress() {
        if(tasks==null || tasks.isEmpty())
            return 0.0;
        else {
            double completed = tasks.stream().filter(TaskEntity::isDone).count();
            return (completed * 100.0) / tasks.size();
        }
    }

    public DeskEntity() {}

    @Override
    public String toString() {
        return "DeskEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", user=" + user +
                ", tasks=" + tasks +
                '}';
    }
}
