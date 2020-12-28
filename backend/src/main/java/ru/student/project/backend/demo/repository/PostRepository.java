package ru.student.project.backend.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.student.project.backend.demo.models.Post;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {

    @Query("select COALESCE(max(p.id), 0) from Post p")
    public Integer findMaxById();

    @Query("select p from Post p where p.title like :s")
    public Integer findByTitle(@Param("s")String s);


    @Query("select p from Post p where p.author like :id")
    public List<Post> findByUserId(@Param("id")Long id);
}
