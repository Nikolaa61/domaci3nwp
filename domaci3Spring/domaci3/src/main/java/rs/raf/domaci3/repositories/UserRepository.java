package rs.raf.domaci3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.raf.domaci3.model.Permisija;
import rs.raf.domaci3.model.User;

import java.util.List;

@Repository
public interface  UserRepository extends JpaRepository<User, Long> {
    //public User findByUsername(String username);
    public User findByEmail(String email);
}