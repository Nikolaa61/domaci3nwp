package rs.raf.domaci3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rs.raf.domaci3.model.User;
import rs.raf.domaci3.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
//    private PermisijaRepository permisijaRepository;

    @Autowired
    public UserService(UserRepository userRepository ) {
        this.userRepository = userRepository;
//        this.permisijaRepository = permisijaRepository;
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User myUser = this.userRepository.findByEmail(email);
        if(myUser == null) {
            throw new UsernameNotFoundException("Email "+email+" not found");
        }

        return new org.springframework.security.core.userdetails.User(myUser.getEmail(), myUser.getPassword(), myUser.getPermisije());
    }

    public User dohvatiPoEmailu(String email) throws Exception{
        User user = this.userRepository.findByEmail(email);

        if(user == null){
            throw new Exception("Nema takvog emaila u bazi");
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("usao u loadUserByUsername");
        User myUser = this.userRepository.findByEmail(username);


        if(myUser == null) {
            throw new UsernameNotFoundException("User name "+username+" not found");
        }

        return new org.springframework.security.core.userdetails.User(myUser.getUsername(), myUser.getPassword(), myUser.getPermisije());
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }
    public User save(User user){
        return userRepository.save(user);
    }

//    public List<Permisija> permisije(Long id){
//        return permisijaRepository.findById(id);
//    }


}
