package ru.student.project.backend.demo.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Post {


    @Id
    private int id;

    private String title;
    private String description;
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    @Override
    public String toString() {
        return "{" +
                "title : lol" +
                "description : lo1" +
                "}";
    }
}
