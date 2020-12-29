package ru.student.project.backend.demo.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Post {


    @Id
    private int id;

    private String title;
    private String description;
    private String state = "wait";
    private Long author;
    private Long organizer;
    
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getAuthor() {
        return author;
    }

    public void setAuthor(Long author) {
        this.author = author;
    }

    public Long getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Long organizer) {
        this.organizer = organizer;
    }
}
