package com.pm.projectmanager.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.pm.projectmanager.Utils.TASK_STATE;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private boolean done;
    private TASK_STATE state;

    @ManyToOne
    @JsonBackReference
    private DeskEntity desk;

    public TaskEntity() {
        this.state = TASK_STATE.TODO;
    }

    public void setDone(boolean done) {
        this.done = done;

        if(this.done)
            this.state = TASK_STATE.DONE;
        else
            this.state = TASK_STATE.IN_PROGRESS;
    }

    public void setState(TASK_STATE state) {
        this.state = state;

        this.done = this.state == TASK_STATE.DONE;
    }

    @Override
    public String toString() {
        return "TaskEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", done=" + done +
                ", state=" + state +
                ", desk=" + desk +
                '}';
    }
}
