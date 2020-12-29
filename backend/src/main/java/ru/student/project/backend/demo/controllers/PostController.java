package ru.student.project.backend.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.student.project.backend.demo.models.Post;
import ru.student.project.backend.demo.models.User;
import ru.student.project.backend.demo.services.MyUserDetailsService;
import ru.student.project.backend.demo.services.PostService;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class PostController {

    SecurityContextHolder securityContextHolder;

    @Autowired
    private PostService postService;
    @Autowired
    private MyUserDetailsService myUserDetailsService;

    private User getUserInfo() {
        UserDetails userDetails = (UserDetails) securityContextHolder.getContext().getAuthentication().getPrincipal();
        return myUserDetailsService.findUserByName(userDetails.getUsername());
    }

    private String getRole() {
        return this.getUserInfo().getRole();
    }

    private boolean checkRole(String role) {
        return this.getRole().equals(role);
    }

    @GetMapping(value = "posts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Post> getPosts() {
        return postService.readPosts();
    }


    @GetMapping(value = "requests", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Post> getUserRequests() {
        if (!this.getRole().equals("default")) {
            return postService.readPosts();
        }
        return postService.getUserRequests(this.getUserInfo());
    }


    @GetMapping(value = "post/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Post getPosts(@PathVariable("id") String postId) {
        return postService.getPost(postId);
    }

    @PostMapping(value = "create-post", produces = MediaType.APPLICATION_JSON_VALUE)
    public PostService.OkAnswer createPost(@RequestBody Post post) {
        return postService.createPost(post, this.getUserInfo());
    }

    @PutMapping(value = "post")
    public PostService.OkAnswer updatePost(@RequestBody Post post) {
        return postService.updatePost(post);
    }

    @DeleteMapping(value = "delete-post")
    public PostService.OkAnswer deletePost(@RequestBody Post post) {
        return postService.deletePost(post);
    }

    @PutMapping(value = "attach-organizer")
    public PostService.OkAnswer attachOrganizerPost(@RequestBody Post post) {
        User user = this.getUserInfo();
        return postService.attachOrganizer(post, user);
    }

}
