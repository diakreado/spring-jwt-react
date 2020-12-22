package ru.student.project.backend.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.student.project.backend.demo.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        System.out.println(s);

        Optional<ru.student.project.backend.demo.models.User> optionalUser = userRepository.findUserByName(s);
        System.out.println("loadUserByUsername");
        try {
            ru.student.project.backend.demo.models.User user = optionalUser.get();
            System.out.println(user.getUsername());
            System.out.println("user");
            return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
        } catch (NoSuchElementException e) {
            throw new UsernameNotFoundException("loadUserByUsername");
        }
    }

    @Transactional
    public ru.student.project.backend.demo.models.User createUser(ru.student.project.backend.demo.models.User user) {
        try {
//            user.setId(userRepository.findMaxById() + 1);
            System.out.println(user.getUsername());
            return userRepository.save(user);
        } catch (Exception e) {
            throw e;
        }
    }

//    public Optional<ru.student.project.backend.demo.models.User> findUserByName(String username) {
//        return userRepository.findUserName(username);
//    }
//
//    @Transactional
//    public UserService.OkAnswer deletePost(ru.student.project.backend.demo.models.User user) {
//        try {
////            System.out.println(post.getId());
//            userRepository.deleteById(user.getId());
//            return new UserService.OkAnswer();
//        } catch (Exception e) {
//            throw e;
//        }
//    }
}