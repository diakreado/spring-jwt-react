package ru.student.project.backend.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.student.project.backend.demo.models.Post;
import ru.student.project.backend.demo.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("select COALESCE(max(p.id), 0) from User p")
    public Long findMaxById();


    @Query("select p from User p where p.username = :s")
    public Optional<User> findUserByName(@Param("s") String s);
}
