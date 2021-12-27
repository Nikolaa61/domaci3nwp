package rs.raf.domaci3.bootstrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import rs.raf.domaci3.model.Permisija;
import rs.raf.domaci3.model.User;
import rs.raf.domaci3.repositories.UserRepository;

import java.util.*;

@Component
public class BootstrapData implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public BootstrapData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Loading Data...");



        User user1 = new User();
        user1.setEmail("user1@gmail.com");
        Set<Permisija> permisije = new TreeSet<>();
        permisije.add(Permisija.can_create_users);
        permisije.add(Permisija.can_delete_users);
        permisije.add(Permisija.can_read_users);
        permisije.add(Permisija.can_update_users);


        user1.setPermisije(permisije);
        user1.setPassword(this.passwordEncoder.encode("user1"));
        user1.setFirstName("User");
        user1.setLastName("Useric");

        this.userRepository.save(user1);


        System.out.println("Data loaded!");
    }
}
