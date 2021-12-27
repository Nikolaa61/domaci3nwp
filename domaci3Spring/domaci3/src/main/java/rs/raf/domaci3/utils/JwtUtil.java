package rs.raf.domaci3.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import rs.raf.domaci3.model.Permisija;

import java.util.*;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "MY JWT SECRET";

    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public List<Permisija> extractPermisije(String token){
        return (List<Permisija>) extractAllClaims(token).get("permisije");
    }

    public boolean isTokenExpired(String token){
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public String generateToken(String email, Set<Permisija> permisije){
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .claim("permisije", permisije)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
    }

    public boolean validateToken(String token, UserDetails user) {
        return (user.getUsername().equals(extractUsername(token)) && !isTokenExpired(token));
    }

    public boolean authorize(String path, String token){
        List<Permisija> permisije = extractPermisije(token);
        if (path.startsWith("/user")){
            String path2 = path.substring(6);

            if(path2.equals("all") && permisije.contains(Permisija.can_read_users.toString())){
                return true;
            }
            if(path2.equals("create") && permisije.contains(Permisija.can_create_users.toString())){
                return true;
            }
            if(path2.equals("update") && permisije.contains(Permisija.can_update_users.toString())){
                return true;
            }
            if(path2.equals("delete") && permisije.contains(Permisija.can_delete_users.toString())){
                return true;
            }
            return false; // ako je usao u user deo i nema permisije
        }
        /// ako nije usao u user deo vracamo true
        return true;
    }
}