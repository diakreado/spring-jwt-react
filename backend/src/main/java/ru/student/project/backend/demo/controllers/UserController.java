package ru.student.project.backend.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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
        System.out.println(user);
        System.out.println("user");
        return ResponseEntity.ok(myUserDetailsService.createUser(user));
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

}
