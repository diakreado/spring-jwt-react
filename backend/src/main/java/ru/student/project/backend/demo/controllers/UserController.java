package ru.student.project.backend.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ru.student.project.backend.demo.models.AuthenticationResponse;
import ru.student.project.backend.demo.models.Post;
import ru.student.project.backend.demo.models.User;
import ru.student.project.backend.demo.services.MyUserDetailsService;
import ru.student.project.backend.demo.services.PostService;
import ru.student.project.backend.demo.util.JwtUtil;

@RestController
public class UserController {

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @PostMapping(value = "register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@RequestBody User user) {
//        System.out.println(user);
//        System.out.println("user");
        return ResponseEntity.ok(myUserDetailsService.createUser(user));
    }

    @PutMapping(value = "user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(myUserDetailsService.updateUser(user));
    }


    @DeleteMapping(value = "user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        return ResponseEntity.ok(myUserDetailsService.deleteUser(user));
    }


    @PostMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody User user) throws Exception {
        try {
            final UserDetails userDetails = myUserDetailsService.loadUserByUsername(user.getUsername());

            if (!userDetails.getPassword().equals(user.getPassword())) {
                throw new UsernameNotFoundException("Incorrect password");
            }

            final String jwt = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }
    }

    @GetMapping(value = "role/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserRole(@PathVariable("name") String name) throws Exception {
        return ResponseEntity.ok(myUserDetailsService.findUserByName(name));
    }

    @GetMapping(value = "user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserRole(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(myUserDetailsService.findUserById(id));
    }

    @GetMapping(value = "consultant", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findConsultant() throws Exception {
        return ResponseEntity.ok(myUserDetailsService.findConsultant());
    }

    @GetMapping(value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAll() throws Exception {
        return ResponseEntity.ok(myUserDetailsService.getAll());
    }

}
