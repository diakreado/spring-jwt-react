package ru.student.project.backend.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.student.project.backend.demo.models.Post;
import ru.student.project.backend.demo.services.PostService;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

//    @RequestMapping(value = "posts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @GetMapping(value = "posts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Post> getPosts() {
        return postService.readPosts();
    }

    @PostMapping(value = "create-post", produces = MediaType.APPLICATION_JSON_VALUE)
    public PostService.OkAnswer createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PutMapping(value = "post")
    public PostService.OkAnswer updatePost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @DeleteMapping(value = "delete-post")
    public PostService.OkAnswer deletePost(@RequestBody Post post) {
        return postService.deletePost(post);
    }


}
