package ru.student.project.backend.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.student.project.backend.demo.models.Post;
import ru.student.project.backend.demo.models.User;
import ru.student.project.backend.demo.repository.PostRepository;

import javax.transaction.Transactional;
import java.util.List;



@Service
public class PostService {

    public class OkAnswer {
        private Boolean ok = true;

        public Boolean getOk() {
            return ok;
        }

        public void setOk(Boolean ok) {
            this.ok = ok;
        }

        @Override
        public String toString() {
            return "OkAnswer{" +
                    "ok=" + ok +
                    '}';
        }
    }

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public OkAnswer createPost(Post post, User user) {
        try {
            post.setId(postRepository.findMaxById() + 1);
            post.setAuthor(user.getId());
            postRepository.save(post);
            return new OkAnswer();
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Post getPost(String postID) {
        try {
            return postRepository.findById(Integer.parseInt(postID)).get();
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Post> readPosts() {
        return postRepository.findAll();
    }


    public List<Post> getUserRequests(User user) {
        return postRepository.findByUserId(user.getId());
    }



    @Transactional
    public OkAnswer deletePost(Post post) {
        try {
//            System.out.println(post.getId());
            postRepository.deleteById(post.getId());
            return new OkAnswer();
        } catch (Exception e) {
            throw e;
        }
    }

}
