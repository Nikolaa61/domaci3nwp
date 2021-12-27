package rs.raf.domaci3.repositories;

import org.springframework.stereotype.Repository;
import rs.raf.domaci3.model.Permisija;

import java.util.List;

@Repository
public interface PermisijaRepository {
    public List<Permisija> findById(Long id);
}
