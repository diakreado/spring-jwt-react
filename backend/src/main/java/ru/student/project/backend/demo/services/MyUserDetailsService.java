package ru.student.project.backend.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.student.project.backend.demo.models.Post;
import ru.student.project.backend.demo.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<ru.student.project.backend.demo.models.User> optionalUser = userRepository.findUserByName(s);
        try {
            ru.student.project.backend.demo.models.User user = optionalUser.get();
            return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
        } catch (NoSuchElementException e) {
            throw new UsernameNotFoundException("loadUserByUsername");
        }
    }

    public List<ru.student.project.backend.demo.models.User> getAll() {
        return userRepository.findAll();
    }


    @Transactional
    public ru.student.project.backend.demo.models.User findUserById(Long id) {
        try {
            return userRepository.findById(id).get();
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public ru.student.project.backend.demo.models.User findUserByName(String s) {
        try {

            return userRepository.findUserByName(s).orElseThrow(() -> { throw new NoSuchElementException(); });
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public ru.student.project.backend.demo.models.User createUser(ru.student.project.backend.demo.models.User user) {
        return userRepository.save(user);
    }


    @Transactional
    public ru.student.project.backend.demo.models.User updateUser(ru.student.project.backend.demo.models.User user) {
        return userRepository.save(user);
    }

    @Transactional
    public String deleteUser(ru.student.project.backend.demo.models.User user) {
        userRepository.deleteById(user.getId());
        return "deleted";
    }

    private ru.student.project.backend.demo.models.User getRandomElement(List<ru.student.project.backend.demo.models.User> list) {
        Random rand = new Random();
        return list.get(rand.nextInt(list.size()));
    }

    @Transactional
    public ru.student.project.backend.demo.models.User findConsultant() {
        try {
            List<ru.student.project.backend.demo.models.User> consultants = userRepository.getConsultants();
            return this.getRandomElement(consultants);
        } catch (Exception e) {
            throw e;
        }
    }

}