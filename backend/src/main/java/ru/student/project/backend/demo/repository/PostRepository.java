package ru.student.project.backend.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.student.project.backend.demo.models.Post;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {

    @Query("select COALESCE(max(p.id), 0) from Post p")
    public Integer findMaxById();
}
