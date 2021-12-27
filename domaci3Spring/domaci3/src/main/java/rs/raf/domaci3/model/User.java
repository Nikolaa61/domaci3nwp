package rs.raf.domaci3.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotBlank(message = "First Name is mandatory")
    private String firstName;

    @Column
    @NotBlank(message = "Last Name is mandatory")
    private String lastName;

    @Column
    @NotBlank(message = "Password is mandatory")
    private String password;

    @Column(unique=true)
    @NotBlank(message = "Email is mandatory")
    private String email;

    @ElementCollection(targetClass = Permisija.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_permisija")
    @Column(name = "permisija")
    private Set<Permisija> permisije = new TreeSet<>();

    public String getUsername(){
        return firstName;
    }



}
